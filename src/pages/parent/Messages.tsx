
import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Clock, 
  Search,
  ChevronDown,
  Filter,
  MoreVertical,
  Image,
  File
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for messages
const messagesData = [
  {
    id: 1,
    supervisor: {
      name: 'Dr. Sarah Wilson',
      avatar: null,
      role: 'Lead Supervisor'
    },
    messages: [
      {
        id: 1,
        sender: 'supervisor',
        text: "Hi Jessica, I wanted to check in about Alex's progress with the new speech exercises. Have you noticed any improvements over the past week?",
        timestamp: '2023-09-25T10:30:00Z',
        read: true
      },
      {
        id: 2,
        sender: 'parent',
        text: "Hello Dr. Wilson! Yes, we've been practicing daily and I've noticed he's getting better at the 'S' sound at the beginning of words. He still struggles a bit when it's in the middle of words though.",
        timestamp: '2023-09-25T11:15:00Z',
        read: true
      },
      {
        id: 3,
        sender: 'supervisor',
        text: "That's excellent progress! The beginning of words is typically easier to master first, so that's right on track. For the middle-of-word placement, try the word card game I gave you last session. 5-10 minutes of practice with those specific cards should help.",
        timestamp: '2023-09-25T14:22:00Z',
        read: true
      },
      {
        id: 4,
        sender: 'supervisor',
        text: "Also, I've added a new activity to Alex's home program that might be fun - it's a scavenger hunt for items with the 'S' sound. Let me know if you have questions about it.",
        timestamp: '2023-09-25T14:25:00Z',
        read: true
      },
      {
        id: 5,
        sender: 'parent',
        text: "That sounds perfect! He loves scavenger hunts so that should be very motivating. We'll try both approaches this week and I'll let you know how it goes.",
        timestamp: '2023-09-25T15:40:00Z',
        read: true
      },
      {
        id: 6,
        sender: 'supervisor',
        text: "Great! I've also attached a progress report from our last session. Alex is showing consistent improvement in all areas, especially in the clarity of his speech sounds. We'll continue focusing on the 'S' and 'L' sounds in our next session.",
        timestamp: '2023-09-26T09:10:00Z',
        read: false,
        attachment: {
          type: 'document',
          name: 'Alex_Progress_Report_Sep2023.pdf'
        }
      }
    ],
    unread: 1
  },
  {
    id: 2,
    supervisor: {
      name: 'Dr. Michael Chen',
      avatar: null,
      role: 'Behavior Specialist'
    },
    messages: [
      {
        id: 1,
        sender: 'supervisor',
        text: "Hello Jessica, I'm following up on our behavior management strategies we discussed last week. Has Alex been using the calm-down corner at home?",
        timestamp: '2023-09-20T13:15:00Z',
        read: true
      },
      {
        id: 2,
        sender: 'parent',
        text: "Hi Dr. Chen, yes he has! We set up the corner with the visual timer and breathing chart as you suggested. He's used it twice this week when he felt overwhelmed. It seems to be helping him regulate his emotions better.",
        timestamp: '2023-09-20T15:40:00Z',
        read: true
      },
      {
        id: 3,
        sender: 'supervisor',
        text: "That's wonderful to hear! Self-regulation is a big step. For our next session, I'd like to focus on transitional cues to help with moving between activities. Could you note any specific transitions that are challenging at home?",
        timestamp: '2023-09-21T09:22:00Z',
        read: false
      }
    ],
    unread: 1
  }
];

const ParentMessages = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState(messagesData[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the supervisor.",
    });
    
    // In a real app, you would send the message to the backend here
    setMessageText('');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else {
      return date.toLocaleDateString([], {month: 'short', day: 'numeric'}) + 
             `, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    }
  };
  
  const filteredConversations = messagesData.filter(convo => 
    convo.supervisor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <PageLayout title="Messages">
      <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-lg border">
        {/* Conversation List */}
        <div className="w-full sm:w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="text-sm font-medium">All Messages</span>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter conversations</span>
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-3 cursor-pointer border-b hover:bg-accent/50 transition-colors ${activeConversation.id === conversation.id ? 'bg-accent' : ''}`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{conversation.supervisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm truncate">{conversation.supervisor.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(conversation.messages[conversation.messages.length - 1].timestamp).split(',')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{conversation.supervisor.role}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs truncate max-w-[70%]">
                        {conversation.messages[conversation.messages.length - 1].text.substring(0, 50)}
                        {conversation.messages[conversation.messages.length - 1].text.length > 50 ? '...' : ''}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge variant="default" className="text-[10px] h-5 min-w-5 flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Area */}
        <div className="hidden sm:flex flex-col flex-1">
          {/* Conversation Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {activeConversation.supervisor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeConversation.supervisor.name}</h3>
                <p className="text-xs text-muted-foreground">{activeConversation.supervisor.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Conversation options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View supervisor info</DropdownMenuItem>
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Report conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Messages List */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {activeConversation.messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] ${
                    message.sender === 'parent' 
                      ? 'bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                      : 'bg-muted rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  } p-3 text-sm`}
                >
                  {message.text}
                  
                  {message.attachment && (
                    <div className="mt-2 p-2 bg-background/60 rounded flex items-center gap-2">
                      {message.attachment.type === 'document' ? (
                        <File className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Image className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-xs">{message.attachment.name}</span>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 flex justify-end items-center gap-1 ${
                    message.sender === 'parent' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    <Clock className="h-3 w-3" />
                    {formatDate(message.timestamp).split(',')[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <Textarea 
                placeholder="Type your message..." 
                className="min-h-24 resize-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="icon" title="Attach file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage} disabled={messageText.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message area placeholder for mobile */}
        <div className="flex flex-1 items-center justify-center sm:hidden">
          <div className="text-center p-4">
            <h3 className="font-medium mb-2">Select a conversation</h3>
            <p className="text-sm text-muted-foreground">Choose a conversation from the list to view messages</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ParentMessages;
