import React, { createContext, useContext, useState, useEffect } from 'react';

const RequestsContext = createContext();

export const useRequests = () => useContext(RequestsContext);

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('scrap_requests');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse scrap_requests from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scrap_requests', JSON.stringify(requests));
    } catch (e) {
      console.error('Storage full:', e);
      if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
        alert('حدث خطأ: مساحة التخزين ممتلئة! لا يمكن حفظ المزيد من الطلبات.');
        if (requests.length > 0) {
          setRequests(requests.slice(1));
        }
      }
    }
  }, [requests]);

  const addRequest = (requestData) => {
    const newRequest = requestData.id ? { ...requestData } : {
      id: Date.now(),
      ...requestData,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    if (!newRequest.createdAt && !newRequest.date) {
        newRequest.createdAt = new Date().toISOString();
    }
    setRequests([newRequest, ...requests]);
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateRequestStatus, deleteRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};
