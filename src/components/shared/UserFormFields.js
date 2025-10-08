import React from 'react';

const UserFormFields = ({ 
  formData, 
  handleChange, 
  getFieldError, 
  isSubmitting, 
  isEditing = false 
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={getFieldError('name') ? 'error' : ''}
          disabled={isSubmitting}
        />
        {getFieldError('name') && (
          <span className="error-message">{getFieldError('name')}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={getFieldError('email') ? 'error' : ''}
          disabled={isSubmitting}
        />
        {getFieldError('email') && (
          <span className="error-message">{getFieldError('email')}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role *</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password {isEditing ? '(leave blank to keep current)' : '*'}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={getFieldError('password') ? 'error' : ''}
          disabled={isSubmitting}
          placeholder={isEditing ? 'Enter new password' : 'Enter password'}
        />
        {getFieldError('password') && (
          <span className="error-message">{getFieldError('password')}</span>
        )}
      </div>

      {formData.password && (
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={getFieldError('confirmPassword') ? 'error' : ''}
            disabled={isSubmitting}
            placeholder="Confirm password"
          />
          {getFieldError('confirmPassword') && (
            <span className="error-message">{getFieldError('confirmPassword')}</span>
          )}
        </div>
      )}
    </>
  );
};

export default UserFormFields;
