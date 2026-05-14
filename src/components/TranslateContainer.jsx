import { motion } from "framer-motion";

import {
  ArrowLeftRight
} from "lucide-react";

import LangSelector from "./LangSelector";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

export default function TranslateContainer({
  srcLang,
  setSrcLang,
  trgLang,
  setTrgLang,
  text,
  setText,
  result,
  onSpeak,
  onSave,
  onVoice,
  onSwap,
  onImageUpload
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="translate-wrapper"
    >

      <div className="selectors-row">

        <div className="selector-group">
          <LangSelector
            label="From"
            value={srcLang}
            onChange={setSrcLang}
          />
        </div>

        <button
          className={`swap-btn ${
            srcLang === "auto"
              ? "disabled"
              : ""
          }`}
          onClick={onSwap}
          disabled={
            srcLang === "auto"
          }
        >
          <ArrowLeftRight
            size={18}
            strokeWidth={1.8}
          />
        </button>

        <div className="selector-group">
          <LangSelector
            label="To"
            value={trgLang}
            onChange={setTrgLang}
          />
        </div>

      </div>

      <div className="translate-grid">

        <InputBox
          text={text}
          setText={setText}
          lang={srcLang}
          onSpeak={onSpeak}
          onVoice={onVoice}
          onImageUpload={
            onImageUpload
          }
        />

        <OutputBox
          result={result}
          lang={trgLang}
          onSpeak={onSpeak}
          onSave={onSave}
        />

      </div>
    </motion.div>
  );
}