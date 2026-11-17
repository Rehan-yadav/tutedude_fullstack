import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="blog-container">

      <main className="main-content">

        <article className="blog-post">
          <img
            className="main-image"
            src="https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=1200"
            alt="Skateboarder"
          />

          <div className="post-content">
            <h1>TITLE HEADING</h1>

            <p className="post-meta">
              Title description, April 7, 2026
            </p>

            <p className="post-description">
              Welcome to our blog! Explore interesting stories,
              creative ideas and useful information. Discover
              new experiences and get inspired by the world
              around you.
            </p>

            <div className="post-footer">
              <button className="read-more">READ MORE »</button>
              <span>Comments 3</span>
            </div>
          </div>
        </article>

        <article className="blog-post">
          <img
            className="main-image"
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200"
            alt="Forest landscape"
          />

          <div className="post-content">
            <h1>TITLE HEADING</h1>

            <p className="post-meta">
              Title description, April 2, 2026
            </p>

            <p className="post-description">
              Nature is full of beautiful places and amazing
              experiences. Take a moment to explore the beauty
              of the environment and enjoy the peaceful
              surroundings.
            </p>

            <div className="post-footer">
              <button className="read-more">READ MORE »</button>
              <span>Comments 5</span>
            </div>
          </div>
        </article>

      </main>

      <aside className="sidebar">

        <section className="sidebar-card">
          <img
            className="profile-image"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500"
            alt="Profile"
          />

          <div className="sidebar-content">
            <h3>My Name</h3>

            <p>
              Just me, myself and I, exploring the universe
              of unknown. I have a heart of love and an
              interest in everything around me.
            </p>
          </div>
        </section>

        <section className="sidebar-card">
          <h3 className="sidebar-heading">Popular Posts</h3>

          <div className="popular-post">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200"
              alt="Lorem"
            />
            <div>
              <h4>Lorem</h4>
              <p>Sed mattis nunc</p>
            </div>
          </div>

          <div className="popular-post">
            <img
              src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=200"
              alt="Ipsum"
            />
            <div>
              <h4>Ipsum</h4>
              <p>Praes tinci sed</p>
            </div>
          </div>

          <div className="popular-post">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200"
              alt="Dorum"
            />
            <div>
              <h4>Dorum</h4>
              <p>Ultricies congue</p>
            </div>
          </div>

          <div className="popular-post">
            <img
              src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200"
              alt="Mingsum"
            />
            <div>
              <h4>Mingsum</h4>
              <p>Lorem ipsum dipsum</p>
            </div>
          </div>
        </section>

        <section className="sidebar-card">
          <h3 className="sidebar-heading">Tags</h3>

          <div className="tags">
            <span>Travel</span>
            <span>New York</span>
            <span>London</span>
            <span>IKEA</span>
            <span>Ideas</span>
            <span>Baby</span>
            <span>Family</span>
            <span>News</span>
            <span>Clothing</span>
            <span>Shopping</span>
          </div>
        </section>

        <div className="sidebar-card">
          <h3>Explore More</h3>
          <p>Discover more stories and articles.</p>
          <Link to="/dashboard" className="explore-link">
            Explore Dashboard →
          </Link>
        </div>

      </aside>

    </div>
  );
}

export default Home;
