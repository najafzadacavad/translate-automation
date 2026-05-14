import React, {
  useState,
  useEffect
} from "react";

import Tesseract from "tesseract.js";

import Header from "./components/Header";
import Nav from "./components/Nav";
import TranslateContainer from "./components/TranslateContainer";
import WordBase from "./components/WordBase";
import History from "./components/History";
import Footer from "./components/Footer";
import Settings from "./components/Settings";

export default function App() {

  const [page, setPage] =
    useState("translate");

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "light"
    );

  const [text, setText] =
    useState("");

  const [result, setResult] =
    useState("");

  const [srcLang, setSrcLang] =
    useState("auto");

  const [trgLang, setTrgLang] =
    useState("tr");

  const [saved, setSaved] =
    useState(
      JSON.parse(
        localStorage.getItem("words")
      ) || []
    );

  const [history, setHistory] =
    useState(
      JSON.parse(
        localStorage.getItem("history")
      ) || []
    );

  const [settingsOpen,
    setSettingsOpen] =
    useState(false);

  const [voiceSpeed,
    setVoiceSpeed] =
    useState(
      Number(
        localStorage.getItem(
          "voiceSpeed"
        )
      ) || 1
    );

  const languageMap = {
    en: "en",
    tr: "tr",
    az: "az",
    ru: "ru",
    de: "de",
    fr: "fr",
    es: "es",
    it: "it",
    pt: "pt",
    ar: "ar",
    zh: "zh-CN",
    ja: "ja",
    ko: "ko"
  };

  useEffect(() => {

    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  useEffect(() => {

    localStorage.setItem(
      "voiceSpeed",
      voiceSpeed
    );

  }, [voiceSpeed]);

  useEffect(() => {

    const timer =
      setTimeout(async () => {

      if (!text.trim()) {
        setResult("");
        return;
      }

      try {

        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${trgLang}&dt=t&q=${encodeURIComponent(text)}`
        );

        const data =
          await res.json();

        const translated =
          data[0][0][0];

        const detectedLang =
          data[2];

        setResult(translated);

        if (
          srcLang === "auto" &&
          detectedLang
        ) {

          setSrcLang(
            languageMap[
              detectedLang
            ] || detectedLang
          );
        }

        const historyItem = {
          id: Date.now(),
          text,
          result: translated,
          from: srcLang,
          to: trgLang
        };

        const updatedHistory = [
          historyItem,
          ...history
        ].slice(0, 20);

        setHistory(
          updatedHistory
        );

        localStorage.setItem(
          "history",
          JSON.stringify(
            updatedHistory
          )
        );

      } catch (e) {
        console.error(e);
      }

    }, 600);

    return () =>
      clearTimeout(timer);

  }, [
    text,
    srcLang,
    trgLang
  ]);

  const onSpeak = (
    content,
    lang
  ) => {

    if (!content) {

      alert("Text is empty");

    } else {

      window.speechSynthesis
        .cancel();

      const ut =
        new SpeechSynthesisUtterance(
          content
        );

      ut.lang = lang;
      ut.rate = voiceSpeed;

      window.speechSynthesis
        .speak(ut);

    }
  };

  const startVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      srcLang === "auto"
      ? "en-US"
      : srcLang;

    recognition.start();

    recognition.onresult =
      (event) => {

      const transcript =
        event.results[0][0]
        .transcript;

      setText(transcript);
    };
  };

  const onImageUpload =
    async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    try {

      const {
        data: { text }
      } =
      await Tesseract.recognize(
        file,
        "eng"
      );

      setText(text);

    } catch (err) {
      console.error(err);
    }
  };

  const onSave = () => {

    if (!text || !result)
      return;

    const newSaved = [
      {
        id: Date.now(),
        text,
        result
      },
      ...saved
    ];

    setSaved(newSaved);

    localStorage.setItem(
      "words",
      JSON.stringify(newSaved)
    );
  };

  const onDelete = (id) => {

    const filtered =
      saved.filter(
        item =>
          item.id !== id
      );

    setSaved(filtered);

    localStorage.setItem(
      "words",
      JSON.stringify(filtered)
    );
  };

  const clearHistory = () => {

    setHistory([]);

    localStorage.removeItem(
      "history"
    );
  };

  const onSwap = () => {

    if (srcLang === "auto")
      return;

    const oldSrc = srcLang;
    const oldTrg = trgLang;

    const oldText = text;
    const oldResult = result;

    setSrcLang(oldTrg);
    setTrgLang(oldSrc);

    setText(oldResult);
    setResult(oldText);
  };

  return (
    <div className="app-container">

      <Header
        theme={theme}
        toggleTheme={() =>
          setTheme(
            theme === "light"
            ? "dark"
            : "light"
          )
        }
        onOpenSettings={() =>
          setSettingsOpen(true)
        }
      />

      <Nav
        page={page}
        setPage={setPage}
      />

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

            onVoice={
              startVoiceInput
            }

            onSwap={onSwap}

            onImageUpload={
              onImageUpload
            }

          />

        ) : page === "saved" ? (

          <WordBase
            saved={saved}
            onDelete={onDelete}
          />

        ) : (

          <History
            history={history}
            clearHistory={
              clearHistory
            }
          />

        )}

      </main>

      <Footer />

      <Settings
        open={settingsOpen}
        setOpen={setSettingsOpen}
        voiceSpeed={voiceSpeed}
        setVoiceSpeed={
          setVoiceSpeed
        }
      />

    </div>
  );
}