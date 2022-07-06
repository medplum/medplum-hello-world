import { UserConfiguration } from '@medplum/fhirtypes';
import { ErrorBoundary, Header, useMedplum } from '@medplum/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PatientPage } from './pages/PatientPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import './App.css';
import React from 'react';
import { ResourceApplicationPage } from './pages/ResourceApplicationPage';

export function App(): JSX.Element | null {
  const navigate = useNavigate();
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  const config: UserConfiguration = {
    resourceType: 'UserConfiguration',
    menu: [
      {
        title: 'My Menu',
        link: [{ name: 'Patients', target: '/' }],
      },
    ],
  };

  return (
    <>
      {profile && (
        <Header
          bgColor="#1a73e8"
          title="MyCompany"
          onLogo={() => navigate('/')}
          onProfile={() => navigate(`/profile`)}
          onSignOut={() => {
            medplum.signOut();
            navigate('/signin');
          }}
          config={config}
        />
      )}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={profile ? <HomePage /> : <LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/Patient/:id" element={<PatientPage />} />
          <Route path="/:resourceType/:id" element={<ResourceApplicationPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
