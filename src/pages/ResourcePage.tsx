import { getDisplayString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { Document, ResourceTable, useResource } from '@medplum/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PatientHeader } from './PatientHeader';

/**
 * This is an example of a generic "Resource Display" page.
 * It uses the Medplum `<ResourceTable>` component to display a resource.
 */
export function ResourcePage(): JSX.Element | null {
  const { resourceType, id } = useParams();
  const resource = useResource({ reference: `${resourceType}/${id}` });
  if (!resource) {
    return null;
  }
  return (
    <>
      {resourceType === 'Patient' && <PatientHeader patient={resource as Patient} />}
      <Document>
        <h2>{getDisplayString(resource)}</h2>
        <div>
          <ResourceTable key={`${resourceType}/${id}`} value={resource} ignoreMissingValues={true} />
        </div>
      </Document>
    </>
  );
}
