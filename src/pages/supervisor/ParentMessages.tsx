
import React, { useState } from 'react';
import { Mail, Search, Send } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

// Sample data for parents
const parentData = [
  {
    id: '1',
    childName: 'Noah Williams',
    childId: 'C001',
    parentName: 'Sarah Williams',
    lastMessageDate: '2 hours ago',
    avatar: null,
    therapist: 'Dr. Emma Thompson',
    therapyType: 'Speech Therapy',
    unread: true
  },
  {
    id: '2',
    childName: 'Mia Rodriguez',
    childId: 'C002',
    parentName: 'Carlos Rodriguez',
    lastMessageDate: 'Yesterday',
    avatar: null,
    therapist: 'Dr. Michael Chen',
    therapyType: 'Behavior Therapy',
    unread: false
  },
  {
    id: '3',
    childName: 'Alex Johnson',
    childId: 'C003',
    parentName: 'Rachel Johnson',
    lastMessageDate: '3 days ago',
    avatar: null,
    therapist: 'Dr. Sarah Williams',
    therapyType: 'Sensory Therapy',
    unread: false
  },
  {
    id: '4',
    childName: 'Lily Chang',
    childId: 'C004',
    parentName: 'David Chang',
    lastMessageDate: '1 week ago',
    avatar: null,
    therapist: 'Dr. Emma Thompson',
    therapyType: 'Occupational Therapy',
    unread: false
  }
];

// Sample message history
const sampleMessages = {
  '1': [
    { id: 'm1', sender: 'parent', content: 'Hi, I wanted to ask about Noah\'s progress in his speech therapy sessions.', timestamp: '2023-07-10T14:30:00' },
    { id: 'm2', sender: 'supervisor', content: 'Hello Mrs. Williams, Noah has been doing very well! He\'s made significant improvements in articulation over the past month.', timestamp: '2023-07-10T14:45:00' },
    { id: 'm3', sender: 'parent', content: 'That\'s great to hear! Is there anything we should be practicing at home?', timestamp: '2023-07-10T15:00:00' },
    { id: 'm4', sender: 'supervisor', content: 'Yes, Dr. Thompson has recommended daily practice with the word list we sent home last week. Also, reading aloud for 15 minutes each day would be beneficial.', timestamp: '2023-07-10T15:15:00' }
  ],
  '2': [
    { id: 'm1', sender: 'parent', content: 'Hello, Mia has been struggling with her exercises at home. Any advice?', timestamp: '2023-07-09T10:30:00' },
    { id: 'm2', sender: 'supervisor', content: 'Hi Mr. Rodriguez, I understand your concern. Can you tell me specifically which exercises are challenging for her?', timestamp: '2023-07-09T11:00:00' }
  ],
  '3': [
    { id: 'm1', sender: 'supervisor', content: 'Mrs. Johnson, I wanted to share that Alex had a breakthrough in his session today!', timestamp: '2023-07-07T16:00:00' },
    { id: 'm2', sender: 'parent', content: 'That\'s wonderful news! What happened?', timestamp: '2023-07-07T16:30:00' },
    { id: 'm3', sender: 'supervisor', content: 'He successfully completed a full sensory integration exercise without any distress. Dr. Williams was very impressed with his progress.', timestamp: '2023-07-07T17:00:00' }
  ],
  '4': [
    { id: 'm1', sender: 'parent', content: 'Just confirming Lily\'s appointment for next Thursday at 3 PM.', timestamp: '2023-07-03T09:15:00' },
    { id: 'm2', sender: 'supervisor', content: 'Yes, that\'s correct. We have her scheduled with Dr. Thompson. See you then!', timestamp: '2023-07-03T09:30:00' }
  ]
};

const SupervisorParentMessages = () => {
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageDrafts, setMessageDrafts] = useState<Record<string, string>>({});
  const [messageHistory, setMessageHistory] = useState(sampleMessages);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [composeRecipient, setComposeRecipient] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const { toast } = useToast();

  const filteredParents = parentData.filter(parent => {
    const searchLower = searchQuery.toLowerCase();
    return (
      parent.childName.toLowerCase().includes(searchLower) ||
      parent.parentName.toLowerCase().includes(searchLower) ||
      parent.therapyType.toLowerCase().includes(searchLower)
    );
  });

  const handleSendMessage = () => {
    if (!selectedParent || !messageText.trim()) return;
    
    // Create new message and add to history
    const newMessage = {
      id: `m${Date.now()}`,
      sender: 'supervisor',
      content: messageText,
      timestamp: new Date().toISOString()
    };
    
    setMessageHistory(prev => ({
      ...prev,
      [selectedParent]: [...(prev[selectedParent] || []), newMessage]
    }));
    
    setMessageText('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully"
    });
  };

  const handleComposeSend = () => {
    if (!composeRecipient || !composeMessage.trim()) return;
    
    // Find the parent ID based on child name
    const parent = parentData.find(p => 
      p.childName.toLowerCase() === composeRecipient.toLowerCase()
    );
    
    if (parent) {
      // Create new message and add to history
      const newMessage = {
        id: `m${Date.now()}`,
        sender: 'supervisor',
        content: composeMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessageHistory(prev => ({
        ...prev,
        [parent.id]: [...(prev[parent.id] || []), newMessage]
      }));
      
      setComposeModalOpen(false);
      setComposeRecipient('');
      setComposeMessage('');
      
      toast({
        title: "Message Sent",
        description: `Your message to ${parent.parentName} has been sent successfully`
      });
    } else {
      toast({
        title: "Recipient Not Found",
        description: "Please enter a valid child name",
        variant: "destructive"
      });
    }
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <PageLayout title="Parent Messages">
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* Parent List */}
          <div className="lg:col-span-1 border rounded-lg bg-white overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="flex space-x-2 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search parents or children..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={() => setComposeModalOpen(true)}>
                  <Mail className="h-4 w-4 mr-1" /> New
                </Button>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              {filteredParents.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                <div className="divide-y">
                  {filteredParents.map(parent => (
                    <div
                      key={parent.id}
                      onClick={() => setSelectedParent(parent.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedParent === parent.id ? 'bg-blue-50' : ''
                      } ${parent.unread ? 'font-medium' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="avatar-initial h-10 w-10">
                          {parent.parentName.charAt(0)}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium truncate">
                              {parent.parentName}
                            </h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {parent.lastMessageDate}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            Child: {parent.childName} • {parent.therapyType}
                          </p>
                          {parent.unread && (
                            <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-1"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Message Area */}
          <div className="lg:col-span-2 border rounded-lg bg-white overflow-hidden flex flex-col">
            {selectedParent ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b">
                  {(() => {
                    const parent = parentData.find(p => p.id === selectedParent);
                    return parent ? (
                      <div className="flex items-center space-x-3">
                        <div className="avatar-initial h-10 w-10">
                          {parent.parentName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{parent.parentName}</h3>
                          <p className="text-xs text-gray-600">
                            Parent of {parent.childName} • {parent.therapyType} with {parent.therapist}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
                
                {/* Message History */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {messageHistory[selectedParent]?.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'supervisor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg p-3 ${
                            message.sender === 'supervisor'
                              ? 'bg-blue-500 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none shadow'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'supervisor' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatMessageDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="resize-none"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                <Mail className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Conversation</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a parent from the list to view your conversation history or start a new conversation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Compose New Message Modal */}
      <Dialog open={composeModalOpen} onOpenChange={setComposeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium">Child's Name</label>
              <Input
                id="recipient"
                placeholder="Enter child's name..."
                value={composeRecipient}
                onChange={(e) => setComposeRecipient(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Enter the full name of the child to message their parent
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                rows={4}
                value={composeMessage}
                onChange={(e) => setComposeMessage(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleComposeSend} disabled={!composeRecipient || !composeMessage.trim()}>
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default SupervisorParentMessages;
