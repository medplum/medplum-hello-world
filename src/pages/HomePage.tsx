import { Anchor, Loader } from '@mantine/core';
import { formatGivenName } from '@medplum/core';
import { HumanName, Patient, Practitioner } from '@medplum/fhirtypes';
import { Document, ResourceBadge, useMedplum, useMedplumProfile } from '@medplum/react';
import React, { useEffect, useState } from 'react';
/**
 * Home page that greets the user and displays a list of patients
 * @returns
 */
export function HomePage(): JSX.Element {
  // Call useMedplum() to get the current MedplumClient instance
  // https://www.medplum.com/docs/sdk/classes/MedplumClient
  const medplum = useMedplum();
  // useMedplumProfile() returns the "profile resource" associated with the user.
  // This can be a Practitioner, Patient, or RelatedPerson depending on the user's role in the project.
  // See the "Register" tutorial for more detail
  // https://www.medplum.com/docs/tutorials/register
  const profile = useMedplumProfile() as Practitioner;

  // Conduct a simple FHIR search for all Patient resources, sorted by last updated time (descending)
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    medplum.searchResources('Patient', '_sort=-_lastUpdated').then(setPatients);
  }, [medplum]);

  return (
    <Document>
      <h1>
        Welcome &nbsp;
        <Anchor href="/profile">{formatGivenName(profile.name?.[0] as HumanName)}</Anchor>
      </h1>
      <h3>Patients</h3>
      {patients.map((e) => (
        <div key={e.id}>
          <ResourceBadge link={true} value={e} />
        </div>
      ))}
    </Document>
  );
}
