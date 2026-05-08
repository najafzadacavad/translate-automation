import { Trash2 } from "lucide-react";

export default function SavedItem({ item, onDelete }) {
  return (
    <div className="saved-item">
      <div className="saved-content">
        <p className="orig-text">{item.text}</p>
        <p className="trans-text">{item.result}</p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(item.id)}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}