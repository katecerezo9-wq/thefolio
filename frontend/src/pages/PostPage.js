import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshComments, setRefreshComments] = useState(false);

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);
    } catch (err) {
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${id}`);
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refreshComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }

    try {
      await API.post(`/comments/${id}`, { body: newComment });
      setNewComment('');
      setRefreshComments(prev => !prev);
      alert('Comment posted successfully!');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert(err.response?.data?.message || 'Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await API.delete(`/comments/${commentId}`);
      setRefreshComments(prev => !prev);
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await API.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (loading) return (
    <div className="post-loading">
      <div className="loading-spinner"></div>
      <p>Loading post...</p>
    </div>
  );
  
  if (error) return (
    <div className="post-error-container">
      <div className="post-error-icon">😕</div>
      <h2>{error}</h2>
      <p>The post you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="back-home-btn">Go Back Home</Link>
    </div>
  );
  
  if (!post) return (
    <div className="post-error-container">
      <div className="post-error-icon">📭</div>
      <h2>Post not found</h2>
      <Link to="/" className="back-home-btn">Go Back Home</Link>
    </div>
  );

  const isAuthor = user?._id === post.author?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="post-page-enhanced">
      {/* Back Button */}
      <div className="post-back-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>

      {/* Post Article */}
      <article className="post-article">
        {post.image && (
          <div className="post-cover-image">
            <img 
              src={`http://localhost:5000/uploads/${post.image}`} 
              alt={post.title}
            />
          </div>
        )}
        
        <div className="post-article-header">
          <h1>{post.title}</h1>
          
          <div className="post-article-meta">
            <div className="post-author-details">
              <div className="post-author-avatar">
                {post.author?.profilePic ? (
                  <img src={`http://localhost:5000/uploads/${post.author.profilePic}`} alt={post.author.name} />
                ) : (
                  <div className="post-avatar-placeholder">
                    {post.author?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="post-author-info">
                <span className="post-author-name">{post.author?.name || 'Unknown'}</span>
                <span className="post-publish-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            {(isAuthor || isAdmin) && (
              <div className="post-action-buttons">
                <button onClick={handleDeletePost} className="post-delete-btn">
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="post-article-content">
          {post.body.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
      </article>

      {/* Comments Section */}
      <section className="post-comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
          <span className="comments-count">{comments.length}</span>
        </div>

        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form-enhanced">
            <div className="comment-form-wrapper">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                rows="3"
                required
              />
              <button type="submit" className="comment-submit-btn">
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="comment-login-prompt">
            <p>
              <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to join the discussion
            </p>
          </div>
        )}

        <div className="comments-list-enhanced">
          {comments.length === 0 ? (
            <div className="no-comments-enhanced">
              <div className="no-comments-icon">💬</div>
              <h3>No comments yet</h3>
              <p>Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="comment-item">
                <div className="comment-item-header">
                  <div className="comment-user">
                    <div className="comment-user-avatar">
                      {comment.author?.profilePic ? (
                        <img src={`http://localhost:5000/uploads/${comment.author.profilePic}`} alt={comment.author.name} />
                      ) : (
                        <div className="comment-avatar-placeholder">
                          {comment.author?.name?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="comment-user-info">
                      <span className="comment-user-name">{comment.author?.name || 'Unknown'}</span>
                      <span className="comment-time">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  {(user?._id === comment.author?._id || isAdmin) && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="comment-delete-btn"
                      title="Delete comment"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="comment-item-content">
                  <p>{comment.body}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PostPage;