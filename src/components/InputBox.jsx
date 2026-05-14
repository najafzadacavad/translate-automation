import {
  Volume2,
  Mic,
  ImagePlus
} from "lucide-react";

import ActionButton from "./ActionButton";

export default function InputBox({
  text,
  setText,
  lang,
  onSpeak,
  onVoice,
  onImageUpload
}) {
  return (
    <div className="box">
      <textarea
        placeholder="Type to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="bottom-info">
        <span className="letter-count">
          {text.length} characters
        </span>

        <div className="actions">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            hidden
            onChange={onImageUpload}
          />

          <button
            className="btn-icon"
            onClick={() =>
              document
                .getElementById("image-upload")
                .click()
            }
            title="Translate From Image"
          >
            <ImagePlus size={18} />
          </button>

          <ActionButton
            icon={Mic}
            onClick={onVoice}
            title="Voice Input"
          />

          <ActionButton
            icon={Volume2}
            onClick={() => onSpeak(text, lang)}
            title="Listen"
          />
        </div>
      </div>
    </div>
  );
}