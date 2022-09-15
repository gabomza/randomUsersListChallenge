import { IUpdatedUSer, IUser } from "../../model/user";

import Modal from "../modal/Modal";

import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ICardProps {
  user: IUser;
  updateUser: (updatedUser: IUpdatedUSer) => void;
}

const Card = (props: ICardProps) => {
  const { user, updateUser } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [showFormError, setShowFormError] = useState<boolean>(false);
  const [showFormErrorMessage, setShowFormErrorMessage] = useState<string>("");

  const [firstName, setFirstName] = useState<string>(user.name.first);
  const [lastName, setLastName] = useState<string>(user.name.last);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone);
  const [city, setCity] = useState<string>(user.location.city);
  const [state, setState] = useState<string>(user.location.state);

  const saveData = () => {
    if (!firstName || !lastName || !email || !phone || !city || !state) {
      setShowFormError(true);
      setShowFormErrorMessage("Complete all mandatory fields");
      return;
    }
    setEditMode(false);
    const updatedUser: IUpdatedUSer = {
      id: user.login.uuid,
      firstName,
      lastName,
      email,
      phone,
      city,
      state
    };
    updateUser(updatedUser);
  };

  const toggleEditMode = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const fieldId = e.target.id;
    switch (fieldId) {
      case "user.name.first": {
        setFirstName(value);
        break;
      }
      case "user.name.last": {
        setLastName(value);
        break;
      }
      case "user.email": {
        setEmail(value);
        break;
      }
      case "user.phone": {
        setPhone(value);
        break;
      }
      case "user.location.city": {
        setCity(value);
        break;
      }
      case "user.location.state": {
        setState(value);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardEditButton}>
            <FontAwesomeIcon icon={faUserEdit} onClick={toggleEditMode} />
          </div>
          <div>
            <div
              className={`${styles.cardName} ${styles.ellipsis}`}
              title={`${user.name.first} ${user.name.last}`}
            >
              {user.name.first} {user.name.last}
            </div>
          </div>
        </div>
        <div className={styles.cardPicture}>
          <img alt="avatar" src={user.picture.large} />
        </div>
        <div className={styles.cardBody}>
          <div
            className={`${styles.cardEmail} ${styles.ellipsis}`}
            title={`${user.email}`}
          >
            {user.email}
          </div>
          <div>{user.phone}</div>
          <div>
            {user.location.city}, {user.location.state}
          </div>
        </div>
      </div>
      {editMode && (
        <Modal visible={editMode} closeModal={() => setEditMode(false)}>
          <div className={styles.cardForm}>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                id="user.name.first"
                name="user.name.first"
                maxLength={50}
                value={firstName}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                id="user.name.last"
                name="user.name.last"
                maxLength={50}
                value={lastName}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label>E-mail:</label>
              <input
                type="text"
                id="user.email"
                name="user.email"
                maxLength={100}
                value={email}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                id="user.phone"
                name="user.phone"
                maxLength={16}
                value={phone}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                id="user.location.city"
                name="user.location.city"
                maxLength={50}
                value={city}
                onChange={handleFieldChange}
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                id="user.location.state"
                name="user.location.state"
                maxLength={50}
                value={state}
                onChange={handleFieldChange}
              />
            </div>
            <button onClick={saveData}>Save</button>
            {showFormError && (
              <div className={styles.errorMessage}>{showFormErrorMessage}</div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Card;
