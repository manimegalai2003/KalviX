
import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, BookOpen, Send, Save, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: Date;
}

const Edubot: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "வணக்கம்! நான் உங்கள் தமிழ் கல்வி உதவியாளர். 10, 11, 12ம் வகுப்புகளின் தமிழ் பாடங்களில் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(currentMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const getBotResponse = (message: string): string => {
    const responses = [
      "அருமையான கேள்வி! தமிழ் இலக்கணம் பற்றி மேலும் விவரிக்கிறேன்...",
      "இந்த பாடம் முக்கியமானது. இதை இப்படி புரிந்து கொள்ளுங்கள்...",
      "தமிழ் கவிதை பற்றிய உங்கள் கேள்வி சிறப்பு. இதற்கான விளக்கம்...",
      "பழமொழிகள் மற்றும் பாடல்கள் பற்றி மேலும் தெரிந்து கொள்ள விரும்புகிறீர்களா?",
      "இந்த தலைப்பில் உங்களுக்கு சந்தேகம் உள்ளதா? மேலும் விளக்கமளிக்கிறேன்..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      toast({
        title: "குறிப்பு சேர்க்க முடியவில்லை",
        description: "தலைப்பு மற்றும் உள்ளடக்கம் இரண்டும் தேவை",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: notes.length + 1,
      title: newNoteTitle,
      content: newNoteContent,
      timestamp: new Date()
    };

    setNotes(prev => [...prev, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
    
    toast({
      title: "குறிப்பு சேர்க்கப்பட்டது!",
      description: "உங்கள் குறிப்பு வெற்றிகரமாக சேமிக்கப்பட்டது",
    });
  };

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "குறிப்பு நீக்கப்பட்டது",
      description: "குறிப்பு வெற்றிகரமாக நீக்கப்பட்டது",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-500">Edubot</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your Tamil Learning Assistant for Classes 10, 11, and 12
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className={`grid w-full grid-cols-2 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'
          }`}>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle>Tamil Study Chat</CardTitle>
                <CardDescription>
                  Ask questions about Tamil literature, grammar, and poetry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-96 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isUser
                              ? 'bg-blue-600 text-white'
                              : isDarkMode
                              ? 'bg-gray-800 text-gray-100'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 opacity-70 ${
                            message.isUser ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex space-x-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="தமிழ் பாடங்கள் பற்றி கேளுங்கள்..."
                    className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-6">
              {/* Add New Note */}
              <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
                <CardHeader>
                  <CardTitle>Add New Note</CardTitle>
                  <CardDescription>
                    Create notes for your Tamil studies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="குறிப்பின் தலைப்பு..."
                    className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                  />
                  <Textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="குறிப்பின் உள்ளடக்கம்..."
                    className={`min-h-[100px] ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                  />
                  <Button onClick={saveNote} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </CardContent>
              </Card>

              {/* Notes List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.length === 0 ? (
                  <Card className={`col-span-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <CardContent className="text-center py-8">
                      <BookOpen className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                        No notes yet. Create your first note above!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  notes.map((note) => (
                    <Card
                      key={note.id}
                      className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>
                          {note.timestamp.toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {note.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Edubot;
