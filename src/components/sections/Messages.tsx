import React from 'react';
import { MessengerProvider } from '../../features/messenger/contexts/MessengerContext';
import MessengerLayout from '../../features/messenger/components/MessengerLayout';

const Messages: React.FC = () => {
  return (
    <MessengerProvider>
      <MessengerLayout />
    </MessengerProvider>
  );
};

export default Messages;