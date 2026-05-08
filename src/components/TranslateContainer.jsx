import { motion } from "framer-motion";
import LangSelector from "./LangSelector";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

export default function TranslateContainer({ 
  srcLang, setSrcLang, trgLang, setTrgLang, 
  text, setText, result, onSpeak, onSave 
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="translate-wrapper">
      <div className="selectors-row">
        <LangSelector label="From" value={srcLang} onChange={setSrcLang} />
        <LangSelector label="To" value={trgLang} onChange={setTrgLang} />
      </div>
      <div className="translate-grid">
        <InputBox text={text} setText={setText} lang={srcLang} onSpeak={onSpeak} />
        <OutputBox result={result} lang={trgLang} onSpeak={onSpeak} onSave={onSave} />
      </div>
    </motion.div>
  );
}