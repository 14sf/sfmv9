import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Trash2, Search } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Lease Agreement.pdf', type: 'contract', date: '2024-02-15', size: '2.5 MB' },
    { id: '2', name: 'Tax Declaration.pdf', type: 'tax', date: '2024-02-10', size: '1.8 MB' },
    { id: '3', name: 'Property Insurance.pdf', type: 'insurance', date: '2024-02-05', size: '3.2 MB' }
  ]);
  const { showToast } = useToast();

  const handleUpload = () => {
    showToast('Document uploaded successfully!', 'success');
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    showToast('Document deleted successfully!', 'success');
  };

  const handleDownload = (name: string) => {
    showToast(`Downloading ${name}...`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Document Management
          </h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        {/* Document List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doc.date} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDownload(doc.name)}
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Contracts & Leases', count: 5 },
          { label: 'Tax Documents', count: 3 },
          { label: 'Insurance Papers', count: 2 }
        ].map((category) => (
          <motion.div
            key={category.label}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {category.label}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {category.count} documents
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};