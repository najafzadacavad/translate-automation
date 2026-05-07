export default function Result({ title, result }) {
  return (
    <div className="card">
      <p className="info">{title}</p>
      <div className="result-box">{result}</div>
    </div>
  );
}