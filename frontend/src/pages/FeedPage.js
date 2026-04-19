import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/posts');
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="feed-loading">
      <div className="loading-spinner"></div>
      <p>Loading awesome posts...</p>
    </div>
  );

  return (
    <div className="feed-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Check out what the community has been posting</p>
        </div>
        <Link to="/create-post" className="create-post-btn-large">
          <span className="btn-icon">+</span>
          Create New Post
        </Link>
      </div>

      {/* Stats Section */}
      <div className="feed-stats">
        <div className="stat-item">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-value">{posts.length}</span>
            <span className="stat-label">Total Posts</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <span className="stat-value">{new Set(posts.map(p => p.author?._id)).size}</span>
            <span className="stat-label">Active Members</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💬</span>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-label">Comments</span>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <div className="section-header">
          <h2>Latest from the Community</h2>
          <div className="view-options">
            <button className="view-btn active">📱 Latest</button>
            <button className="view-btn">🔥 Trending</button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="empty-feed">
            <div className="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community!</p>
            <Link to="/create-post" className="create-post-btn">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="posts-grid-enhanced">
            {posts.map((post, index) => (
              <div key={post._id} className={`post-card-enhanced ${index === 0 ? 'featured' : ''}`}>
                {post.image && (
                  <div className="post-card-image-wrapper">
                    <img 
                      src={`http://localhost:5000/uploads/${post.image}`} 
                      alt={post.title}
                      className="post-card-image"
                    />
                    {index === 0 && <span className="featured-badge">✨ Featured</span>}
                  </div>
                )}
                <div className="post-card-content">
                  <div className="post-card-header">
                    <h3>{post.title}</h3>
                    <div className="post-author-info">
                      <div className="author-avatar">
                        {post.author?.profilePic ? (
                          <img src={`http://localhost:5000/uploads/${post.author.profilePic}`} alt={post.author.name} />
                        ) : (
                          <div className="avatar-placeholder-small">
                            {post.author?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="author-details">
                        <span className="author-name">{post.author?.name || 'Unknown'}</span>
                        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="post-excerpt">
                    {post.body.length > 200 
                      ? post.body.substring(0, 200) + '...' 
                      : post.body}
                  </p>
                  <div className="post-card-footer">
                    <Link to={`/posts/${post._id}`} className="read-more-btn">
                      Read Full Post →
                    </Link>
                    <div className="post-stats">
                      <span className="stat">💬 0</span>
                      <span className="stat">❤️ 0</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;