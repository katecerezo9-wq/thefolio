import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]); // Start with empty array
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/posts');
      setPosts(data || []); // Ensure data is array
    } catch (err) {
      console.error('Error fetching posts:', err);
      setPosts([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;

  // Add safety check
  if (!posts || posts.length === 0) {
    return (
      <div className="feed-container">
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Latest Posts</h1>
            <p>Discover and share amazing content from the community</p>
          </div>
          {user && (
            <Link to="/create-post" className="create-post-btn-large">
              <span className="btn-icon">+</span>
              Create New Post
            </Link>
          )}
        </div>
        <div className="posts-section">
          <div className="empty-feed">
            <div className="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community!</p>
            {user && (
              <Link to="/create-post" className="create-post-btn">
                Create First Post
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Latest Posts</h1>
          <p>Discover and share amazing content from the community</p>
        </div>
        {user && (
          <Link to="/create-post" className="create-post-btn-large">
            <span className="btn-icon">+</span>
            Create New Post
          </Link>
        )}
      </div>

      <div className="posts-section">
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
                  {post.body?.length > 200 
                    ? post.body.substring(0, 200) + '...' 
                    : post.body}
                </p>
                <div className="post-card-footer">
                  <Link to={`/posts/${post._id}`} className="read-more-btn">
                    Read Full Post →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;