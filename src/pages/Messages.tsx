
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

// Mock data for chats
const mockUsers = [
  { id: '1', name: 'Sara Ahmed', avatar: '/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png', lastMessage: 'Hi, is this item still available?', timestamp: '2h ago', unread: true },
  { id: '2', name: 'Ahmed Hassan', avatar: '/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png', lastMessage: 'Yes, I can meet tomorrow at 3pm', timestamp: '5h ago', unread: false },
  { id: '3', name: 'Lara Smith', avatar: '/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png', lastMessage: 'Is the price negotiable?', timestamp: '1d ago', unread: false },
  { id: '4', name: 'Omar Mohammed', avatar: '/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png', lastMessage: 'Thank you!', timestamp: '2d ago', unread: false },
];

// Mock messages for the current conversation
const mockMessages = [
  { id: '1', sender: '2', content: 'Hello! I saw your listing for the Zara sandals', timestamp: '10:30 AM' },
  { id: '2', sender: 'me', content: 'Yes, they are still available!', timestamp: '10:32 AM' },
  { id: '3', sender: '2', content: 'Great! Is the price negotiable?', timestamp: '10:35 AM' },
  { id: '4', sender: 'me', content: 'I can do a small discount if you can pick them up today', timestamp: '10:40 AM' },
  { id: '5', sender: '2', content: 'Yes, I can meet tomorrow at 3pm', timestamp: '10:45 AM' },
  { id: '6', sender: 'me', content: 'Perfect, see you then!', timestamp: '10:47 AM' },
];

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState(mockMessages);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: `${conversations.length + 1}`,
        sender: 'me',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversations([...conversations, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-playfair font-bold mb-8">Messages</h1>
      
      <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
        {/* Conversations sidebar */}
        <div className="w-full md:w-1/3 bg-oldie-lightgray/20 rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Recent Conversations</h2>
          </div>
          <div className="overflow-y-auto h-[calc(70vh-4rem)]">
            {mockUsers.map((user) => (
              <div 
                key={user.id}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-oldie-lightgray/30 border-b ${selectedUser.id === user.id ? 'bg-oldie-lightgray/40' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {user.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500">{user.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat window */}
        <div className="flex-1 bg-oldie-lightgray/10 rounded-lg flex flex-col overflow-hidden">
          {selectedUser ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="font-medium">{selectedUser.name}</h2>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                {conversations.map((message) => (
                  <div 
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'me' 
                        ? 'bg-oldie-black text-white rounded-br-none' 
                        : 'bg-oldie-lightgray/40 rounded-bl-none'
                    }`}>
                      <p>{message.content}</p>
                      <span className={`text-xs ${message.sender === 'me' ? 'text-gray-300' : 'text-gray-500'} block text-right mt-1`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-oldie-black text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
