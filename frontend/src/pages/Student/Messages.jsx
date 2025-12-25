import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaSearch, FaPaperPlane, FaPhone, FaVideo, FaInfoCircle, FaPaperclip, FaSmile, FaImage } from 'react-icons/fa';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      name: 'Prof. Sarah Connor',
      role: 'Professor',
      department: 'Robotics Dept.',
      preview: 'Regarding your assignment...',
      time: '2m',
      unread: true,
      avatar: 'SC',
      online: true
    },
    {
      name: 'Admin Office',
      role: 'Admin',
      department: '',
      preview: 'Fee submission deadline...',
      time: '1d',
      unread: false,
      avatar: 'AO',
      online: false
    },
    {
      name: 'Dr. Alan Turing',
      role: 'Professor',
      department: 'Algorithms Class Q&A',
      preview: 'The complexities are discussed in chapter 4.',
      time: '3d',
      unread: false,
      avatar: 'AT',
      online: false
    },
    {
      name: 'Library Services',
      role: 'Library',
      department: '',
      preview: 'Book Due Notice',
      time: '5d',
      unread: false,
      avatar: 'LS',
      online: false
    }
  ];

  const messages = [
    {
      sender: 'Prof. Sarah Connor',
      text: 'Hello Alex, hope you are doing well with the semester project.',
      time: 'Today, 10:23 AM',
      isOwn: false
    },
    {
      sender: 'Prof. Sarah Connor',
      text: 'Please review the attached PDF for the updated project guidelines. The deadline is stricter this time.',
      time: 'Today, 10:23 AM',
      isOwn: false,
      attachment: {
        name: 'Project_Guidelines_v2.pdf',
        size: '2.4 MB'
      }
    },
    {
      sender: 'You',
      text: 'Received, thank you Professor. I will review it immediately.',
      time: '10:25 AM',
      isOwn: true
    },
    {
      sender: 'You',
      text: 'When exactly is the final submission portal closing?',
      time: '10:26 AM',
      isOwn: true
    }
  ];

  const filters = ['All', 'Unread'];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <StudentLayout>
      <div className="h-[calc(100vh-120px)] flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, index) => (
              <div
                key={index}
                onClick={() => setSelectedChat(index)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                  selectedChat === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 truncate">{conv.name}</h4>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">{conv.preview}</p>
                    {conv.department && (
                      <p className="text-xs text-gray-500">{conv.department}</p>
                    )}
                  </div>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {conversations[selectedChat].avatar}
                </div>
                {conversations[selectedChat].online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{conversations[selectedChat].name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  {conversations[selectedChat].role} • {conversations[selectedChat].department || 'College Admin'}
                  {conversations[selectedChat].online && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="text-green-600">● Online</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaPhone className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaVideo className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaInfoCircle className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                Today, Oct 24
              </span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {conversations[selectedChat].avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{message.sender}</span>
                      </div>
                    )}
                    
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isOwn
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      
                      {message.attachment && (
                        <div className={`mt-3 p-3 rounded-lg flex items-center gap-3 ${
                          message.isOwn ? 'bg-blue-500' : 'bg-red-50'
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                            message.isOwn ? 'bg-blue-400' : 'bg-red-100'
                          }`}>
                            📄
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${message.isOwn ? 'text-white' : 'text-gray-800'}`}>
                              {message.attachment.name}
                            </p>
                            <p className={`text-xs ${message.isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                              {message.attachment.size}
                            </p>
                          </div>
                          <button className={`p-2 rounded-lg ${message.isOwn ? 'hover:bg-blue-400' : 'hover:bg-red-100'}`}>
                            📥
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                      {message.time}
                      {message.isOwn && <span className="ml-1">✓✓</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaPaperclip className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaSmile className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaImage className="text-gray-600" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button 
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Messages;
