import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, clearError } from '../store/slices/userSlice';
import { validateUserForm, getInitialFormData } from '../utils/formValidation';
import UserFormFields from './shared/UserFormFields';
import LoadingSpinner from './LoadingSpinner';
import './UserForm.css';

const UserForm = ({ user, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  
  const [formData, setFormData] = useState(getInitialFormData(user));
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setFormData(getInitialFormData(user));
  }, [user]);

  useEffect(() => {
    if (error) {
      if (typeof error === 'object' && !Array.isArray(error)) {
        setValidationErrors(error);
      }
      const timer = setTimeout(() => {
        dispatch(clearError());
        setValidationErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = validateUserForm(formData, !!user);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      if (user) {
        await dispatch(updateUser({ id: user.id, userData })).unwrap();
      } else {
        await dispatch(createUser(userData)).unwrap();
      }
      
      onSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] || null;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'Edit User' : 'Add New User'}</h2>
          <button 
            className="btn btn-close"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <UserFormFields
            formData={formData}
            handleChange={handleChange}
            getFieldError={getFieldError}
            isSubmitting={loading}
            isEditing={!!user}
          />

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : (user ? 'Update User' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
