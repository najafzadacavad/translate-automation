export default function LangSelector({ value, onChange, label }) {
  const languages = [
    { code: "en", name: "English" },
    { code: "tr", name: "Turkish" },
    { code: "az", name: "Azerbaijani" },
    { code: "ru", name: "Russian" },
    { code: "de", name: "German" },
    { code: "fr", name: "French" }
  ];

  return (
    <div className="lang-selector">
      <span className="lang-label">{label}:</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
    </div>
  );
}