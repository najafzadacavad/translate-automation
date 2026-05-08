import { Volume2, Bookmark } from "lucide-react";
import ActionButton from "./ActionButton";

export default function OutputBox({ result, lang, onSpeak, onSave }) {
  return (
    <div className="box output-box">
      <div className="result-area">{result || "Translation"}</div>
      <div className="actions">
        <ActionButton icon={Volume2} onClick={() => onSpeak(result, lang)} title="Listen" />
        <ActionButton icon={Bookmark} onClick={onSave} title="Save to Word Base" />
      </div>
    </div>
  );
}