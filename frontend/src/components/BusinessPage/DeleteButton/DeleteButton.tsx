import React, { useState } from "react";
import classes from "./DeleteButton.module.css";
import { deleteShop, deleteShopImages } from "../../../utils/api";

interface DeleteButtonProps {
  idshops: number;
  iduser: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idshops, onDelete, iduser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  // Function to handle the actual deletion process
  const handleDelete = async () => {
    if (!idshops) {
      console.error("No shop ID provided");
      setMessage("No shop ID found. Cannot delete business.");
      setMessageType("error");
      return;
    }

    try {
      const response = await deleteShop(idshops);
      const deleteResp = await deleteShopImages(iduser);
      if (response.status === 200) {
        // Handle success
        setMessageType("success");
        onDelete();
      } else {
        // Handle errors
        setMessage(response.data?.error || "An unexpected error occurred.");
        setMessageType("error");
      }
    } catch (error) {
      // Network issues or unexpected errors
      console.error("Error deleting business:", error);
      setMessage("An error occurred while deleting your business. Please try again later.");
      setMessageType("error");
    }
    setIsModalOpen(false); // Close the modal after deletion attempt
  };

  // Open the modal when user clicks the Delete button
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal without deleting
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <button className={classes.deleteButton} onClick={openModal}>
        Delete Business
      </button>

      {/* Modal Confirmation Dialog */}
      {isModalOpen && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h3>Are you sure you want to delete your business?</h3>
            <div className={classes.modalActions}>
              <button className={classes.confirmButton} onClick={handleDelete}>
                Confirm
              </button>
              <button className={classes.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
