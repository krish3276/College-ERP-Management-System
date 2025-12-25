import { useState } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import { FaPaperPlane, FaCode, FaSmile, FaPaperclip } from 'react-icons/fa';

const AIAssistant = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS 202');
  const [selectedAI, setSelectedAI] = useState('ChatGPT-4');
  const [message, setMessage] = useState('');

  const recentSessions = [
    {
      title: 'Calculus Review',
      subject: 'Math 101',
      date: 'Yesterday',
      icon: '📐'
    },
    {
      title: 'Python Debugging',
      subject: 'CS 202',
      date: '2 days ago',
      icon: '💻'
    },
    {
      title: 'Thermodynamics Laws',
      subject: 'PHY 101',
      date: 'Last Week',
      icon: '🔬'
    },
    {
      title: 'History Essay Outline',
      subject: 'HUM 101',
      date: 'Last Week',
      icon: '📚'
    }
  ];

  const chatMessages = [
    {
      type: 'ai',
      text: "Hello Alex! I'm ready to help with your Data Structures assignment. What specific algorithm or problem are we looking at today?",
      time: 'Today, 10:23 AM'
    },
    {
      type: 'user',
      text: "Can you explain the time complexity of QuickSort in the worst-case scenario? Also, show me a quick implementation in Python.",
      time: 'You'
    },
    {
      type: 'ai',
      text: "Certainly! The worst-case time complexity of QuickSort is O(n²). This happens when the pivot chosen is always the smallest or largest element (e.g., when the array is already sorted).\n\nHere is a standard Python implementation:",
      time: 'Today, 10:23 AM',
      code: `def partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
    (array[i + 1], array[high]) = (array[high], array[i + 1])
    return i + 1

def quick_sort(array, low, high):
    if low < high:
        pi = partition(array, low, high)
        quick_sort(array, low, pi - 1)
        quick_sort(array, pi + 1, high)`
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <StudentLayout>
      <div className="h-[calc(100vh-120px)] flex gap-6">
        {/* Sidebar */}
        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* AI Selector */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">AI Study Companion</h3>
                <p className="text-xs text-gray-500">Ask questions, generate summaries, or debug code.</p>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="CS 202">Data Structures (CS 202)</option>
                <option value="MATH 101">Calculus</option>
                <option value="PHY 101">Physics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Model</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAI('ChatGPT-4')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedAI === 'ChatGPT-4'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ChatGPT-4
                </button>
                <button
                  onClick={() => setSelectedAI('Gemini Pro')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    selectedAI === 'Gemini Pro'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Gemini Pro
                </button>
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Recent History</h4>
              <button className="text-blue-600 hover:underline text-xs">
                + New Study Session
              </button>
            </div>

            <div className="space-y-2">
              {recentSessions.map((session, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{session.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{session.title}</p>
                      <p className="text-xs text-gray-500">{session.subject} • {session.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AI Assistant</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{selectedCourse}</p>
                <p className="text-xs text-gray-500">{selectedAI}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-6 max-w-4xl mx-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm">🤖</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">AI Assistant</span>
                      </div>
                    )}
                    
                    <div className={`px-4 py-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      
                      {msg.code && (
                        <div className="mt-3 bg-gray-900 text-white rounded-lg p-4 overflow-x-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">quicksort.py</span>
                            <button className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1">
                              <FaCode />
                              Copy
                            </button>
                          </div>
                          <pre className="text-sm">
                            <code>{msg.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-xs text-gray-500 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaPaperclip className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FaSmile className="text-gray-600" />
              </button>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a follow-up question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button 
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AIAssistant;
