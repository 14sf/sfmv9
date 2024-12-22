import React, { createContext, useContext, ReactNode } from 'react';

interface NotificationContextType {
  subscriberId: string;
  unseenCount: number;
  setUnseenCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  // In a real app, this would come from auth
  const subscriberId = '6766c99c39d56130ed007862';
  const [unseenCount, setUnseenCount] = React.useState(0);

  return (
    <NotificationContext.Provider value={{ subscriberId, unseenCount, setUnseenCount }}>
      {children}
    </NotificationContext.Provider>
  );
};