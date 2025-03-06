import { createContext, useState } from 'react';

export const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  const [dialog, setDialog] = useState({ isOpen: false, content: '' });

  return (
    <LayoutContext.Provider value={{ dialog, setDialog }}>
      {children}
    </LayoutContext.Provider>
  );
};
