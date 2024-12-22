import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, Shield, Edit2, Key, Wallet } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useProfile } from '../../contexts/ProfileContext';

interface AccountManagerProps {
  onClose: () => void;
}

const AccountManager: React.FC<AccountManagerProps> = ({ onClose }) => {
  const { profileImage, setProfileImage, userName, setUserName } = useProfile();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userName);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        showToast('Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUsername = () => {
    if (editedName.trim()) {
      setUserName(editedName);
      setIsEditing(false);
      showToast('Username updated successfully!', 'success');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-8">Account Management</h2>
      
      {/* Profile Section */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        
        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="px-2 py-1 text-xl font-bold text-white bg-transparent border-b-2 border-blue-500 focus:outline-none"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveUsername}
                className="text-blue-400"
              >
                Save
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-300"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
          <p className="text-blue-400">Premium Member</p>
        </div>
      </div>

      {/* Connected Wallets */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Connected Wallets</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-medium text-white">MetaMask</p>
                <p className="text-sm text-gray-400">0x1234...5678</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Connected</span>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Secure your account with 2FA</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountManager;