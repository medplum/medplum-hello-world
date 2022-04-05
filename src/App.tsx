import { UserConfiguration } from '@medplum/fhirtypes';
import { Header, useMedplum } from '@medplum/ui';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { PatientPage } from './pages/PatientPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import './App.css';

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
        link: [
          { name: 'Home', target: '/' },
          { name: 'Patients', target: '/Patient' },
        ],
      },
    ],
  };

  return (
    <>
      {profile && (
        <Header
          onLogo={() => navigate('/')}
          onProfile={() => navigate(`/profile`)}
          onSignOut={() => {
            medplum.signOut();
            navigate('/signin');
          }}
          config={config}
        />
      )}
      <Routes>
        <Route path="/" element={profile ? <HomePage /> : <LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Patient/:id" element={<PatientPage />} />
      </Routes>
    </>
  );
}
