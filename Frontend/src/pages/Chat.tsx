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
      alert(`Error: ${error.message}`);
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
          const newChat: ChatSession = {
            id: currentChatId,
            title: data.chat.title,
            timestamp: new Date(data.chat.lastActivity),
            messages: [],
          };
          setChatSessions((prev) => [newChat, ...prev]);
          setActiveChatId(currentChatId);
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
        const newChat: ChatSession = {
          id: data.chat._id,
          title: data.chat.title,
          timestamp: new Date(data.chat.lastActivity),
          messages: [],
        };
        setChatSessions([newChat, ...chatSessions]);
        setActiveChatId(data.chat._id);
        setMessages([]);
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
      {/* ==================== SIDEBAR ==================== */}
      <div
        className={`
    fixed lg:static inset-y-0 left-0
    w-[280px] md:w-72 lg:w-80
    bg-card
    border-r border-border
    z-50 flex flex-col
    transform transition-transform duration-300 ease-out shadow-xl lg:shadow-none
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* ================= HEADER ================= */}
        <div className="px-4 py-6 border-b border-border shrink-0">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-4">
            {/* Aura Orb */}
            <div className="relative">
              <div className="absolute inset-0 w-10 h-10 rounded-full gradient-orange blur-md opacity-40 animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">Aura AI</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"
                      }`}
                  ></span>
                  {isOnline ? "Online" : "Offline"}
                </span>
                <span>• Smart Mode</span>
              </div>
            </div>
          </div>

          {/* New Chat CTA */}
          <button
            onClick={handleNewChat}
            className="w-full gradient-orange text-white rounded-xl px-4 py-3 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="text-base">+ New Chat</div>
            <p className="text-xs font-normal opacity-90 mt-0.5">
              Start something new
            </p>
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Search chats or topics…"
              className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-foreground/90">
            <button className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-muted">
              ⚡<span>Templates</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-muted">
              🧠
              <span>Think</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-muted">
              📂
              <span>Files</span>
            </button>
          </div>
        </div>

        {/* ================= RECENT CHATS ================= */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
            Recent Conversations
          </h3>

          {chatSessions.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground mt-10">
              No chats yet
              <p className="text-xs text-muted-foreground/70 mt-1">
                Start your first conversation
              </p>
            </div>
          ) : (
            chatSessions.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`group relative px-3 py-3 rounded-lg cursor-pointer transition-all ${activeChatId === chat.id
                  ? "bg-background shadow-sm border border-orange-200"
                  : "hover:bg-background"
                  }`}
              >
                {/* Active Indicator */}
                {activeChatId === chat.id && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-orange-500"></span>
                )}

                <div className="flex items-start gap-2">
                  <MessageSquare
                    className={`w-4 h-4 mt-0.5 ${activeChatId === chat.id
                      ? "text-orange-500"
                      : "text-muted-foreground/70"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {chat.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(chat.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t border-border bg-background p-4 shrink-0">
          <div className="px-3 py-3 bg-card rounded-xl border border-border shadow-sm">
            <p className="text-sm font-bold text-foreground truncate">
              {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "Guest User"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-[11px] text-muted-foreground font-medium">Free Plan • Encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================== MAIN CHAT AREA ==================== */}
      <div className="flex-1 flex flex-col bg-background min-w-0">
        {/* ==================== TOP HEADER ==================== */}
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-xl transition-colors duration-150"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              A
            </div>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-bold text-foreground truncate">
                Aura AI Assistant
              </h1>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                ></div>
                <p className="text-[10px] md:text-xs text-muted-foreground font-medium capitalize">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 hover:bg-muted rounded-xl transition-colors relative text-muted-foreground">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></div>
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-blue-100 hover:ring-blue-300 transition-all cursor-pointer"
              >
                {getUserInitial()}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-background rounded-xl shadow-xl border border-border py-2 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-bold text-foreground">
                      {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/90 hover:bg-card transition-colors text-left">
                      <Settings className="w-4 h-4 text-muted-foreground/70" />
                      Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/90 hover:bg-card transition-colors text-left">
                      <Bell className="w-4 h-4 text-muted-foreground/70" />
                      Notifications
                    </button>
                  </div>

                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}

              {/* Overlay to close menu */}
              {showUserMenu && (
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setShowUserMenu(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ==================== MESSAGES / WELCOME AREA ==================== */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center px-4 py-8">
              {/* Aura Glow Orb */}
              <div className="relative mb-8 flex items-center justify-center">
                {/* Glow Layer */}
                <div className="absolute w-16 h-16 rounded-full gradient-orange blur-xl opacity-40 animate-pulse"></div>

                {/* Core Orb */}
                <div className="relative w-16 h-16 rounded-full gradient-orange flex items-center justify-center shadow-lg animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05 5.636 5.636"
                    />
                  </svg>
                </div>
              </div>

              {/* Greeting */}
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium mb-3">
                Good evening 👋
              </p>

              {/* Main Heading */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6 max-w-2xl leading-tight px-4">
                What would you like Aura to help you with today?
              </h2>

              {/* Tagline */}
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground text-center max-w-xl mb-10 px-6">
                Your personal AI for{" "}
                <span className="text-foreground/90 font-medium">coding</span>,{" "}
                <span className="text-foreground/90 font-medium">creativity</span> &{" "}
                <span className="text-foreground/90 font-medium">clarity</span>
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl px-4">
                {actionButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    className="flex items-center justify-center lg:justify-start gap-2 px-4 py-3 md:py-4 bg-card border border-border rounded-xl hover:bg-muted hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-lg md:text-xl">{btn.icon}</span>
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages Area
            <div className="h-full">
              <div className="max-w-4xl mx-auto w-full px-4 md:px-6 lg:px-12 py-6 md:py-10 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 md:gap-4 animate-fade-in-up ${message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                      }`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm self-end">
                        A
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[75%] px-4 md:px-5 py-3 rounded-2xl shadow-sm ${message.sender === "user"
                        ? "bg-orange-500 text-white rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none border border-border"
                        }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p
                        className={`text-[10px] mt-2 font-medium ${message.sender === "user"
                          ? "text-orange-100"
                          : "text-muted-foreground/70"
                          }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm self-end ring-2 ring-blue-50">
                        {getUserInitial()}
                      </div>
                    )}
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isAiTyping && (
                  <div className="flex gap-4 animate-fade-in-up">
                    <div className="w-9 h-9 rounded-lg gradient-orange flex items-center justify-center text-white font-bold text-sm shrink-0">
                      A
                    </div>
                    <div className="max-w-xl px-5 py-3 rounded-lg bg-muted">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>
        {/* ==================== INPUT AREA ==================== */}
        <div className="border-t border-border bg-background px-4 py-4 md:py-5 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Attachment */}
              <button className="p-2 hover:bg-muted rounded-lg transition shrink-0">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* INPUT */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Aura anything… code, ideas, or solutions"
                disabled={!isOnline}
                className="
         flex-1 min-w-0
  px-4 md:px-5 py-3 md:py-4
  bg-card border border-input rounded-xl
          text-sm md:text-base text-foreground
          placeholder-muted-foreground
          focus:outline-none
          focus:border-orange-500
          focus:ring-2 focus:ring-orange-200
          shadow-sm
          disabled:opacity-50 disabled:cursor-not-allowed
        "
              />

              {/* Mic */}
              <button className="p-2 hover:bg-muted rounded-lg transition shrink-0">
                <Mic className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* SEND BUTTON */}
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || !isOnline}
                title="Send"
                className={`
            relative shrink-0
  px-4 md:px-5 py-3 md:py-4
          rounded-xl
          flex items-center justify-center
          transition-all duration-200
          ${inputValue.trim() === "" || !isOnline
                    ? "bg-green-300 cursor-not-allowed opacity-50"
                    : "bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-400/40"
                  }
        `}
              >
                {/* Glow */}
                {inputValue.trim() !== "" && isOnline && (
                  <span className="absolute inset-0 rounded-xl bg-green-400 opacity-20 blur-md"></span>
                )}

                <Send className="relative w-5 h-5 text-white" />
              </button>
            </div>

            {/* Footer Status */}
            <div className="mt-3 text-center space-y-1">
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"
                      }`}
                  ></span>
                  {isOnline ? "AI Online" : "AI Offline"}
                </span>
                <span>•</span>
                <span>🔒 End-to-end encrypted</span>
              </div>

              <p className="text-xs text-muted-foreground/70">
                Voice enabled •{" "}
                <span className="text-orange-600 font-medium">
                  Powered by Aura AI
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
