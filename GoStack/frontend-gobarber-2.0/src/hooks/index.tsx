import React from 'react';

import { ToastProvider } from './ToastContext';
import { AuthProvider } from './AuthContext';

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastProvider>
);

export default AppProvider;
