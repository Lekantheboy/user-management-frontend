// Shared form validation logic
export const validateUserForm = (formData, isEditing = false) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!isEditing && !formData.password) {
    errors.password = 'Password is required';
  }

  if (formData.password && formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const getInitialFormData = (user = null) => ({
  name: user?.name || '',
  email: user?.email || '',
  role: user?.role || 'user',
  password: '',
  confirmPassword: '',
});
