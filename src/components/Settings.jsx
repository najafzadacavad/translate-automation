import { Volume2, X } from "lucide-react";

export default function Settings({
  open,
  setOpen,
  voiceSpeed,
  setVoiceSpeed
}) {
  if (!open) return null;

  const speeds = [
    { label: "Normal", value: 1 },
    { label: "Slow", value: 0.7 },
    { label: "Slower", value: 0.5 }
  ];

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h3>Settings</h3>

          <button className="close-btn" onClick={() => setOpen(false)}>
            <X size={16} strokeWidth={2} />
            </button>
        </div>

        <div className="settings-section">
          <h4>Voice Speed</h4>

          {speeds.map((s) => (
            <button
              key={s.value}
              className={`speed-btn ${
                voiceSpeed === s.value ? "active" : ""
              }`}
              onClick={() => setVoiceSpeed(s.value)}
            >
              <Volume2 size={16} />
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}