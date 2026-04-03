import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LocaleProvider, SUPPORTED_LOCALES } from '@/contexts';
import App from './App';
import './index.css';

const LegalNotice = lazy(() => import('@/components/pages/LegalNotice').then(m => ({ default: m.LegalNotice })));

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
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <LegalNotice />
      </Suspense>
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
