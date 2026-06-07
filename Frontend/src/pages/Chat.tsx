import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Plus,
  Menu,
  X,
  Trash2,
  MessageSquare,
  Search,
  Settings,
  Bell,
  LogOut,
  Paperclip,
  Mic,
  Sun,
  Moon,
  ChevronRight,
  Zap,
  Brain,
  FolderOpen,
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

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";
const THEME_KEY = "aura-theme";

// ─── Colour tokens (matching index.css palette) ───────────────────────────────
const C = {
  olive: "hsl(83 18% 47%)",        // --primary
  mustard: "hsl(47 78% 59%)",      // --secondary
  bronze: "hsl(29 43% 59%)",       // --accent
  navy: "hsl(var(--navy-blue))",   // --navy-blue
  bg: "hsl(var(--background))",
  border: "hsl(var(--border))",
} as const;

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
  const [user, setUser] = useState<{
    fullName: { firstName: string; lastName: string };
    email: string;
  } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  // ── Theme ────────────────────────────────────────────────────────────────────
  const toggleTheme = () => {
    const next: "light" | "dark" = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch { /* noop */ }
  };

  // ── Socket ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io(BACKEND_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.on("connect", () => setIsOnline(true));
    socket.on("disconnect", () => setIsOnline(false));
    socket.on("connect_error", () => setIsOnline(false));

    socket.on("ai-response", (res: { content: string; chat: string }) => {
      setIsAiTyping(false);
      const aiMsg: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: res.content,
        timestamp: new Date(),
      };
      setMessages((p) => [...p, aiMsg]);
      setChatSessions((p) =>
        p.map((c) =>
          c.id === res.chat ? { ...c, messages: [...c.messages, aiMsg] } : c
        )
      );
    });

    socket.on("ai-error", (err: { message: string }) => {
      setIsAiTyping(false);
      setMessages((p) => [
        ...p,
        { id: Date.now().toString(), sender: "ai", content: `⚠️ ${err.message}`, timestamp: new Date() },
      ]);
    });

    return () => { socket.disconnect(); };
  }, []);

  // ── Load chats ───────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/chat/`, { credentials: "include" });
        const data = await res.json();
        if (data.chats) {
          setChatSessions(
            data.chats.map((c: BackendChat) => ({
              id: c._id, title: c.title,
              timestamp: new Date(c.lastActivity), messages: [],
            }))
          );
        }
      } catch { /* noop */ }
    })();
  }, []);

  // ── Mobile detect ────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Scroll to bottom ─────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // ── Fetch user ───────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/profile`, { credentials: "include" });
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch { /* noop */ }
    })();
  }, []);

  // ── Close user menu on outside click ────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const getInitial = () =>
    user?.fullName?.firstName?.charAt(0).toUpperCase() ?? "U";

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
      localStorage.removeItem("token");
      navigate("/login");
    } catch { alert("Logout failed. Please try again."); }
  };

  const handleNewChat = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/chat/`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });
      const data = await res.json();
      if (data.chat?._id) {
        const msgs: Message[] = (data.chat.messages ?? []).map((m: BackendMessage) => ({
          id: m._id, sender: m.role === "user" ? "user" : "ai",
          content: m.content, timestamp: new Date(m.timestamp ?? m.createdAt ?? Date.now()),
        }));
        const newChat: ChatSession = {
          id: data.chat._id, title: data.chat.title,
          timestamp: new Date(data.chat.lastActivity), messages: msgs,
        };
        setChatSessions((p) => [newChat, ...p]);
        setActiveChatId(data.chat._id);
        setMessages(msgs);
        if (isMobile) setSidebarOpen(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    } catch { /* noop */ }
  };

  const handleSelectChat = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/chat/${id}`, { credentials: "include" });
      const data = await res.json();
      if (data.chat) {
        setActiveChatId(id);
        const msgs: Message[] = data.chat.messages.map((m: BackendMessage) => ({
          id: m._id, sender: m.role === "user" ? "user" : "ai",
          content: m.content, timestamp: new Date(m.timestamp ?? m.createdAt ?? Date.now()),
        }));
        setMessages(msgs);
        setChatSessions((p) => p.map((c) => c.id === id ? { ...c, messages: msgs } : c));
        if (isMobile) setSidebarOpen(false);
      }
    } catch { /* noop */ }
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`${BACKEND_URL}/api/chat/${id}`, { method: "DELETE", credentials: "include" });
      setChatSessions((p) => p.filter((c) => c.id !== id));
      if (activeChatId === id) { setActiveChatId(null); setMessages([]); }
    } catch { /* noop */ }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !socketRef.current || !isOnline) return;
    trackEvent("chat_message", { length: inputValue.length });

    let chatId = activeChatId;
    if (!chatId) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/chat/`, {
          method: "POST", credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: inputValue.slice(0, 30) + (inputValue.length > 30 ? "…" : "") }),
        });
        const data = await res.json();
        if (!data.chat?._id) return;
        chatId = data.chat._id;
        const msgs: Message[] = (data.chat.messages ?? []).map((m: BackendMessage) => ({
          id: m._id, sender: m.role === "user" ? "user" : "ai",
          content: m.content, timestamp: new Date(m.timestamp ?? m.createdAt ?? Date.now()),
        }));
        setChatSessions((p) => [
          { id: chatId!, title: data.chat.title, timestamp: new Date(data.chat.lastActivity), messages: msgs },
          ...p,
        ]);
        setActiveChatId(chatId);
        setMessages(msgs);
      } catch { return; }
    }

    const userMsg: Message = { id: Date.now().toString(), sender: "user", content: inputValue, timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);
    setChatSessions((p) =>
      p.map((c) => c.id === chatId ? { ...c, messages: [...c.messages, userMsg] } : c)
    );

    socketRef.current.emit("ai-message", { chat: chatId, content: inputValue });
    setInputValue("");
    setIsAiTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const fmtTime = (d: Date | string) => {
    const date = new Date(d);
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    if (diffMin < 10080) return `${Math.floor(diffMin / 1440)}d ago`;
    return date.toLocaleDateString();
  };

  const fmtClock = (d: Date | string) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const actionButtons = [
    { emoji: "🔍", label: "Deep Search" },
    { emoji: "💭", label: "Think" },
    { emoji: "🖼️", label: "Edit Image" },
    { emoji: "📊", label: "Analyze" },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 flex overflow-hidden"
      style={{ background: "hsl(var(--background))", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ─── Mobile overlay ─────────────────────────────────────── */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════ SIDEBAR ════════════════════ */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0
          w-72 flex flex-col shrink-0
          border-r z-50 transition-all duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "hsl(var(--background) / 0.85)",
          backdropFilter: "blur(24px)",
          borderColor: "hsl(var(--border) / 0.5)",
        }}
      >
        {/* ── Sidebar header ── */}
        <div className="px-5 pt-6 pb-4 border-b shrink-0" style={{ borderColor: "hsl(var(--border) / 0.4)" }}>
          {/* Logo + name */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <AuraAILogo size="sm" showText={false} />
              <div>
                <h2 className="text-base font-black tracking-tight" style={{ color: C.navy }}>
                  Aura AI
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: isOnline ? C.mustard : C.bronze,
                      boxShadow: isOnline ? `0 0 6px ${C.mustard}` : `0 0 6px ${C.bronze}`,
                    }}
                  />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest opacity-80"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {isOnline ? "Online · Smart Node" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg transition-colors hover:bg-muted/40"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* New Chat button */}
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer"
            style={{
              background: C.mustard,
              color: "hsl(var(--secondary-foreground))",
              boxShadow: `0 6px 20px -4px ${C.mustard}60`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 24px -4px ${C.mustard}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 20px -4px ${C.mustard}60`;
            }}
          >
            <Plus className="w-4 h-4 stroke-[3px]" />
            Initiate Sync
          </button>
        </div>

        {/* ── Search ── */}
        <div className="px-5 pt-4 pb-2 shrink-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              type="text"
              placeholder="Search conversations…"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border outline-none transition-all bg-muted/40 border-border/50 text-foreground focus:border-secondary/60 focus:bg-background focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </div>

        {/* ── Quick actions ── */}
        <div className="px-5 py-3 shrink-0">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Zap, l: "Templates", color: C.mustard, bg: "rgba(232, 197, 71, 0.1)" },
              { icon: Brain, l: "Think", color: C.olive, bg: "rgba(122, 140, 94, 0.12)" },
              { icon: FolderOpen, l: "Files", color: C.bronze, bg: "rgba(196, 149, 106, 0.12)" }
            ].map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.l}
                  className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                  style={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border) / 0.4)",
                    boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.04)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${a.color}40`;
                    e.currentTarget.style.boxShadow = `0 4px 16px -4px ${a.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "hsl(var(--border) / 0.4)";
                    e.currentTarget.style.boxShadow = "0 2px 8px -2px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <div
                    className="p-2 rounded-xl flex items-center justify-center transition-transform duration-300"
                    style={{ background: a.bg, color: a.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-tight" style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                    {a.l}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Chat list ── */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <p
            className="text-[10px] font-black uppercase tracking-widest px-2 mb-3"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Recent Conversations
          </p>

          {chatSessions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare
                className="w-8 h-8 mx-auto mb-3 opacity-20"
                style={{ color: "hsl(var(--muted-foreground))" }}
              />
              <p className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                No chats yet
              </p>
              <p className="text-xs opacity-60 mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                Start your first conversation
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {chatSessions.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-0.5 border ${
                      isActive
                        ? "bg-muted/70 shadow-sm border-border/80"
                        : "bg-transparent hover:bg-muted/30 border-transparent hover:border-border/30"
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute left-0 top-3.5 bottom-3.5 w-1 rounded-r-full"
                        style={{ background: C.mustard }}
                      />
                    )}
                    <MessageSquare
                      className="w-4 h-4 shrink-0 transition-colors duration-300"
                      style={{
                        color: isActive
                          ? C.mustard
                          : "hsl(var(--muted-foreground) / 0.6)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs truncate transition-colors duration-300 ${
                          isActive ? "font-bold text-foreground" : "font-semibold text-foreground/80 group-hover:text-foreground"
                        }`}
                      >
                        {chat.title}
                      </p>
                      <p className="text-[10px] mt-0.5 font-medium opacity-60" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {fmtTime(chat.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-60 hover:opacity-100 p-1.5 rounded-lg transition-all hover:bg-muted duration-200 cursor-pointer"
                      style={{ color: C.bronze }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Sidebar footer / user card ── */}
        <div className="p-4 shrink-0 border-t" style={{ borderColor: "hsl(var(--border) / 0.3)" }}>
          <div
            className="flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all duration-300 hover:shadow-md hover:border-border/80"
            style={{
              background: "hsl(var(--card) / 0.5)",
              backdropFilter: "blur(12px)",
              borderColor: "hsl(var(--border) / 0.5)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 border shadow-inner"
              style={{
                background: C.olive,
                borderColor: "hsl(var(--border) / 0.2)",
              }}
            >
              {getInitial()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate" style={{ color: "hsl(var(--foreground))" }}>
                {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "Guest User"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                  Free Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ════════════════════ MAIN AREA ════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* ── Top header ── */}
        <header
          className="flex items-center justify-between px-5 py-3 border-b shrink-0 sticky top-0 z-30"
          style={{
            background: "hsl(var(--background) / 0.8)",
            backdropFilter: "blur(20px)",
            borderColor: "hsl(var(--border) / 0.4)",
          }}
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl transition-colors hover:bg-muted/40"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {sidebarOpen && !isMobile ? (
                <ChevronRight className="w-5 h-5 rotate-180" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <AuraAILogo size="sm" showText={false} />
              <div>
                <h1 className="text-sm font-black tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
                  Aura AI Assistant
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isOnline ? C.mustard : C.bronze }}
                  />
                  <span className="text-[10px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl transition-all hover:bg-muted/50"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Notifications */}
            <button
              className="relative p-2.5 rounded-xl transition-all hover:bg-muted/50"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <Bell className="w-4.5 h-4.5" />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full border-2"
                style={{
                  background: C.bronze,
                  borderColor: "hsl(var(--background))",
                }}
              />
            </button>

            {/* User avatar + menu */}
            <div className="relative" data-user-menu>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black transition-all hover:opacity-90 active:scale-95"
                style={{ background: C.olive }}
              >
                {getInitial()}
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-[100]"
                  style={{
                    background: "hsl(var(--background) / 0.97)",
                    backdropFilter: "blur(20px)",
                    borderColor: "hsl(var(--border) / 0.5)",
                  }}
                >
                  <div className="px-3 py-2.5 border-b mb-1" style={{ borderColor: "hsl(var(--border) / 0.4)" }}>
                    <p className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>
                      {user ? `${user.fullName.firstName} ${user.fullName.lastName}` : "User"}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {user?.email}
                    </p>
                  </div>

                  {[
                    { icon: Settings, label: "Account Settings" },
                    { icon: Bell, label: "Notifications" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl transition-all text-left hover:bg-muted/50"
                      style={{ color: "hsl(var(--foreground) / 0.8)" }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </button>
                  ))}

                  <div className="border-t mt-1 pt-1" style={{ borderColor: "hsl(var(--border) / 0.4)" }}>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl transition-all text-left font-semibold hover:bg-muted/50"
                      style={{ color: C.bronze }}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Messages / Welcome ── */}
        <main className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* ── Welcome screen ── */
            <div className="h-full flex flex-col items-center justify-center px-6 py-10 text-center">
              <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
                <AuraAILogo size="xl" showText={false} />
              </div>

              <p
                className="text-[11px] font-black uppercase tracking-[0.45em] mb-5"
                style={{ color: C.mustard, opacity: 0.8 }}
              >
                Neural Interface Active
              </p>

              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-6 max-w-3xl"
                style={{ color: C.navy }}
              >
                What would you like{" "}
                <span style={{ color: C.mustard }}>Aura</span> to
                <br className="hidden md:block" /> help you with today?
              </h2>

              <p
                className="text-sm md:text-base max-w-lg mb-10 font-medium leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
              >
                Augmenting <strong style={{ color: "hsl(var(--foreground) / 0.9)" }}>logic</strong>,{" "}
                <strong style={{ color: "hsl(var(--foreground) / 0.9)" }}>creativity</strong> &{" "}
                <strong style={{ color: "hsl(var(--foreground) / 0.9)" }}>vision</strong> in one fluid cycle.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
                {actionButtons.map((btn) => (
                  <button
                    key={btn.label}
                    className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      background: "hsl(var(--card) / 0.6)",
                      backdropFilter: "blur(12px)",
                      borderColor: "hsl(var(--border) / 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${C.mustard}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "hsl(var(--border) / 0.5)";
                    }}
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                      {btn.emoji}
                    </span>
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                      style={{ color: "hsl(var(--foreground) / 0.6)" }}
                    >
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Message thread ── */
            <div className="max-w-3xl mx-auto w-full px-5 py-8 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {/* AI avatar */}
                  {msg.sender === "ai" && (
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 self-end mb-5 shadow-md"
                      style={{ background: C.olive }}
                    >
                      A
                    </div>
                  )}

                  <div className={`max-w-[78%] ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className="px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words"
                      style={
                        msg.sender === "user"
                          ? {
                              background: C.olive,
                              color: "#fff",
                              borderBottomRightRadius: "4px",
                            }
                          : {
                              background: "hsl(var(--card) / 0.7)",
                              backdropFilter: "blur(12px)",
                              border: `1px solid hsl(var(--border) / 0.5)`,
                              color: "hsl(var(--foreground))",
                              borderBottomLeftRadius: "4px",
                            }
                      }
                    >
                      {msg.content}
                    </div>
                    <p
                      className="text-[10px] font-medium mt-1.5 px-1 opacity-50"
                      style={{
                        color:
                          msg.sender === "user"
                            ? C.mustard
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {fmtClock(msg.timestamp)}
                    </p>
                  </div>

                  {/* User avatar */}
                  {msg.sender === "user" && (
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 self-end mb-5 border"
                      style={{
                        background: `${C.mustard}20`,
                        borderColor: `${C.mustard}40`,
                        color: C.mustard,
                      }}
                    >
                      {getInitial()}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isAiTyping && (
                <div className="flex gap-3 animate-fade-in-up">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 self-end mb-5 shadow-md"
                    style={{ background: C.olive }}
                  >
                    A
                  </div>
                  <div
                    className="px-5 py-4 rounded-2xl border"
                    style={{
                      background: "hsl(var(--card) / 0.7)",
                      backdropFilter: "blur(12px)",
                      borderColor: "hsl(var(--border) / 0.5)",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    <div className="flex gap-1.5 items-center">
                      {[0, 150, 300].map((delay) => (
                        <div
                          key={delay}
                          className="w-2 h-2 rounded-full animate-bounce"
                          style={{ background: C.mustard, opacity: 0.7, animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-2" />
            </div>
          )}
        </main>

        {/* ── Input area ── */}
        <footer
          className="px-5 py-4 pb-6 shrink-0 border-t"
          style={{
            background: "hsl(var(--background) / 0.7)",
            backdropFilter: "blur(20px)",
            borderColor: "hsl(var(--border) / 0.3)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-center gap-2 p-2 rounded-[1.5rem] border transition-all duration-300 focus-within:shadow-lg"
              style={{
                background: "hsl(var(--card) / 0.8)",
                backdropFilter: "blur(12px)",
                borderColor: "hsl(var(--border) / 0.5)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = `${C.mustard}60`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--border) / 0.5)";
              }}
            >
              <button
                className="p-3 rounded-xl transition-all hover:bg-muted/50 shrink-0"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isOnline
                    ? "Ask Aura anything… code, ideas, or solutions"
                    : "Connecting to Aura…"
                }
                disabled={!isOnline}
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium px-2"
                style={{
                  color: "hsl(var(--foreground))",
                }}
              />

              <button
                className="hidden md:flex p-3 rounded-xl transition-all hover:bg-muted/50 shrink-0"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                <Mic className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || !isOnline}
                className="p-3 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
                style={
                  inputValue.trim() && isOnline
                    ? {
                        background: C.mustard,
                        color: "#1a1a2e",
                        boxShadow: `0 4px 16px -4px ${C.mustard}80`,
                        transform: "scale(1)",
                      }
                    : {
                        background: "hsl(var(--muted) / 0.4)",
                        color: "hsl(var(--muted-foreground) / 0.3)",
                        cursor: "not-allowed",
                      }
                }
                onMouseEnter={(e) => {
                  if (inputValue.trim() && isOnline)
                    e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>

            <p
              className="text-center text-[11px] mt-2.5 font-medium"
              style={{ color: "hsl(var(--muted-foreground) / 0.45)" }}
            >
              Aura can make mistakes. Check important info.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
