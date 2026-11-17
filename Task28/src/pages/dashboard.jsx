import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your blog dashboard.</p>
        </div>

        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Posts</h3>
          <h1>24</h1>
          <p>Articles published</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Views</h3>
          <h1>1,250</h1>
          <p>People visited your blog</p>
        </div>

        <div className="dashboard-card">
          <h3>Comments</h3>
          <h1>86</h1>
          <p>Total comments received</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Posts</h2>

        <div className="recent-post">
          <img
            src="https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=200"
            alt="Skateboard"
          />
          <div>
            <h3>Title Heading</h3>
            <p>Published on April 7, 2026</p>
          </div>
        </div>

        <div className="recent-post">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=200"
            alt="Forest"
          />
          <div>
            <h3>Nature and Travel</h3>
            <p>Published on April 2, 2026</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
