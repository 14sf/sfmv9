import React from 'react';
import { motion } from 'framer-motion';
import { Chat } from '../../types';
import ChatListItem from './ChatListItem';
import { useMessenger } from '../../contexts/MessengerContext';

interface ChatListProps {
  selectedChatId?: string;
  onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  selectedChatId,
  onSelectChat
}) => {
  const { chats, isLoading } = useMessenger();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sortedChats = (chats || []).sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then sort by last message timestamp
    const aTime = a.lastMessage?.timestamp || a.updatedAt;
    const bTime = b.lastMessage?.timestamp || b.updatedAt;
    return bTime - aTime;
  });

  return (
    <div className="h-full overflow-y-auto">
      {sortedChats.map((chat) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChatListItem
            chat={chat}
            isSelected={chat.id === selectedChatId}
            onClick={() => onSelectChat(chat)}
          />
        </motion.div>
      ))}

      {chats.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">
            No conversations yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;