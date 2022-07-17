import { getDisplayString } from '@medplum/core';
import { ResourceType } from '@medplum/fhirtypes';
import { Document, ResourceTable, useMedplum } from '@medplum/react';
import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * This is an example of a generic "Resource Display" page.
 * It uses the Medplum `<ResourceTable>` component to display a resource.
 */
export function ResourceApplicationPage(): JSX.Element | null {
  const medplum = useMedplum();
  const { resourceType, id } = useParams();
  const resource = medplum.readResource(resourceType as ResourceType, id as string).read();
  return (
    <Document>
      <h2>{getDisplayString(resource)}</h2>
      <div>
        <ResourceTable key={`${resourceType}/${id}`} value={resource} ignoreMissingValues={true} />
      </div>
    </Document>
  );
}
