import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser, clearError, clearCurrentUser } from '../store/slices/userSlice';
import { validateUserForm, getInitialFormData } from '../utils/formValidation';
import UserFormFields from './shared/UserFormFields';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './UserEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);
  
  const [formData, setFormData] = useState(getInitialFormData());
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }

    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setFormData(getInitialFormData(currentUser));
    }
  }, [currentUser]);

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
    const errors = validateUserForm(formData, true);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      await dispatch(updateUser({ id, userData })).unwrap();
      navigate(`/users/${id}`);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/users/${id}`);
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] || null;
  };

  if (loading && !currentUser) {
    return <LoadingSpinner message="Loading user data..." />;
  }

  if (error && !currentUser) {
    return (
      <div className="user-edit-container">
        <ErrorMessage message={error} />
        <button className="btn btn-secondary" onClick={handleCancel}>
          ← Back to User Details
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="user-edit-container">
        <div className="empty-state">
          <h3>User not found</h3>
          <p>The user you're trying to edit doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            ← Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-edit-container">
      <div className="user-edit-header">
        <button className="btn btn-secondary" onClick={handleCancel}>
          ← Back to User Details
        </button>
        <h1>Edit User</h1>
      </div>

      <div className="user-edit-card">
        <div className="user-edit-avatar">
          <div className="avatar-circle">
            {formData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="user-edit-form">
          <UserFormFields
            formData={formData}
            handleChange={handleChange}
            getFieldError={getFieldError}
            isSubmitting={isSubmitting}
            isEditing={true}
          />

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="small" /> : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
