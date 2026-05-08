import { motion } from "framer-motion";
import SavedItem from "./SavedItem";

export default function WordBase({ saved, onDelete }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="wordbase-container">
      <h2 className="section-title">Word Base ({saved.length})</h2>
      {saved.length === 0 ? (
        <p className="empty-msg">No saved translations yet.</p>
      ) : (
        saved.map(item => <SavedItem key={item.id} item={item} onDelete={onDelete} />)
      )}
    </motion.div>
  );
}