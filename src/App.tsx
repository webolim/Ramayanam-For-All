/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './pages/Home';
import KandamsList from './pages/KandamsList';
import SargaList from './pages/SargaList';
import SargaView from './pages/SargaView';
import PravachanamList from './pages/PravachanamList';
import PravachanamView from './pages/PravachanamView';
import ContactUs from './pages/ContactUs';
import ContactSuccess from './pages/ContactSuccess';
import Admin from './pages/Admin';

export default function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/kandams" element={<KandamsList />} />
              <Route path="/kandams/:kandamId" element={<SargaList />} />
              <Route path="/kandams/:kandamId/sarga/:sargaId" element={<SargaView />} />
              <Route path="/pravachanam" element={<PravachanamList />} />
              <Route path="/pravachanam/:id" element={<PravachanamView />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/contact/success" element={<ContactSuccess />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SettingsProvider>
    </ErrorBoundary>
  );
}
