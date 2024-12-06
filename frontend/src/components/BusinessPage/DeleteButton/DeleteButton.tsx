import React, { useState } from "react";
import classes from "./DeleteButton.module.css";
import { deleteShop } from "../../../utils/api";
interface DeleteButtonProps {
  idshops: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idshops, onDelete }) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete your business?"
    );
    if (!confirmDeletion) return;

    if (!idshops) {
      console.error("No shop ID provided");
      setMessage("No shop ID found. Cannot delete business.");
      setMessageType("error");
      return;
    }
    console.log(idshops);

    try {
      const response = await deleteShop(idshops);
      if (response.status === 200) {
        // handle success
        setMessageType("success");
        onDelete();
      } else {
        // handle errors
        console.log(response.status);
        setMessage(response.data?.error || "An unexpected error occurred.");
        setMessageType("error");
      }
    } catch (error) {
      // network issues or unexpected errors
      console.error('Error deleting business:', error);
      setMessage('An error occurred while deleting your business. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <div className={classes.container}>
      <button className={classes.deleteButton} onClick={handleDelete}>
        Delete Business
      </button>
      {message && (
        <div
          className={
            messageType === "success"
              ? classes.successMessage
              : classes.errorMessage
          }
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
