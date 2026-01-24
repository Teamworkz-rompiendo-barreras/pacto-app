
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  console.error("Error al montar la app:", err);
  document.body.innerHTML = '<div style="padding: 20px; color: red;"><h1>Error Crítico</h1><p>La aplicación no pudo iniciar. Revisa la consola.</p></div>';
}
