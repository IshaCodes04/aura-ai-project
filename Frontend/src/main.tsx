import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const THEME_STORAGE_KEY = "aura-theme";

function applyInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = stored === "dark" || stored === "light" ? stored : systemPrefersDark ? "dark" : "light";

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {
    // no-op (private mode / disabled storage)
  }
}

applyInitialTheme();

// Fix: Disable browser scroll restoration so page always starts at top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);

