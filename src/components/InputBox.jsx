import { Volume2 } from "lucide-react";
import ActionButton from "./ActionButton";

export default function InputBox({ text, setText, lang, onSpeak }) {
  return (
    <div className="box">
      <textarea 
        placeholder="Type to translate..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <div className="actions">
        <ActionButton icon={Volume2} onClick={() => onSpeak(text, lang)} title="Listen" />
      </div>
    </div>
  );
}