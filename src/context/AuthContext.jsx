import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Initialize auth state from local storage on mount
  useEffect(() => {
    let usersList = [];
    try {
      const storedUsers = localStorage.getItem('registeredUsers');
      if (storedUsers) {
        usersList = JSON.parse(storedUsers);
      }
    } catch (e) {
      console.error("Failed to parse registered users, resetting to default.", e);
    }
    
    if (!usersList || usersList.length === 0) {
      // Create a default user for testing if no users exist
      const defaultUser = { id: 1, name: 'مستخدم تجريبي', email: 'test@renova.com', password: 'password', role: 'user' };
      usersList = [defaultUser];
      try {
        localStorage.setItem('registeredUsers', JSON.stringify(usersList));
      } catch (err) {
        console.error("Failed to save default user to local storage", err);
      }
    }
    setRegisteredUsers(usersList);

    const storedUserStr = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUserStr && storedToken) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        // Security check: Make sure this user still exists in the database (wasn't deleted by admin)
        const stillExists = usersList.some(u => u.id === storedUser.id);
        
        if (stillExists || storedUser.role === 'admin') {
          setUser(storedUser);
          setToken(storedToken);
        } else {
          // Invalidate session if deleted
          console.warn("User session invalidated due to account deletion.");
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error(`Error saving ${key} to local storage`, e);
      if (e.name === 'QuotaExceededError') {
        alert('مساحة التخزين ممتلئة! يرجى إفراغ بعض المساحة.');
      }
      return false;
    }
  };

  const loginUser = (email, password) => {
    const existingUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (existingUser) {
      const userWithRole = { ...existingUser, role: existingUser.role || 'user' };
      const userToken = `mock-token-${existingUser.id}`;
      setUser(userWithRole);
      setToken(userToken);
      saveToStorage('user', userWithRole);
      localStorage.setItem('token', userToken);
      return true; // success
    }
    return false; // failure
  };

  const registerUser = (userData) => {
    const userExists = registeredUsers.some(u => u.email === userData.email);
    if (userExists) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' };
    }
    
    const newUser = { 
      id: Date.now(), 
      ...userData,
      role: 'user' 
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    saveToStorage('registeredUsers', updatedUsers);
    
    // Auto login after registration
    const userToken = `mock-token-${newUser.id}`;
    setUser(newUser);
    setToken(userToken);
    saveToStorage('user', newUser);
    localStorage.setItem('token', userToken);
    
    return { success: true };
  };

  const login = (userData, userToken) => {
    // Keep this for admin login
    const userWithRole = { ...userData, role: userData.role || 'user' };
    setUser(userWithRole);
    setToken(userToken);
    saveToStorage('user', userWithRole);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const deleteUser = (userId) => {
    // Admin shouldn't delete themselves
    if (user && user.id === userId) {
        return false;
    }
    const updatedUsers = registeredUsers.filter(u => u.id !== userId);
    setRegisteredUsers(updatedUsers);
    saveToStorage('registeredUsers', updatedUsers);
    return true;
  };

  const updateUser = (userId, updatedData) => {
    const emailExists = registeredUsers.some(u => u.email === updatedData.email && u.id !== userId);
    if (emailExists) {
      return false;
    }
    
    let updatedSessionUser = null;
    
    const updatedUsers = registeredUsers.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updatedData };
        if (user && user.id === userId) {
          updatedSessionUser = updated;
        }
        return updated;
      }
      return u;
    });
    
    setRegisteredUsers(updatedUsers);
    saveToStorage('registeredUsers', updatedUsers);
    
    if (updatedSessionUser) {
      setUser(updatedSessionUser);
      saveToStorage('user', updatedSessionUser);
    }
    
    return true;
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, token, login, loginUser, registerUser, logout, isAuthenticated: !!user, isAdmin, loading,
      registeredUsers, deleteUser, updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

