import { Anchor } from '@mantine/core';
import { Document } from '@medplum/react';
import React from 'react';
import { Link } from 'react-router-dom';

export function LandingPage(): JSX.Element {
  return (
    <Document>
      <h1>Welcome!</h1>
      <p>
        This "Hello World" example demonstrates how to build a simple React application that fetches Patient data from
        Medplum. If you haven't already done so, <a href="https://app.medplum.com/register">register</a> for Medplum
        Project. After that you can sign into your project by clicking the link below.
      </p>
      <p>
        <Anchor to="/signin" component={Link}>
          Sign in
        </Anchor>
      </p>
    </Document>
  );
}
