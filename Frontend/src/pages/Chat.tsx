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
  LogOut,
  Zap,
  Sparkles
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
    { icon: "🔍", label: "Deep Search", color: "#7A8C5E" },
    { icon: "💭", label: "Think", color: "#E8C547" },
    { icon: "🖼️", label: "Edit Image", color: "#C4956A" },
    { icon: "📊", label: "Analyze", color: "#7A8C5E" },
  ];

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-background selection:bg-secondary/10 selection:text-foreground">
      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', top: '-10%', left: '-10%', background: 'transparent', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '30vw', height: '30vw', bottom: '10%', right: '10%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
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
              <div className="absolute inset-0 bg-transparent rounded-full scale-150 opacity-0 group-hover:opacity-0 transition-opacity" />
              <AuraAILogo size="sm" showText={false} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-tight" style={{ color: 'hsl(var(--navy-blue))' }}>Aura AI</h2>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-secondary shadow-[0_0_8px_rgba(232,197,71,0.6)]" : "bg-[#C4956A] shadow-[0_0_8px_rgba(196,149,106,0.6)]"}`} />
                  {isOnline ? "Online" : "Offline"}
                </span>
                <span>• Smart Node</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full relative overflow-hidden rounded-[1.25rem] px-4 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-500 hover:-translate-y-1 active:scale-95 group"
            style={{ background: 'hsl(var(--secondary))' }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2">
               <Plus className="w-4 h-4" />
               Initiate Sync
            </div>
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="px-6 py-4 shrink-0">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search chats or topics…"
              className="w-full pl-11 pr-4 py-2.5 bg-muted/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/5 transition-all"
            />
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="px-6 py-2 shrink-0">
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-foreground/90">
            <button className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-muted/40 transition-colors">
              ⚡<span>Templates</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-muted/40 transition-colors">
              🧠<span>Think</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 rounded-xl hover:bg-muted/40 transition-colors">
              📂<span>Files</span>
            </button>
          </div>
        </div>

        {/* ================= RECENT CHATS ================= */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">
            Recent Conversations
          </h3>

          <div className="space-y-1">
            {chatSessions.length === 0 ? (
              <div className="text-center py-10 text-sm text-muted-foreground">
                No chats yet
                <p className="text-xs opacity-70 mt-1">Start your first conversation</p>
              </div>
            ) : (
              chatSessions.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`group relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeChatId === chat.id
                      ? "bg-white dark:bg-white/5 shadow-md border border-secondary/20 dark:border-secondary/20"
                      : "hover:bg-white/40 dark:hover:bg-white/5"
                  }`}
                >
                  {activeChatId === chat.id && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-secondary shadow-[0_0_8px_rgba(232,197,71,0.5)]"></span>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <MessageSquare className={`w-4 h-4 mt-0.5 ${activeChatId === chat.id ? "text-secondary" : "text-muted-foreground/70"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {chat.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {formatDateTime(chat.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#C4956A]/10 dark:hover:bg-[#C4956A]/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#C4956A]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="p-4 shrink-0">
          <div className="px-5 py-4 bg-white/40 dark:bg-white/5 rounded-2xl border border-border/50 backdrop-blur-xl">
            <p className="text-sm font-bold text-foreground truncate">
              {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "Guest User"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-secondary/80 animate-pulse"></span>
              <p className="text-[11px] text-muted-foreground font-medium">Free Plan • Encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================== MAIN CHAT AREA ==================== */}
      <div className="flex-1 flex flex-col bg-background min-w-0 relative z-10">
        {/* ==================== TOP HEADER ==================== */}
        <header className="flex items-center justify-between px-6 py-3 bg-background/50 backdrop-blur-2xl border-b border-border/40 sticky top-0 z-30">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted/40 rounded-xl transition-all"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <AuraAILogo size="sm" showText={false} />
              <div>
                <h1 className="text-sm md:text-base font-bold text-foreground truncate tracking-tight">
                  Aura AI Assistant
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-secondary" : "bg-[#C4956A]"}`} />
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium capitalize">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 hover:bg-muted/60 rounded-xl transition-all text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2.5 hover:bg-muted/60 rounded-xl transition-all relative text-muted-foreground">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#C4956A] border-2 border-background"></div>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 transition-all cursor-pointer overflow-hidden group"
                style={{ background: 'hsl(var(--primary))', ringColor: 'hsl(var(--primary) / 0.3)' }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {getUserInitial()}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-60 bg-background/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/50 p-2 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-border/40">
                    <p className="text-sm font-bold text-foreground">
                      {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground/80 hover:bg-muted/50 rounded-lg transition-all text-left">
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground/80 hover:bg-muted/50 rounded-lg transition-all text-left">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </button>
                  </div>

                  <div className="border-t border-border/40 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#C4956A] hover:bg-[#C4956A]/10 dark:hover:bg-[#C4956A]/20 rounded-lg transition-all text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ==================== MESSAGES / WELCOME AREA ==================== */}
        <main className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-secondary/20 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6 py-8">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full" style={{ background: 'transparent', opacity: 0.2 }} />
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <AuraAILogo size="xl" showText={false} />
                </div>
              </div>

              <p className="text-xs md:text-sm text-secondary font-bold uppercase tracking-[0.4em] mb-4 opacity-70">
                Neural Interface Active
              </p>
              
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-center mb-8 max-w-3xl leading-[1.1] tracking-tighter" style={{ color: 'hsl(var(--navy-blue))' }}>
                What would you like <span className="shimmer-text">Aura</span> to <br className="hidden md:block" /> help you with today?
              </h2>

              <p className="text-sm md:text-lg text-black dark:text-muted-foreground text-center max-w-xl mb-12 px-6 leading-relaxed font-medium opacity-60">
                Augmenting <span className="text-foreground/90">logic</span>, <span className="text-foreground/90">creativity</span> & <span className="text-foreground/90">vision</span> in one fluid cycle.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-4">
                {actionButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    className="group relative flex flex-col items-center justify-center gap-4 p-8 bg-white/40 dark:bg-white/[0.03] border border-border/40 rounded-[2rem] hover:border-secondary/20 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="absolute inset-0" style={{ background: 'transparent', opacity: 0 }} />
                    <span className="text-3xl transform group-hover:scale-110 transition-transform duration-500">{btn.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70 group-hover:text-secondary transition-colors">
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex gap-4 md:gap-6 animate-fade-in-up ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {message.sender === "ai" && (
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg self-end mb-1" style={{ background: 'hsl(var(--primary))' }}>
                      A
                    </div>
                  )}

                  <div className={`relative max-w-[85%] md:max-w-[75%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`px-5 py-3.5 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-none font-medium"
                          : "bg-white/60 dark:bg-white/5 backdrop-blur-xl text-foreground rounded-bl-none border border-border/50"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mt-2 opacity-50 px-1 ${message.sender === "user" ? "text-secondary" : "text-muted-foreground"}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary font-bold text-xs shrink-0 self-end mb-1">
                      {getUserInitial()}
                    </div>
                  )}
                </div>
              ))}

              {isAiTyping && (
                <div className="flex gap-6 animate-fade-in-up">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg self-end mb-1" style={{ background: 'hsl(var(--primary))' }}>
                    A
                  </div>
                  <div className="px-7 py-4 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-secondary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </main>

        {/* ==================== INPUT AREA ==================== */}
        <footer className="px-6 py-6 md:pb-10 shrink-0 bg-background/50 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 rounded-3xl -z-10" style={{ background: 'transparent', opacity: 0.05 }} />
            
            <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-white/5 backdrop-blur-3xl border border-border/50 rounded-[1.75rem] shadow-2xl transition-all focus-within:border-secondary/30">
              <button className="p-3.5 hover:bg-muted/60 rounded-full transition-all text-muted-foreground hover:text-secondary shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Aura anything… code, ideas, or solutions"
                disabled={!isOnline}
                className="flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none text-sm md:text-base font-medium text-foreground placeholder:text-muted-foreground/40 px-2"
              />

              <button className="hidden md:flex p-3.5 hover:bg-muted/60 rounded-full transition-all text-muted-foreground hover:text-secondary shrink-0">
                <Mic className="w-5 h-5" />
              </button>

              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || !isOnline}
                className={`
                  p-3.5 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${inputValue.trim() === "" || !isOnline
                    ? "bg-muted/40 text-muted-foreground/30 cursor-not-allowed"
                    : "bg-secondary text-white shadow-lg hover:shadow-secondary/40 hover:scale-105 active:scale-95"
                  }
                `}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-[11px] text-muted-foreground/50 font-medium tracking-wide">
                Aura can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
