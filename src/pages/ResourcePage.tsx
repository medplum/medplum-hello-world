import { getDisplayString } from '@medplum/core';
import { Resource, ResourceType } from '@medplum/fhirtypes';
import { Document, ResourceTable, useMedplum } from '@medplum/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This is an example of a generic "Resource Display" page.
 * It uses the Medplum `<ResourceTable>` component to display a resource.
 */
export function ResourcePage(): JSX.Element | null {
  const medplum = useMedplum();
  const { resourceType, id, versionId } = useParams();
  const [resource, setResource] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    if (resourceType && id) {
      if (versionId) {
        medplum.readVersion(resourceType as ResourceType, id, versionId).then(setResource);
      } else {
        medplum.readResource(resourceType as ResourceType, id).then(setResource);
      }
    }
  }, [medplum, resourceType, id, versionId]);

  if (!resource) {
    return null;
  }

  return (
    <>
      <Document key={[resourceType, id, versionId].join('-')}>
        <h2>{getDisplayString(resource)}</h2>
        {versionId && <h3>Version: {versionId}</h3>}
        <div>
          <ResourceTable key={`${resourceType}/${id}`} value={resource} ignoreMissingValues={false} />
        </div>
      </Document>
    </>
  );
}
