import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TranslateContainer from "./components/TranslateContainer";
import WordBase from "./components/WordBase";
import History from "./components/History";
import Footer from "./components/Footer";
import Settings from "./components/Settings";

export default function App() {
  const [page, setPage] = useState("translate");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const [srcLang, setSrcLang] = useState("auto");
  const [trgLang, setTrgLang] = useState("tr");

  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("words")) || []
  );

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [voiceSpeed, setVoiceSpeed] = useState(
    Number(localStorage.getItem("voiceSpeed")) || 1
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("voiceSpeed", voiceSpeed);
  }, [voiceSpeed]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!text.trim()) {
        setResult("");
        return;
      }

      try {
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${trgLang}&dt=t&q=${encodeURIComponent(
            text
          )}`
        );

        const data = await res.json();
        const translated = data[0][0][0];

        setResult(translated);

        const historyItem = {
          id: Date.now(),
          text,
          result: translated,
          from: srcLang,
          to: trgLang
        };

        const updated = [historyItem, ...history].slice(0, 20);

        setHistory(updated);
        localStorage.setItem("history", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [text, srcLang, trgLang]);

  const onSpeak = (content, lang) => {
    if (!content) return;

    window.speechSynthesis.cancel();

    const ut = new SpeechSynthesisUtterance(content);

    ut.lang = lang;
    ut.rate = voiceSpeed;

    window.speechSynthesis.speak(ut);
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang =
      srcLang === "auto" ? "en-US" : srcLang;

    recognition.start();

    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };
  };

  const onSave = () => {
    if (!text || !result) return;

    const newSaved = [
      { id: Date.now(), text, result },
      ...saved
    ];

    setSaved(newSaved);
    localStorage.setItem("words", JSON.stringify(newSaved));
  };

  const onDelete = (id) => {
    const filtered = saved.filter((i) => i.id !== id);

    setSaved(filtered);
    localStorage.setItem("words", JSON.stringify(filtered));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <div className="app-container">
    <Header
    theme={theme}
    toggleTheme={() =>
    setTheme(theme === "light" ? "dark" : "light")
    }
    onOpenSettings={() => setSettingsOpen(true)}
/>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Nav page={page} setPage={setPage} />

        
      </div>

      <main className="main-content">
        {page === "translate" ? (
          <TranslateContainer
            srcLang={srcLang}
            setSrcLang={setSrcLang}
            trgLang={trgLang}
            setTrgLang={setTrgLang}
            text={text}
            setText={setText}
            result={result}
            onSpeak={onSpeak}
            onSave={onSave}
            onVoice={startVoiceInput}
          />
        ) : page === "saved" ? (
          <WordBase saved={saved} onDelete={onDelete} />
        ) : (
          <History history={history} clearHistory={clearHistory} />
        )}
      </main>

      <Footer />

      <Settings
        open={settingsOpen}
        setOpen={setSettingsOpen}
        voiceSpeed={voiceSpeed}
        setVoiceSpeed={setVoiceSpeed}
      />
    </div>
  );
}