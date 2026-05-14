import {
  Volume2,
  Bookmark,
  Copy
} from "lucide-react";

import ActionButton from "./ActionButton";

export default function OutputBox({
  result,
  lang,
  onSpeak,
  onSave
}) {
  const copyText = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="box output-box">
      <div className="result-area">
        {result || "Translation"}
      </div>

      <div className="bottom-info">
        <span className="letter-count">
        </span>

        <div className="actions">
          <ActionButton
            icon={Copy}
            onClick={copyText}
            title="Copy Translation"
          />

          <ActionButton
            icon={Volume2}
            onClick={() => onSpeak(result, lang)}
            title="Listen"
          />

          <ActionButton
            icon={Bookmark}
            onClick={onSave}
            title="Save to Word Base"
          />
        </div>
      </div>
    </div>
  );
}