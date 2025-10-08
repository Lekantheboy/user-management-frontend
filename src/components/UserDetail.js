import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, clearCurrentUser } from '../store/slices/userSlice';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }

    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (error) {
    return (
      <div className="user-detail-container">
        <ErrorMessage message={error} />
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Back to Users
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="user-detail-container">
        <div className="empty-state">
          <h3>User not found</h3>
          <p>The user you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'badge-admin';
      case 'manager':
        return 'badge-manager';
      default:
        return 'badge-user';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Back to Users
        </button>
        <h1>User Details</h1>
      </div>

      <div className="user-detail-card">
        <div className="user-detail-avatar">
          <div className="avatar-circle">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="user-detail-info">
          <div className="user-detail-name">
            <h2>{currentUser.name}</h2>
            <span className={`role-badge ${getRoleBadgeClass(currentUser.role)}`}>
              {currentUser.role}
            </span>
          </div>

          <div className="user-detail-details">
            <div className="detail-group">
              <h3>Contact Information</h3>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{currentUser.email}</span>
              </div>
            </div>

            <div className="detail-group">
              <h3>Account Information</h3>
              <div className="detail-item">
                <span className="label">User ID:</span>
                <span className="value">#{currentUser.id}</span>
              </div>
              <div className="detail-item">
                <span className="label">Role:</span>
                <span className="value">{currentUser.role}</span>
              </div>
              <div className="detail-item">
                <span className="label">Member Since:</span>
                <span className="value">{formatDate(currentUser.created_at)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Last Updated:</span>
                <span className="value">{formatDate(currentUser.updated_at)}</span>
              </div>
            </div>
          </div>

          <div className="user-detail-actions">
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
