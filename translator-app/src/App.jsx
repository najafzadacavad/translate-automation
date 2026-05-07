import { useState } from "react";
import { dictionary } from "./data/dictionary";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Card from "./components/Card";
import Result from "./components/Result";
import Button from "./components/Button";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("translate");

  const [text, setText] = useState("");
  const [lang, setLang] = useState("tr");
  const [result, setResult] = useState("Translation...");

  const translateText = () => {
    const word = text.toLowerCase().trim();
    if (!word) return setResult("Enter text");

    if (dictionary[word]) {
      setResult(dictionary[word][lang]);
    } else {
      setResult("Not found");
    }
  };

  return (
    <div>
      <Header title="Translator" />


      <div className="menu">
        <button onClick={() => setPage("translate")}>Translate</button>
        <button onClick={() => setPage("wordbase")}>Word Base</button>
      </div>


      {page === "translate" && (
        <>
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
        </>
      )}

      {page === "wordbase" && (
        <div className="box">
          <h3>Word Base</h3>

          {Object.keys(dictionary).map((w) => (
            <div key={w} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              <b>{w}</b> → TR: {dictionary[w].tr} | AZ: {dictionary[w].az}
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}