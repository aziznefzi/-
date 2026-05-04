import { createContext, useContext, useState } from "react";

const KidsContext = createContext();

export const useKidsContext = () => {
  const context = useContext(KidsContext);
  if (!context) {
    throw new Error("useKidsContext must be used within a KidsContextProvider");
  }
  return context;
};

export const KidsContextProvider = ({ children }) => {
  const [points, setPoints] = useState(1000);
  const [KidsLink, setKidsLink] = useState();
  
  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  return (
    <KidsContext.Provider value={{ 
      points,
      addPoints,
      KidsLink,
      setKidsLink
    }}>
      {children}
    </KidsContext.Provider>
  );
};