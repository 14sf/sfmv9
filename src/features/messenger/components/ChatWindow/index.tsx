import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, Image, Smile } from 'lucide-react';
import { Chat, Message } from '../../types';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';
import { useToast } from '../../../../hooks/useToast';

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (content: string, type: Message['type']) => void;
  onUploadFile: (file: File) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  onSendMessage,
  onUploadFile
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim(), 'text');
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 16 * 1024 * 1024) { // 16MB limit
        showToast('File size must be less than 16MB', 'error');
        return;
      }
      onUploadFile(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <ChatHeader chat={chat} />

      <MessageList messages={chat.messages || []} />

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full p-3 max-h-32 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500"
              rows={1}
            />
            <button
              className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => showToast('Emoji picker coming soon!', 'info')}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Paperclip className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Image className="w-5 h-5" />
            </motion.button>

            {message ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleVoiceRecord}
                className={`p-2 rounded-full ${
                  isRecording
                    ? 'bg-red-600 text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                <Mic className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,application/pdf"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;