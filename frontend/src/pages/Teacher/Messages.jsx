import { useState } from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import { FaSearch, FaPaperPlane, FaPhone, FaVideo, FaInfoCircle, FaPaperclip, FaSmile, FaImage } from 'react-icons/fa';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const conversations = [
    {
      name: 'Sarah Jenkins (Parent)',
      preview: 'Re: Math Homework - Thanks! I\'ve signe...',
      time: '2m',
      unread: false,
      avatar: 'SJ',
      relation: 'Mother of Ryan Jenkins (Grade 10-B)'
    },
    {
      name: 'David Miller',
      preview: 'Question about the upcoming history pro...',
      time: '1h',
      unread: false,
      avatar: 'DM',
      role: 'Student'
    },
    {
      name: 'Emily Wong',
      preview: 'Can I submit the assignment via email?',
      time: '3h',
      unread: false,
      avatar: 'EW',
      role: 'Student'
    },
    {
      name: 'Principal Thompson',
      preview: 'Staff meeting agenda for Friday.',
      time: 'Yesterday',
      unread: false,
      avatar: 'PT',
      role: 'Staff'
    }
  ];

  const messages = [
    {
      sender: 'Sarah Jenkins',
      text: 'Hi Mr. Anderson, Ryan mentioned he forgot his permission slip for the field trip on his desk. Is it too late to send it in tomorrow?',
      time: '10:42 AM',
      isOwn: false
    },
    {
      sender: 'You',
      text: 'Hello Mrs. Jenkins! No worries at all. If he brings it in first thing tomorrow morning, that will be perfectly fine. We don\'t leave until 10:00 AM.',
      time: '10:45 AM',
      isOwn: true
    },
    {
      sender: 'Sarah Jenkins',
      text: 'Thanks! I\'ve signed it and Ryan will bring it tomorrow. Also, he\'s very excited about the museum!',
      time: '11:02 AM',
      isOwn: false
    }
  ];

  const filters = ['All', 'Students', 'Parents', 'Unread'];

  return (
    <TeacherLayout>
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
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800 truncate">{conv.name}</h4>
                      <span className="text-xs text-gray-500 ml-2">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">{conv.preview}</p>
                    {conv.relation && (
                      <p className="text-xs text-gray-500">{conv.relation}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                {conversations[selectedChat].avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{conversations[selectedChat].name}</h3>
                <p className="text-sm text-gray-600">
                  {conversations[selectedChat].relation || conversations[selectedChat].role}
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
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                          SJ
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
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                      {message.time}
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
                placeholder="Type a message to Sarah..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium">
                Send
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Messages;
