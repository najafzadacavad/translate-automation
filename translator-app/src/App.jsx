import { useState } from "react";
import { dictionary } from "./data/dictionary";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Card from "./components/Card";
import Result from "./components/Result";
import Button from "./components/Button";
import Footer from "./components/Footer";

import "./index.css";

export default function App() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("tr");
  const [result, setResult] = useState("Translation...");
  const [alert, setAlert] = useState("Type a word and translate it");

  const translateText = () => {
    const word = text.toLowerCase().trim();

    if (!word) {
      setResult("Please enter text");
      return;
    }

    if (dictionary[word]) {
      setResult(dictionary[word][lang]);
      setAlert("Translated successfully!");
    } else {
      setResult("Translation not found");
    }
  };

  return (
    <div>
      <Header title="Translator" />
      <Menu />

      <p className="alert">{alert}</p>

      <div className="container">
        <Card
          title="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Result title="Result" result={result} />
      </div>

      <div className="controls">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="tr">Turkish</option>
          <option value="az">Azerbaijani</option>
        </select>

        <Button text="Translate" onClick={translateText} />
      </div>

      <Footer />
    </div>
  );
}