import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('🔍 Fetching posts...');
      const { data } = await API.get('/posts');
      console.log('✅ Posts received:', data);
      setPosts(data || []);
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      console.log('Error details:', err.response?.data);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO SECTION - PORTFOLIO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-up" style={{animationDelay: '0.2s'}}>Hi, I'm Kate Ann Cerezo</h1>
          <h2 className="animate-up" style={{animationDelay: '0.4s'}}>Student & MLBB Gamer</h2>
          <p className="animate-up" style={{animationDelay: '0.6s'}}>
            Welcome to my personal portfolio. I am a dedicated student-athlete representing DMMMSU-SLUC, 
            successfully balancing my academic responsibilities with my burning passion for esports and competitive gaming.
          </p>
          
          <ul className="my-stats animate-up" style={{animationDelay: '0.8s'}}>
            <li>Rank: Mythical Immortal</li>
            <li>Role: Multirole (Gold Lane Main)</li>
            <li>Achievement: Campus Sports Olympic Champion</li>
          </ul>

          <Link to="/register">
            <button id="play-btn" className="animate-up" style={{animationDelay: '1s'}}>Let's Play!</button>
          </Link>
        </div>
        
        <div className="hero-img animate-up" style={{animationDelay: '1.2s'}}>
          <img src="/assets/profile.jpg" alt="Portrait of Kate Ann Cerezo" />
        </div>
      </section>

      {/* ABOUT MY GAMEPLAY SECTION */}
      <section className="section-box">
        <h3>About My Gameplay</h3>
        <p>Get to know my playstyle, main heroes, and strategies.</p>
        <div className="columns">
          <div className="box">
            <h4>Marksman Main</h4>
            <p>I specialize in using <strong>Wanwan</strong> and other agile gold laners to outplay opponents and carry the team to victory.</p>
            <Link to="/about" className="preview-link">Read My Story &rarr;</Link>
          </div>
          <div className="box">
            <h4>Team Player</h4>
            <p>From DMMMSU-SLUC to the Smart League, I play to win championships through coordination and discipline.</p>
            <Link to="/about" className="preview-link">View Achievements &rarr;</Link>
          </div>
        </div>
      </section>

      {/* LATEST POSTS SECTION */}
      <section className="section-box gray-bg">
        <h3>Latest from the Community</h3>
        <p>Check out what other gamers are sharing</p>
        
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : !posts || posts.length === 0 ? (
          <div className="empty-posts">
            <p>No posts yet. Be the first to share!</p>
            {user && (
              <Link to="/create-post" className="create-post-btn">
                Create Post
              </Link>
            )}
          </div>
        ) : (
          <div className="posts-grid">
            {posts.slice(0, 3).map((post) => (
              <div key={post._id} className="post-card-mini">
                {post.image && (
                  <img 
                    src={`http://localhost:5000/uploads/${post.image}`} 
                    alt={post.title}
                    className="post-mini-image"
                  />
                )}
                <div className="post-mini-content">
                  <h4>{post.title}</h4>
                  <p className="post-mini-meta">
                    By {post.author?.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="post-mini-excerpt">
                    {post.body && post.body.length > 100 ? post.body.substring(0, 100) + '...' : (post.body || '')}
                  </p>
                  <Link to={`/posts/${post._id}`} className="read-more-link">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {posts && posts.length > 3 && (
          <div className="view-all">
            <Link to="/feed" className="view-all-btn">View All Posts →</Link>
          </div>
        )}
      </section>

      {/* JOIN COMMUNITY SECTION */}
      <section className="section-box">
        <h3>Join the Community</h3>
        <p>Interested in playing together, scrims, or getting updates?</p>
        <div className="columns">
          <div className="box">
            <h4>Duo / Squad</h4>
            <p>Looking for teammates? Sign up now to join our community and let's rank up together.</p>
            <Link to="/register" className="preview-link">Register Now &rarr;</Link>
          </div>
          <div className="box">
            <h4>Contact Me</h4>
            <p>Have questions, collaboration offers, or just want to say hi? Send me a message directly.</p>
            <Link to="/contact" className="preview-link">Get in Touch &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;