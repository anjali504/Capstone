import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [organizer, setOrganizer] = useState(() => {
    const storedOrganizer = sessionStorage.getItem('organizer');
    return storedOrganizer ? JSON.parse(storedOrganizer) : null;
  });

  const [admin, setAdminUser] = useState(() => {
    const storedAdmin = sessionStorage.getItem('admin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const login = (userData) => {
    if (userData.role === 'admin') {
      sessionStorage.setItem('admin', JSON.stringify(userData));
      setAdminUser(userData);
    } else if (userData.role === 'organizer') {
      sessionStorage.setItem('organizer', JSON.stringify(userData));
      setOrganizer(userData);
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    sessionStorage.removeItem('organizer');
    setOrganizer(null);
    sessionStorage.removeItem('admin');
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, organizer, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
