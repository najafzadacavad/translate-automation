import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TranslateContainer from "./components/TranslateContainer";
import WordBase from "./components/WordBase";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("translate");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [srcLang, setSrcLang] = useState("en");
  const [trgLang, setTrgLang] = useState("tr");
  const [saved, setSaved] = useState(JSON.parse(localStorage.getItem("words")) || []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!text.trim()) { setResult(""); return; }
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${srcLang}&tl=${trgLang}&dt=t&q=${encodeURI(text)}`);
        const data = await res.json();
        setResult(data[0][0][0]);
      } catch (e) { console.error(e); }
    }, 600);
    return () => clearTimeout(timer);
  }, [text, srcLang, trgLang]);

  const onSpeak = (content, lang) => {
    const ut = new SpeechSynthesisUtterance(content);
    ut.lang = lang;
    window.speechSynthesis.speak(ut);
  };

  const onSave = () => {
    if (!text || !result) return;
    const newSaved = [{ id: Date.now(), text, result }, ...saved];
    setSaved(newSaved);
    localStorage.setItem("words", JSON.stringify(newSaved));
  };

  const onDelete = (id) => {
    const filtered = saved.filter(item => item.id !== id);
    setSaved(filtered);
    localStorage.setItem("words", JSON.stringify(filtered));
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")} />
      <Nav page={page} setPage={setPage} />
      
      <main className="main-content">
        {page === "translate" ? (
          <TranslateContainer 
            srcLang={srcLang} setSrcLang={setSrcLang} 
            trgLang={trgLang} setTrgLang={setTrgLang}
            text={text} setText={setText} 
            result={result} onSpeak={onSpeak} onSave={onSave}
          />
        ) : (
          <WordBase saved={saved} onDelete={onDelete} />
        )}
      </main>

      <Footer />
    </div>
  );
}