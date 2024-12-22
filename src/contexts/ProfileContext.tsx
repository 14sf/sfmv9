import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextType {
  profileImage: string;
  setProfileImage: (image: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1');
  const [userName, setUserName] = useState('John Doe');

  return (
    <ProfileContext.Provider value={{
      profileImage,
      setProfileImage,
      userName,
      setUserName
    }}>
      {children}
    </ProfileContext.Provider>
  );
};