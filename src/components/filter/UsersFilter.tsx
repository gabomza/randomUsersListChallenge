import styles from "./UsersFilter.module.css";

interface IUsersFilterProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  toggleSortOrder: () => void;
}

const UsersFilter = (props: IUsersFilterProps) => {
  const { onChange, sortOrder, toggleSortOrder } = props;
  return (
    <div className={styles.filtersContainer}>
      <input
        id="search"
        type="text"
        placeholder="Name, e-mail, phone or location..."
        onChange={onChange}
      />
      <div className={styles.sortContainer}>
        Sorted by Last name{" "}
        <button onClick={toggleSortOrder}>{sortOrder}</button>
      </div>
    </div>
  );
};

export default UsersFilter;
