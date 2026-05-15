import {
  Languages,
  Moon,
  Sun,
  Settings
} from "lucide-react";

export default function Header({
  theme,
  toggleTheme,
  onOpenSettings,
  aiMode,
  setAiMode
}) {

  return (
    <header className="header">

      <div className="logo-section">

        <Languages
          size={28}
          color="var(--primary)"
        />

        <h1 className="app-title">
          Translate
        </h1>

      </div>

      <div className="header-actions">

        <button
          className={`ai-btn ${
            aiMode
            ? "active"
            : ""
          }`}
          onClick={() =>
            setAiMode(!aiMode)
          }
        >
          AI
        </button>

        <button
          className="btn-icon"
          onClick={onOpenSettings}
        >
          <Settings size={20} />
        </button>

        <button
          className="btn-icon"
          onClick={toggleTheme}
        >

          {theme === "light"
          ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}

        </button>

      </div>

    </header>
  );
}