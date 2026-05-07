export default function Menu({ setPage }) {
  return (
    <div className="menu">
      <button onClick={() => setPage("translate")}>
        Translate
      </button>

      <button onClick={() => setPage("wordbase")}>
        Word Base
      </button>
    </div>
  );
}