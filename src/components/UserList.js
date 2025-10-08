import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/slices/userSlice';
import UserCard from './UserCard';
import './UserList.css';

const UserList = ({ users, onEditUser }) => {
  const dispatch = useDispatch();


  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <p>Click "Add New User" to create your first user.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
      </div>
      
      <div className="user-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => onEditUser(user)}
            onDelete={() => handleDeleteUser(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
