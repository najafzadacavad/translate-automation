export default function Header({ title }) {
  return (
    <header className="header">
      <img
        src="https://www.martindale-avvo.com/wp-content/uploads/2019/08/iStock-1088905934.jpg"
        className="logo"
      />
      <h2>{title}</h2>
    </header>
  );
}