import { createContext, useContext, useState } from 'react';

const BackendDataContext = createContext();

export const BackendDataProvider = ({ children }: any) => {
  const [backendResponse, setBackendResponse] = useState(null);

  return (
    <BackendDataContext.Provider value={{ backendResponse, setBackendResponse }}>
      {children}
    </BackendDataContext.Provider>
  );
};

export const useBackendData = () => useContext(BackendDataContext);
