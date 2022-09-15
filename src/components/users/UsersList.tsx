import { useEffect, useState } from "react";

import { getUsers } from "../../api/users";

import { IUpdatedUSer, IUser } from "../../model/user";

import Card from "./Card";
import UsersFilter from "../filter/UsersFilter";

import styles from "./UsersList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { SORT_ORDER_ASC, SORT_ORDER_DESC } from "../../config/variables";
import Modal from "../modal/Modal";

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // In the future this would be an object with all the fields keys and their corresponding order
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDER_ASC);

  // Used for any generic error
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  /* Filters and sorting */

  // Used for the only sorting field, but this could be used to sort the grid using any other field as reference.
  const toggleSortOrder = () => {
    if (sortOrder === SORT_ORDER_ASC) {
      setSortOrder(SORT_ORDER_DESC);
    } else {
      setSortOrder(SORT_ORDER_ASC);
    }
  };

  // Currently we're using only last name as sort criteria, this should be moved to a more complex data structure and logic
  const sortUsers = (users: IUser[]) => {
    const usersToSort = [...users];
    return usersToSort.sort((a, b) => {
      const aLastName = a.name.last.toLowerCase();
      const bLastName = b.name.last.toLowerCase();
      if (sortOrder === SORT_ORDER_ASC) {
        return aLastName < bLastName ? -1 : aLastName > bLastName ? 1 : 0;
      } else {
        return bLastName < aLastName ? -1 : bLastName > aLastName ? 1 : 0;
      }
    });
  };

  // If other field could be use for the filter, this logic can be changed to improve its readability and maintainability
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value.toLowerCase();
    if (typedValue) {
      let usersToFilter = [...filteredUsers];
      usersToFilter = usersToFilter.filter((user) => {
        return (
          user.name.first.toLowerCase().includes(typedValue) ||
          user.name.last.toLowerCase().includes(typedValue) ||
          user.email.toLowerCase().includes(typedValue) ||
          user.phone.toLowerCase().includes(typedValue) ||
          user.location.city.toLowerCase().includes(typedValue) ||
          user.location.state.toLowerCase().includes(typedValue)
        );
      });
      setFilteredUsers(usersToFilter);
    } else {
      setFilteredUsers(sortUsers(users));
    }
  };

  /* Data updating */

  // If we'll allow to update more fields, this should be updated to a better logic
  const updateUser = (updatedUserData: IUpdatedUSer) => {
    const userToUpdate = users.find(
      (user) => user.login.uuid === updatedUserData.id
    );
    if (!userToUpdate) {
      setErrorMessage("User not found");
      setShowModal(true);
      return;
    }
    userToUpdate.name.first = updatedUserData.firstName;
    userToUpdate.name.last = updatedUserData.lastName;
    userToUpdate.email = updatedUserData.email;
    userToUpdate.phone = updatedUserData.phone;
    userToUpdate.location.city = updatedUserData.city;
    userToUpdate.location.state = updatedUserData.state;
  };

  /* Initial data */

  const loadUsers = async () => {
    setLoading(true);
    let usersFromApi = await getUsers();
    usersFromApi = sortUsers(usersFromApi);
    setUsers(usersFromApi);
    setFilteredUsers(usersFromApi);
    setLoading(false);
  };

  /* Effects */

  useEffect(() => {
    if (loading) {
      loadUsers();
    }
  }, [loading]);

  useEffect(() => {
    if (filteredUsers.length) {
      const sortedUsers = sortUsers(filteredUsers);
      setFilteredUsers(sortedUsers);
    }
  }, [sortOrder]);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <h1>Users List</h1>
      <h2>Use the search box to filter the list</h2>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} size="2xl" />
      ) : (
        <>
          <UsersFilter
            onChange={handleFilter}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />
          <br />
          {filteredUsers.length ? (
            <>
              <div className={styles.listContainer}>
                {filteredUsers.map((user) => {
                  return (
                    <Card
                      key={user.login.uuid}
                      user={user}
                      updateUser={updateUser}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div>No results found</div>
          )}
        </>
      )}
      {errorMessage && (
        <Modal visible={showModal} closeModal={() => setShowModal(false)}>
          <div>{errorMessage}</div>
        </Modal>
      )}
    </>
  );
};

export default UsersList;
