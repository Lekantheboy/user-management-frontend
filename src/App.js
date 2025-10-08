import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, clearError } from './store/slices/userSlice';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import UserEdit from './components/UserEdit';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function HomePage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showForm, setShowForm] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingUser(null);
    dispatch(fetchUsers());
  };

  return (
    <>
      <header className="app-header">
        <h1>User Management System</h1>
        <button 
          className="btn btn-primary"
          onClick={handleAddUser}
        >
          Add New User
        </button>
      </header>

      <main className="app-main">
        {error && <ErrorMessage message={error} />}
        
        {loading && <LoadingSpinner />}
        
        {!loading && (
          <UserList 
            users={users}
            onEditUser={handleEditUser}
          />
        )}

        {showForm && (
          <UserForm
            user={editingUser}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
