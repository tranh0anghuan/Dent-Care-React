import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './pages/login';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import Layout from './components/layout';
import ServicesPage from './pages/services';
import ContactPage from './pages/contact';
import DentistPage from './pages/dentist';
import TeamPage from './pages/team';
import AppointmentPage from './pages/appointment';
import RecordPage from './pages/record';
import SignupPage from './pages/signup';
import SchedulePage from './pages/schedule';
import Dashboard from './pages/dashboard';
import Manager from './pages/manager';
import Managerappointment from './components/managerappointment';
import ManagerPatient from './components/manager-patient';
import Room from './components/room';
import Category from './components/category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPage from './pages/forgot-password';
import ResetPage from './pages/reset-password';
import Information from './components/information';
import Product from './components/product';
import ClinicDetailPage from './pages/clinic-detail';
import ClinicPage from './pages/clinics';
import ServiceDetailPage from './pages/service-detail';
import DentistByClinic from './pages/teamByClinic';
import PersonalProfile from './pages/profile';
import ClinicByServiceAndDentistPage from './pages/cliBySerandDen';
import Patient from './pages/patient';
import PatientSchedule from './pages/patientSchedule';
import DentistSchedule from './pages/dentistSchedule';
import ViewRecord from './pages/viewRecord';
import CreateRecord from './pages/create-record';
import PatientRecord from './pages/patient-record';
import CreateTreatment from './pages/create-treatment';
import PatientAppointmentRecord from './pages/patient-app-record';
import AppointmentRecord from './pages/appointment-record';
import CheckIn from './pages/check-in';
import RecordByDentist from './pages/see-record';

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/services',
          element: <ServicesPage />
        },
        {
          path: '/contact',
          element: <ContactPage />
        },
        {
          path: '/dentist/:did',
          element: <DentistPage />
        },
        {
          path: '/team',
          element: <TeamPage />
        },
        {
          path: '/appointment',
          element: <AppointmentPage />
        },
        {
          path: '/record',
          element: <RecordPage />
        },
        {
          path: '/schedule',
          element: <SchedulePage />
        },
        {
          path: 'clinic/:id/service/:sid',
          element: <DentistByClinic />
        },
        {
          path: 'service/:sid/clinic/:id',
          element: <DentistByClinic />
        },
        {
          path: '/dentist/:did/service/:sid',
          element: <ClinicByServiceAndDentistPage />
        },
        {
          path: '/dentist/:did/service/:sid/clinic/:id',
          element: <AppointmentPage />
        },
        {
          path: 'clinic/:id/service/:sid/dentist/:did',
          element: <AppointmentPage />
        },
        {
          path: 'clinic/:id/service/:sid/dentist',
          element: <AppointmentPage />
        },
        {
          path: 'service/:sid/clinic/:id/dentist/:did',
          element: <AppointmentPage />
        },
        {
          path: '/clinic/:id',
          element: <ClinicDetailPage />
        },
        {
          path: '/clinic',
          element: <ClinicPage />
        },
        {
          path: '/service/:sid',
          element: <ServiceDetailPage />
        },
        {
          path: '/profile',
          element: <PersonalProfile />
        },
        {
          path: '/patient',
          element: <Patient />
        },
        {
          path: '/patient-app-record',
          element: <PatientAppointmentRecord />
        },
        {
          path: '/patient-schedule/:pid',
          element: <PatientSchedule />
        },
        {
          path: '/appointment-record/:pid',
          element: <AppointmentRecord />
        },
        {
          path: '/dentist-schedule',
          element: <DentistSchedule />
        },
        {
          path: '/view-record',
          element: <ViewRecord />
        },
        {
          path: '/create-record/:aid',
          element: <CreateRecord />
        },
        {
          path: '/patient-record/:aid',
          element: <PatientRecord />
        },
        {
          path: '/treatment-plan/:aid',
          element: <CreateTreatment />
        },
        {
          path: '/check-in',
          element: <CheckIn />
        },
        {
          path: '/record-dentist',
          element: <RecordByDentist />
        },
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },

    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '/dashboard/category',
          element: <Category />,
        },
        {
          path: '/dashboard/information',
          element: <Information />,
        },
        {
          path: '/dashboard/product',
          element:<Product />
        }
      ],
    },
    
    {
      path: '/manager',
      element:<Manager />,
      children: [
        {
          path: '/manager/managerappointment',
          element: <Managerappointment />,
        },
        {
          path: '/manager/room',
          element: <Room />,
        },
        {
          path: '/manager/manager-patient',
          element:<ManagerPatient />
        },
        
      ],
    },

    {
      path: '/forgot',
      element: <ForgotPage />
    },
    {
      path: '/reset',
      element: <ResetPage />
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
