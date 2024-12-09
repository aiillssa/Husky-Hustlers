import React, { useState } from "react";
import classes from "./EditButton.module.css";
import { updateShop } from "../../../utils/api";

interface EditButtonProps {
  idshops: number;
  description: string;
  contactInfo: Map<string, string>;
  onEdit: (updatedDescription: string, updatedContactInfo: Map<string, string>) => void;
  onSave: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ idshops, description, contactInfo, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedContactInfo, setUpdatedContactInfo] = useState(new Map(contactInfo));
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleSave = async () => {
    try {
      const contactInfoObj = Object.fromEntries(updatedContactInfo);
      const response = updateShop(updatedDescription, updatedContactInfo, idshops);
      
      // After saving, close the editing form
      setUpdatedDescription(updatedDescription);
      setUpdatedContactInfo(updatedContactInfo);

      onEdit(updatedDescription, updatedContactInfo);

      // Exit the editing mode
      setIsEditing(false);
    } catch (error) {
      setMessage("An error occurred while updating your business.");
      setMessageType("error");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedDescription(description);
    setUpdatedContactInfo(new Map(contactInfo));
  };

  return (
    <div className={classes.container}>
      {isEditing && <div className={classes.overlay}></div>} {/* Dark overlay when editing */}
      {isEditing ? (
        <div className={classes.editForm}>
          <div className={classes.field}>
            <label>Description:</label>
            <input
              className={classes.input}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
          <div className={classes.field}>
            <label>Contact Information:</label>
            {Array.from(updatedContactInfo.entries()).map(([key, value]) => (
              <div key={key} className={classes.contactField}>
                <input
                  className={classes.input}
                  value={value}
                  onChange={(e) =>
                    setUpdatedContactInfo(
                      new Map(updatedContactInfo.set(key, e.target.value))
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div className={classes.actions}>
            <button className={classes.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={classes.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className={classes.editButton}
          onClick={() => setIsEditing(true)}
        >
          Edit Business
        </button>
      )}
      {message && (
        <div className={messageType === "success" ? classes.successMessage : classes.errorMessage}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EditButton;
