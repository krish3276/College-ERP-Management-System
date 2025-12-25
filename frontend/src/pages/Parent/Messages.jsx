import { useState } from 'react';
import ParentLayout from '../../components/layouts/ParentLayout';
import { FaSearch, FaPaperPlane, FaPaperclip, FaSmile, FaImage, FaPhone, FaVideo, FaInfoCircle, FaPlus } from 'react-icons/fa';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState('');

  const conversations = [
    {
      name: 'Mrs. Sarah Jenkins',
      role: 'Homeroom Teacher',
      status: 'Online',
      time: '10:30 AM',
      preview: 'Can you please sign the permission ...',
      unread: false,
      avatar: 'SJ',
      online: true
    },
    {
      name: 'Principal Skinner',
      role: 'Principal',
      status: '',
      time: 'Yesterday',
      preview: 'School closure update due to weathe...',
      unread: false,
      avatar: 'PS',
      online: false
    },
    {
      name: 'Mr. Anderson',
      role: 'Math Teacher',
      status: '',
      time: 'Tue',
      preview: "Timmy's math project looks great!",
      unread: false,
      avatar: 'MA',
      online: false
    },
    {
      name: 'Nurse Joy',
      role: 'School Nurse',
      status: '',
      time: 'Mon',
      preview: 'Annual health checkup forms.',
      unread: false,
      avatar: 'NJ',
      online: false
    }
  ];

  const messages = [
    {
      sender: 'Mrs. Jenkins',
      text: "Hello! Just wanted to let you know Timmy did great on his science presentation today. He was very confident!🌟",
      time: 'Today, 9:41 AM',
      isOwn: false,
      avatar: 'SJ'
    },
    {
      sender: 'You',
      text: "That is wonderful to hear! Thank you so much for the update, Mrs. Jenkins. He was really nervous about it this morning.",
      time: 'Read 10:15 AM',
      isOwn: true
    },
    {
      sender: 'Mrs. Jenkins',
      text: "He handled it like a pro. Also, I wanted to remind you about the field trip permission slip. We need it by Friday.",
      time: '',
      isOwn: false,
      avatar: 'SJ',
      attachment: {
        name: 'Permission_Slip.pdf',
        size: '1.2 MB'
      }
    },
    {
      sender: 'You',
      text: '',
      time: '10:30 AM',
      isOwn: true
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <ParentLayout>
      <div className="h-[calc(100vh-120px)] flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <FaPlus />
              </button>
            </div>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers or messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* New Conversation Button */}
          <div className="p-4 border-b border-gray-200">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
              <FaPlus />
              New Conversation
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, index) => (
              <div
                key={index}
                onClick={() => setSelectedChat(index)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                  selectedChat === index ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
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
                    <p className="text-xs text-gray-500">{conv.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    {conversations[selectedChat].avatar}
                  </div>
                  {conversations[selectedChat].online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{conversations[selectedChat].name}</h3>
                  <p className="text-sm flex items-center gap-1">
                    <span className="text-gray-600">{conversations[selectedChat].role}</span>
                    {conversations[selectedChat].online && (
                      <>
                        <span className="text-gray-400">•</span>
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
          </div>

          {/* Notice Banner */}
          <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              This conversation is with a staff member.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                Today, 9:41 AM
              </span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.filter(m => m.text || m.attachment).map((message, index) => (
                <div key={index} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                          {message.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{message.sender}</span>
                      </div>
                    )}
                    
                    {message.text && (
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    )}
                    
                    {message.attachment && (
                      <div className={`mt-2 p-3 rounded-lg flex items-center gap-3 ${
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
                    
                    {message.time && (
                      <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                        {message.time}
                        {message.isOwn && message.time.includes('Read') && <span className="ml-1">✓✓</span>}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 mb-2">
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
                placeholder="Type a message to Mrs. Jenkins..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button 
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default Messages;
