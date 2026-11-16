import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const { data, loading, error } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=20"
  );

  if (loading) {
    return <h2 className="message">Loading photos...</h2>;
  }

  if (error) {
    return <h2 className="message">Error: {error}</h2>;
  }

  return (
    <div className="app">
      <h1>Photos</h1>

      <div className="photo-container">
        {data.map((photo) => (
          <div className="photo-card" key={photo.id}>
            <img src={photo.download_url} alt={photo.author} />
            <p>{photo.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
