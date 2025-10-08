import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  const navigate = useNavigate();

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
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons or links
    if (e.target.closest('.user-actions') || e.target.closest('.user-name-link')) {
      return;
    }
    // Navigate to user detail page
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="user-card clickable" onClick={handleCardClick}>
      <div className="user-card-header">
        <div className="user-info">
          <Link to={`/users/${user.id}`} className="user-name-link">
            <h3 className="user-name">{user.name}</h3>
          </Link>
          <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
            {user.role}
          </span>
        </div>
        <div className="user-actions">
          <button 
            className="btn btn-sm btn-edit"
            onClick={onEdit}
            title="Edit user"
          >
            ✏️
          </button>
          <button 
            className="btn btn-sm btn-delete"
            onClick={onDelete}
            title="Delete user"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="user-card-body">
        <div className="user-detail">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        
        <div className="user-detail">
          <span className="label">Created:</span>
          <span className="value">{formatDate(user.created_at)}</span>
        </div>
        
        <div className="user-detail">
          <span className="label">Updated:</span>
          <span className="value">{formatDate(user.updated_at)}</span>
        </div>
      </div>
      
      <div className="user-card-footer">
        <span className="click-hint">Click to view details →</span>
      </div>
    </div>
  );
};

export default UserCard;
