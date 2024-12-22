import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat, Message } from '../types';
import { useToast } from '../../../hooks/useToast';

interface MessengerContextType {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  sendMessage: (content: string, type?: Message['type']) => void;
  createChat: (participants: string[]) => Promise<Chat | null>;
  deleteChat: (chatId: string) => void;
  isLoading: boolean;
}

const MessengerContext = createContext<MessengerContextType | undefined>(undefined);

export const useMessenger = () => {
  const context = useContext(MessengerContext);
  if (!context) {
    throw new Error('useMessenger must be used within a MessengerProvider');
  }
  return context;
};

interface MessengerProviderProps {
  children: ReactNode;
}

export const MessengerProvider: React.FC<MessengerProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      type: 'individual',
      participants: ['John Doe'],
      unreadCount: 2,
      pinned: false,
      archived: false,
      muted: false,
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now(),
      messages: [
        {
          id: '1',
          content: 'Hey there!',
          type: 'text',
          senderId: 'John Doe',
          receiverId: 'current-user',
          status: 'read',
          timestamp: Date.now() - 3600000
        }
      ]
    }
  ]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string, type: Message['type'] = 'text') => {
    if (!selectedChat) {
      showToast('No chat selected', 'error');
      return;
    }

    try {
      const message: Message = {
        id: Date.now().toString(),
        content,
        type,
        senderId: 'current-user',
        receiverId: selectedChat.participants[0],
        status: 'sent',
        timestamp: Date.now()
      };

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...(chat.messages || []), message],
            lastMessage: message,
            updatedAt: Date.now()
          };
        }
        return chat;
      }));

      showToast('Message sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const createChat = async (participants: string[]): Promise<Chat | null> => {
    try {
      const newChat: Chat = {
        id: Date.now().toString(),
        type: participants.length > 1 ? 'group' : 'individual',
        participants,
        unreadCount: 0,
        pinned: false,
        archived: false,
        muted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      setChats(prevChats => [...prevChats, newChat]);
      return newChat;
    } catch (error) {
      showToast('Failed to create chat', 'error');
      return null;
    }
  };

  const deleteChat = (chatId: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
    showToast('Chat deleted successfully!', 'success');
  };

  return (
    <MessengerContext.Provider value={{
      chats,
      selectedChat,
      setSelectedChat,
      sendMessage,
      createChat,
      deleteChat,
      isLoading
    }}>
      {children}
    </MessengerContext.Provider>
  );
};