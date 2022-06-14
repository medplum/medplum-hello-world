import { getDisplayString } from '@medplum/core';
import { Practitioner } from '@medplum/fhirtypes';
import { ResourceTable, useMedplum, useMedplumProfile } from '@medplum/react';
import React from 'react';

export function ProfilePage(): JSX.Element {
  const medplum = useMedplum();
  const profile = useMedplumProfile() as Practitioner;

  return (
    <div>
      <h2>{getDisplayString(profile)}</h2>
      <div>
        <ResourceTable key={`${profile.id}`} value={profile} ignoreMissingValues={true} />
      </div>
    </div>
  );
}
