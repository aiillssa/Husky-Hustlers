import React, { useState } from "react";
import classes from "./EditButton.module.css";

interface EditButtonProps {
  idshops: number;
  description: string;
  contactInfo: Map<string, string>;
  onEdit: (updatedDescription: string, updatedContactInfo: Map<string, string>) => void;
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
      const response = await fetch(`http://localhost:8088/shops/${idshops}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopDescription: updatedDescription,
          contactInformation: contactInfoObj,
        }),
      });

      if (response.ok) {
        setMessage("Business information updated successfully.");
        setMessageType("success");
        setIsEditing(false);
        onEdit(updatedDescription, updatedContactInfo); // Call the parent callback
      } else {
        setMessage("Failed to update business information. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error updating business:", error);
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
      {isEditing ? (
        <div className={classes.editForm}>
          <div className={classes.field}>
            <label>Description:</label>
            <textarea
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
                  value={key}
                  readOnly
                />
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
