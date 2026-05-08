export default function Nav({ page, setPage }) {
  return (
    <nav className="nav-menu">
      <button className={`nav-btn ${page === "translate" ? "active" : ""}`} onClick={() => setPage("translate")}>Translate</button>
      <button className={`nav-btn ${page === "saved" ? "active" : ""}`} onClick={() => setPage("saved")}>Saved</button>
    </nav>
  );
}