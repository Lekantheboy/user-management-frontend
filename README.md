# User Management Frontend

React 18 frontend application for the User Management System using Redux Toolkit for state management.

## Features

- **Modern React**: Functional components with hooks
- **State Management**: Redux Toolkit with async thunks
- **API Integration**: Axios for HTTP requests
- **Responsive Design**: Mobile-first approach
- **Error Handling**: User-friendly error messages
- **Loading States**: Loading spinners and states
- **Form Validation**: Real-time validation with error messages

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Ensure Laravel backend is running on port 8000**

## Dependencies

- **React 18**: UI library
- **Redux Toolkit**: State management
- **React Redux**: React bindings
- **Axios**: HTTP client

## Project Structure

```
src/
├── components/          # React components
│   ├── UserList.js     # User list display
│   ├── UserCard.js     # Individual user card
│   ├── UserForm.js     # Add/Edit user form
│   ├── LoadingSpinner.js
│   └── ErrorMessage.js
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   └── slices/         # Redux slices
│       └── userSlice.js
├── services/           # API services
│   └── userApi.js      # User API calls
└── App.js             # Main application
```

## Components

### UserList
- Displays all users in a responsive grid
- Handles user deletion with confirmation
- Shows empty state when no users exist

### UserCard
- Individual user information display
- Edit and delete action buttons
- Role-based styling

### UserForm
- Modal form for adding/editing users
- Real-time validation
- Password confirmation for new users

### LoadingSpinner
- Reusable loading component
- Multiple sizes available

### ErrorMessage
- User-friendly error display
- Auto-dismissal functionality

## State Management

The application uses Redux Toolkit with the following structure:

- **users**: Array of all users
- **loading**: Loading state for async operations
- **error**: Error messages from API calls
- **currentUser**: Currently selected user for editing

## API Integration

All API calls are handled through Redux async thunks:

- `fetchUsers()`: Get all users
- `createUser(userData)`: Create new user
- `updateUser({id, userData})`: Update existing user
- `deleteUser(id)`: Delete user
- `fetchUser(id)`: Get single user

## Styling

- **CSS Modules**: Component-specific styling
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design
- **Accessibility**: Proper contrast and focus states

## Error Handling

- **API Errors**: Displayed with user-friendly messages
- **Validation Errors**: Field-specific error messages
- **Network Errors**: Graceful degradation
- **Auto-dismissal**: Errors clear after 5 seconds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)