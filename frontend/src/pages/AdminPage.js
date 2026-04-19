import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const AdminPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/admin/posts');
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/status`);
      setUsers(users.map(u => u._id === id ? data.user : u));
    } catch (err) {
      alert('Failed to update user status');
    }
  };

  const removePost = async (id) => {
    if (window.confirm('Are you sure you want to remove this post?')) {
      try {
        await API.put(`/admin/posts/${id}/remove`);
        setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
      } catch (err) {
        alert('Failed to remove post');
      }
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name}!</p>

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'active' : ''}
        >
          Members ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={activeTab === 'posts' ? 'active' : ''}
        >
          Posts ({posts.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`status-badge ${u.status}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  {u.status === 'active' ? (
                    <button 
                      className="btn-deactivate" 
                      onClick={() => toggleStatus(u._id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button 
                      className="btn-activate" 
                      onClick={() => toggleStatus(u._id)}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'posts' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name || 'Unknown'}</td>
                <td>
                  <span className={`status-badge ${p.status}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status === 'published' && (
                    <button 
                      className="btn-remove" 
                      onClick={() => removePost(p._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;