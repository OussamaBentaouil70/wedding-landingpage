import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoUrl from './assets/Images/logo.png';

const iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
if (iconLink) {
  iconLink.href = logoUrl;
} else {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logoUrl;
  document.head.appendChild(link);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
