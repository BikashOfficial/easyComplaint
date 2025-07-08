import React, { createContext, useState, useEffect } from 'react';

export const AdminDataContext = createContext();

const AdminContext = ({ children }) => {
  // Try to load admin from localStorage on mount
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin');
    return stored ? JSON.parse(stored) : {};
  });

  // Keep localStorage in sync when admin changes
  useEffect(() => {
    if (admin && Object.keys(admin).length > 0) {
      localStorage.setItem('admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin');
    }
  }, [admin]);

  return (
    <AdminDataContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export default AdminContext;