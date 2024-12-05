import React, { useState } from 'react';
import classes from './DeleteButton.module.css';

interface DeleteButtonProps {
  idshops: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idshops, onDelete }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleDelete = async () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete your business?');
    if (!confirmDeletion) return;

    if (!idshops) {
      console.error('No shop ID provided');
      setMessage('No shop ID found. Cannot delete business.');
      setMessageType('error');
      return;
    }
    console.log(idshops);

    try {
      const response = await fetch(`http://localhost:8088/shops/${idshops}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Business deleted successfully');
        setMessage('Business deleted successfully.');
        setMessageType('success');
        onDelete(); // Call the callback function to update state
      } else {
        console.error('Failed to delete business');
        setMessage('Failed to delete your business. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      setMessage('An error occurred while deleting your business.');
      setMessageType('error');
    }
  };

  return (
    <div className={classes.container}>
      <button className={classes.deleteButton} onClick={handleDelete}>
        Delete Business
      </button>
      {message && (
        <div className={messageType === 'success' ? classes.successMessage : classes.errorMessage}>
          {message}
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
