import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Send,
  Plus,
  Menu,
  X,
  Trash2,
  MessageSquare,
  Search,
  Settings,
  HelpCircle,
  Paperclip,
  Mic,
  Sun,
  Moon,
  Bell,
  LogOut
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useTracking } from "../hooks/useTracking";
import AuraAILogo from "../components/AuraAILogo";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date | string;
}

interface BackendMessage {
  _id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  createdAt?: string;
}

interface BackendChat {
  _id: string;
  title: string;
  lastActivity: string;
  messages: BackendMessage[];
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const Chat = () => {
  const navigate = useNavigate();
  const { trackEvent } = useTracking();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [user, setUser] = useState<{ fullName: { firstName: string, lastName: string }, email: string, avatar?: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";
  const THEME_STORAGE_KEY = "aura-theme";

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const setThemeAndPersist = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // no-op
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const next: 'light' | 'dark' = isDark ? 'light' : 'dark';
    setThemeAndPersist(next);
  };

  // socket connection
  useEffect(() => {
    const socket = io(BACKEND_URL, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setIsOnline(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsOnline(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsOnline(false);
    });

    // ✅ Listen for AI responses
    socket.on("ai-response", (response: { content: string; chat: string }) => {
      console.log("🤖 AI Response received:", response);
      setIsAiTyping(false);

      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Update chat session with new AI message
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === response.chat
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
    });

    // Listen for AI errors
    socket.on("ai-error", (error: { message: string; error: string }) => {
      console.error("❌ AI Error:", error);
      setIsAiTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          content: `⚠️ ${error.message}`,
          timestamp: new Date(),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  //  Load chats from backend on mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.chats) {
          const formattedChats: ChatSession[] = data.chats.map((chat: BackendChat) => ({
            id: chat._id,
            title: chat.title,
            timestamp: new Date(chat.lastActivity),
            messages: [],
          }));

          setChatSessions(formattedChats);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };

    loadChats();
  }, []);

  //  Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const getUserInitial = () => {
    if (user?.fullName?.firstName) {
      return user.fullName.firstName.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || !socketRef.current || !isOnline) return;

    trackEvent('chat_message', { length: inputValue.length });

    // If no active chat, create one first from backend
    let currentChatId = activeChatId;
    if (!activeChatId) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title:
              inputValue.slice(0, 30) + (inputValue.length > 30 ? "..." : ""),
          }),
        });

        const data = await response.json();

        if (data.chat && data.chat._id) {
          currentChatId = data.chat._id;
          
          const initialMessages = data.chat.messages?.map((msg: any) => ({
            id: msg._id,
            sender: msg.role === "user" ? "user" : "ai",
            content: msg.content,
            timestamp: new Date(msg.timestamp || msg.createdAt || Date.now()),
          })) || [];

          const newChat: ChatSession = {
            id: currentChatId,
            title: data.chat.title,
            timestamp: new Date(data.chat.lastActivity),
            messages: initialMessages,
          };
          setChatSessions((prev) => [newChat, ...prev]);
          setActiveChatId(currentChatId);
          setMessages(initialMessages);
        } else {
          console.error("Failed to create chat");
          return;
        }
      } catch (error) {
        console.error("Error creating chat:", error);
        return;
      }
    }

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);

    // Update chat session
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    // Emit message to socket server
    socketRef.current.emit("ai-message", {
      chat: currentChatId,
      content: inputValue,
    });

    console.log("📤 Message sent to AI:", {
      chat: currentChatId,
      content: inputValue,
    });

    // Clear input and show typing indicator
    setInputValue("");
    setIsAiTyping(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Chat",
        }),
      });

      const data = await response.json();

      if (data.chat && data.chat._id) {
        const initialMessages = data.chat.messages?.map((msg: any) => ({
          id: msg._id,
          sender: msg.role === "user" ? "user" : "ai",
          content: msg.content,
          timestamp: new Date(msg.timestamp || msg.createdAt || Date.now()),
        })) || [];

        const newChat: ChatSession = {
          id: data.chat._id,
          title: data.chat.title,
          timestamp: new Date(data.chat.lastActivity),
          messages: initialMessages,
        };
        
        setChatSessions([newChat, ...chatSessions]);
        setActiveChatId(data.chat._id);
        setMessages(initialMessages);
        
        if (isMobile) setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const handleSelectChat = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/${id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.chat) {
        setActiveChatId(id);

        const loadedMessages: Message[] = data.chat.messages.map(
          (msg: BackendMessage) => ({
            id: msg._id,
            sender: msg.role === "user" ? "user" : "ai", 
            content: msg.content,
            timestamp: new Date(msg.timestamp || msg.createdAt || Date.now()),
          })
        );

        setMessages(loadedMessages);

        setChatSessions((prev) =>
          prev.map((chat) =>
            chat.id === id ? { ...chat, messages: loadedMessages } : chat
          )
        );
      }

      if (isMobile) setSidebarOpen(false);
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  };

  const handleDeleteChat = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/chat/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setChatSessions(chatSessions.filter((chat) => chat.id !== id));

      if (activeChatId === id) {
        setActiveChatId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const actionButtons = [
    { icon: "🔍", label: "Deep Search", color: "from-blue-500 to-blue-600" },
    { icon: "💭", label: "Think", color: "from-purple-500 to-purple-600" },
    { icon: "🖼️", label: "Edit Image", color: "from-green-500 to-green-600" },
    { icon: "📊", label: "Analyze", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-background selection:bg-orange-100 selection:text-orange-900">
      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '30vw', height: '30vw', bottom: '10%', right: '10%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      {/* ==================== SIDEBAR ==================== */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0
          w-[280px] md:w-72 lg:w-80
          bg-background/40 backdrop-blur-3xl
          border-r border-border/50
          z-50 flex flex-col
          transform transition-transform duration-500 ease-out shadow-2xl lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="px-6 py-8 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
              <AuraAILogo size="sm" showText={false} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-black text-foreground tracking-tight">Aura <span className="shimmer-text">AI</span></h2>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`} />
                  {isOnline ? "Active" : "Offline"}
                </span>
                <span>•</span>
                <span>v2.0</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full relative overflow-hidden rounded-[1.25rem] px-4 py-4 font-black uppercase text-[11px] tracking-[0.2em] text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95 group"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 stroke-[3]" />
              New Flow
            </div>
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="px-6 py-4 shrink-0">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-orange-500" />
            <input
              type="text"
              placeholder="Search flows..."
              className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-2xl text-[13px] font-medium focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all"
            />
          </div>
        </div>

        {/* ================= RECENT CHATS ================= */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">
              Chronicles
            </h3>
            <button className="text-[10px] font-bold text-orange-500 hover:underline uppercase tracking-widest opacity-70">Clear</button>
          </div>

          <div className="space-y-1">
            {chatSessions.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-5 h-5 text-muted-foreground/40" />
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-50">Empty Space</p>
              </div>
            ) : (
              chatSessions.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`group relative px-4 py-3.5 rounded-[1.25rem] cursor-pointer transition-all duration-300 ${
                    activeChatId === chat.id
                      ? "bg-white dark:bg-white/5 shadow-lg border border-orange-500/20"
                      : "hover:bg-white/40 dark:hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeChatId === chat.id ? "bg-orange-500/10 text-orange-500" : "bg-muted/40 text-muted-foreground/60"
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${activeChatId === chat.id ? "text-foreground" : "text-foreground/70"}`}>
                        {chat.title}
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mt-0.5">
                        {formatTime(chat.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="p-4 shrink-0">
          <div className="px-5 py-4 bg-white/40 dark:bg-white/5 rounded-[1.5rem] border border-border/50 backdrop-blur-xl group cursor-pointer hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-inner group-hover:scale-105 transition-transform">
                {getUserInitial()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-foreground truncate">
                  {user ? `${user.fullName.firstName}` : "Guest"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Visionary</span>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================== MAIN CHAT AREA ==================== */}
      <div className="flex-1 flex flex-col bg-background min-w-0 relative z-10">
        {/* ==================== TOP HEADER ==================== */}
        <header className="flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-2xl border-b border-border/40 sticky top-0 z-30">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2.5 bg-muted/40 rounded-2xl transition-all active:scale-90"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full" />
                <AuraAILogo size="sm" showText={false} />
              </div>
              <div>
                <h1 className="text-sm font-black text-foreground tracking-tight">Liquid <span className="shimmer-text">Core</span></h1>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {isOnline ? "Synced" : "Paused"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full border border-border/50 mr-2">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">High Speed</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 hover:bg-muted/60 rounded-2xl transition-all active:scale-90 text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center text-white font-black text-xs shadow-lg hover:shadow-orange-500/20 transition-all active:scale-90 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {getUserInitial()}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-background/95 backdrop-blur-2xl rounded-[1.75rem] shadow-2xl border border-border/50 p-2 z-[100] animate-in fade-in zoom-in-95 duration-300 origin-top-right">
                  <div className="px-5 py-4 border-b border-border/40">
                    <p className="text-sm font-black text-foreground">
                      {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "User"}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                      {user?.email}
                    </p>
                  </div>

                  <div className="p-1 space-y-1 mt-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-xl transition-all">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ==================== MESSAGES / WELCOME AREA ==================== */}
        <main className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-orange-500/20 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 blur-[60px] opacity-20 animate-pulse rounded-full" />
                <div className="relative transform hover:scale-110 transition-transform duration-700 active:scale-95 cursor-pointer">
                  <AuraAILogo size="xl" showText={false} />
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.25em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Synchronizing Intelligence
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1] max-w-2xl">
                  What would you like <br />
                  <span className="shimmer-text">Aura</span> to solve today?
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-medium leading-relaxed opacity-80">
                  Ready to assist with coding, creative strategy, or complex reasoning.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-16">
                {actionButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    className="group relative p-6 bg-white/40 dark:bg-white/5 border border-border/50 rounded-[2rem] hover:border-orange-500/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex flex-col items-center gap-4">
                      <span className="text-4xl transform group-hover:scale-125 transition-transform duration-500">{btn.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70 group-hover:text-orange-500 transition-colors">
                        {btn.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12 space-y-10">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex gap-4 md:gap-6 animate-fade-in-up group ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {message.sender === "ai" && (
                    <div className="w-10 h-10 rounded-[1.25rem] bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-orange-500/20 self-end mb-1">
                      A
                    </div>
                  )}

                  <div className={`relative max-w-[85%] md:max-w-[80%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`px-6 py-4 rounded-[2rem] text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-br-none font-medium shadow-orange-500/20"
                          : "bg-white/60 dark:bg-white/5 backdrop-blur-xl text-foreground rounded-bl-none border border-border/50"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-2 opacity-40 px-2 ${message.sender === "user" ? "text-orange-500" : "text-muted-foreground"}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-10 h-10 rounded-[1.25rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-xs shrink-0 self-end mb-1">
                      {getUserInitial()}
                    </div>
                  )}
                </div>
              ))}

              {isAiTyping && (
                <div className="flex gap-6 animate-fade-in-up">
                  <div className="w-10 h-10 rounded-[1.25rem] bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-orange-500/20 self-end mb-1">
                    A
                  </div>
                  <div className="px-8 py-5 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-border/50">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-orange-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-orange-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </main>

        {/* ==================== INPUT AREA ==================== */}
        <footer className="relative z-20 px-6 py-6 md:pb-10 shrink-0">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 blur-2xl opacity-5 dark:opacity-10 rounded-[2.5rem] -z-10" />
            
            <div className="flex items-center gap-3 p-2 bg-white/60 dark:bg-white/5 backdrop-blur-3xl border border-border/50 rounded-[2.5rem] shadow-2xl transition-all focus-within:border-orange-500/30 focus-within:shadow-orange-500/5">
              <button className="p-4 hover:bg-muted/60 rounded-full transition-all active:scale-90 shrink-0 text-muted-foreground hover:text-orange-500">
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Aura anything..."
                disabled={!isOnline}
                className="flex-1 bg-transparent border-none text-base font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-0 px-2"
              />

              <button className="hidden md:flex p-4 hover:bg-muted/60 rounded-full transition-all active:scale-90 shrink-0 text-muted-foreground hover:text-orange-500">
                <Mic className="w-5 h-5" />
              </button>

              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || !isOnline}
                className={`
                  p-4 rounded-full flex items-center justify-center transition-all duration-500 active:scale-90
                  ${inputValue.trim() === "" || !isOnline
                    ? "bg-muted/40 text-muted-foreground/30 cursor-not-allowed"
                    : "bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
                  }
                `}
              >
                <Send className={`w-5 h-5 ${inputValue.trim() !== "" ? "translate-x-0.5 -translate-y-0.5 rotate-12 transition-transform" : ""}`} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
                {isOnline ? "Aura Active" : "Searching for Hub"}
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div>AES-256 Protocol</div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="text-orange-500/80">Powered by Liquid Core</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
