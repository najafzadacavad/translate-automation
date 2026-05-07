export default function Card({ title, value, onChange }) {
  return (
    <div className="card">
      <p className="info">{title}</p>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Type text..."
      />
    </div>
  );
}