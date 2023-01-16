import { Anchor, AppShell, Button, Group, Header, Loader, Text } from '@mantine/core';
import { ErrorBoundary, Logo, useMedplum } from '@medplum/react';
import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PatientPage } from './pages/PatientPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResourcePage } from './pages/ResourcePage';
import { SignInPage } from './pages/SignInPage';

export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  return (
    <AppShell
      header={
        profile && (
          <Header height={60} p="md">
            <Group position="apart">
              <Group>
                <Anchor to="/" component={Link}>
                  <Group spacing={'xs'}>
                    <Logo size={17} />
                    <Text>Hello World</Text>
                  </Group>
                </Anchor>
              </Group>
              <Button
                size="xs"
                variant="outline"
                onClick={() => {
                  medplum.signOut();
                  window.location.reload();
                }}
              >
                Sign out
              </Button>
            </Group>
          </Header>
        )
      }
    >
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={profile ? <HomePage /> : <LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/Patient/:id" element={<PatientPage />} />
            <Route path="/:resourceType/:id" element={<ResourcePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}
