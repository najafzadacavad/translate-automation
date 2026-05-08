export default function ActionButton({ icon: Icon, onClick, title }) {
  return (
    <button className="btn-icon" onClick={onClick} title={title}>
      <Icon size={18} />
    </button>
  );
}   