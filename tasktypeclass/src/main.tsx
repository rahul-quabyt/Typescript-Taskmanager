import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Auth0Provider
      domain="dev-khhutmhystwnxuvt.us.auth0.com"
      clientId="22JMGrLJ50MdQO1lq5iIMYuyRS9gtI7J"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>,
  );
}
