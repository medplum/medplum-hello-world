import { Loader } from '@mantine/core';
import { DiagnosticReport, Patient, ServiceRequest } from '@medplum/fhirtypes';
import {
  AddressDisplay,
  ContactPointDisplay,
  Document,
  ResourceAvatar,
  ResourceName,
  useMedplum,
} from '@medplum/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './PatientPage.css';

interface PatientGraphQLResponse {
  data: {
    patient: Patient;
    orders: ServiceRequest[];
    reports: DiagnosticReport[];
  };
}

export function PatientPage(): JSX.Element {
  const medplum = useMedplum();
  const { id } = useParams();
  const [response, setResponse] = useState<PatientGraphQLResponse>();

  useEffect(() => {
    // Use the [FHIR graphQL schema](http://hl7.org/fhir/R4B/graphql.html) to query
    // multiple resources related to this patient
    const query = `{
      patient: Patient(id: "${id}") {
        resourceType,
        id,
        meta { lastUpdated },
        birthDate,
        name {
          given,
          family
        },
        telecom {
          system,
          value
        },
        address {
          line,
          city,
          state
        }
      },
      orders: ServiceRequestList(subject: "Patient/${id}") {
        resourceType,
        id,
        meta { lastUpdated },
        category {
          text
        },
        code {
          text
        }
      },
      reports: DiagnosticReportList(subject: "Patient/${id}") {
        resourceType,
        id,
        meta { lastUpdated },
        code {
          text
        }
      }
    }`;
    medplum.graphql(query).then(setResponse);
  }, [medplum, id]);

  if (!response) {
    return <Loader />;
  }

  const { patient, orders, reports } = response.data;

  return (
    <Document>
      <div className="patient-sidebar">
        <div className="patient-title">
          <ResourceAvatar value={patient} />
          <ResourceName value={patient} />
        </div>
        <h3>Birth Date</h3>
        <div>{patient.birthDate}</div>
        <h3>Address</h3>
        {patient.address?.map((a, i) => (
          <div key={`address-${i}`}>
            <AddressDisplay value={a} />
          </div>
        ))}
        <h3>Contact</h3>
        {patient.telecom?.map((t, i) => (
          <div key={`contact-${i}`}>
            <ContactPointDisplay value={t} />
          </div>
        ))}
      </div>
      <div className="patient-demographics">
        <div>Created Date: {patient.meta?.lastUpdated}</div>
        <h3>Demographics</h3>
        <table>
          <tbody>
            <tr>
              <td>Prefix: {patient?.name?.[0]?.prefix}</td>
              <td>First: {patient?.name?.[0]?.given?.[0]}</td>
              <td>Middle: {patient?.name?.[0]?.given?.[1]}</td>
              <td>Last: {patient?.name?.[0]?.family}</td>
              <td>Suffix: {patient?.name?.[0]?.suffix}</td>
            </tr>
          </tbody>
        </table>
        <h3>Orders ({orders?.length})</h3>
        <ul>
          {orders?.map((o, i) => (
            <li key={`order-${i}`}>
              <a href={`/ServiceRequest/${o.id}`}>{o.code?.text}</a> ({formatDate(o.meta?.lastUpdated)})
            </li>
          ))}
        </ul>
        <h3>Reports ({reports?.length})</h3>
        <ul>
          {reports?.map((o, i) => (
            <li key={`report-${i}`}>
              <a href={`/DiagnosticReport/${o.id}`}>
                {o.code?.text} ({formatDate(o.meta?.lastUpdated)})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Document>
  );
}

function formatDate(date: string | undefined): string {
  if (!date) {
    return '';
  }
  const d = new Date(date);
  return d.toLocaleDateString();
}
