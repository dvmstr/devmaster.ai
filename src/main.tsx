import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LocaleProvider, SUPPORTED_LOCALES, isValidLocale } from '@/contexts';
import App from './App';
import { LegalNotice } from '@/components/pages';
import './index.css';

/**
 * Wrapper component that provides locale context
 */
function LocalizedApp() {
  return (
    <LocaleProvider>
      <App />
    </LocaleProvider>
  );
}

function LocalizedLegalNotice() {
  return (
    <LocaleProvider>
      <LegalNotice />
    </LocaleProvider>
  );
}

/**
 * Component to handle invalid locale redirects
 */
function LocaleRedirect() {
  return <Navigate to="/" replace />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* English (default) - no prefix */}
        <Route path="/" element={<LocalizedApp />} />
        <Route path="/legal" element={<LocalizedLegalNotice />} />
        
        {/* Localized routes with prefix */}
        {SUPPORTED_LOCALES.filter(l => l !== 'en').map(locale => (
          <Route key={locale} path={`/${locale}`}>
            <Route index element={<LocalizedApp />} />
            <Route path="legal" element={<LocalizedLegalNotice />} />
          </Route>
        ))}
        
        {/* Redirect invalid locales to default */}
        <Route path="/:locale" element={<LocaleRedirect />} />
        <Route path="/:locale/*" element={<LocaleRedirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
