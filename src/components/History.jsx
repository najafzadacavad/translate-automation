import { Clock3, Trash2 } from "lucide-react";

export default function History({ history, clearHistory }) {
  return (
    <div className="wordbase-container">
      <div className="history-top">
        <h2 className="section-title">
          Translation History
        </h2>

        {history.length > 0 && (
          <button className="clear-btn" onClick={clearHistory}>
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="empty-msg">No translation history.</p>
      ) : (
        history.map(item => (
          <div key={item.id} className="saved-item">
            <div className="saved-content">
              <p className="orig-text">{item.text}</p>

              <p className="trans-text">{item.result}</p>

              <small className="history-lang">
                {item.from} → {item.to}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}