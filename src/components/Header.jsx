import { Languages, Moon, Sun } from "lucide-react";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="logo-section">
        <Languages size={28} color="var(--primary)" />
        <h1 className="app-title">Translate</h1>
      </div>
      <button className="btn-icon" onClick={toggleTheme}>
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}