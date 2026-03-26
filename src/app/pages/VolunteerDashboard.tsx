import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Layout, volunteerNavItems } from '../components/layout/Layout';
import VolunteerTasksTab from '../components/volunteer/VolunteerTasksTab';
import VolunteerMeetingsTab from '../components/volunteer/VolunteerMeetingsTab';
import VolunteerCertificateTab from '../components/volunteer/VolunteerCertificateTab';
import VolunteerJoiningLetterTab from '../components/volunteer/VolunteerJoiningLetterTab';

export default function VolunteerDashboard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);

  const renderTab = () => {
    switch (activeTab) {
      case 'tasks':         return <VolunteerTasksTab />;
      case 'meetings':      return <VolunteerMeetingsTab />;
      case 'certificate':   return <VolunteerCertificateTab />;
      case 'joining-letter':return <VolunteerJoiningLetterTab />;
      default:              return <VolunteerTasksTab />;
    }
  };

  return (
    <Layout navItems={volunteerNavItems} activeTab={activeTab} onTabChange={setActiveTab} notifications={0}>
      {renderTab()}
    </Layout>
  );
}
