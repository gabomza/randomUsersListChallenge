import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface IModalProps {
  closeModal: () => void;
  children: JSX.Element;
  visible: boolean;
}

const Modal = (props: IModalProps) => {
  const { closeModal, children, visible } = props;

  const modalVisibilityClass = visible ? "visible" : "hidden";

  return (
    <div id="modal" className={`${styles.modal} ${modalVisibilityClass}`}>
      <div className={styles.modalContent}>
        <FontAwesomeIcon
          className={styles.close}
          icon={faClose}
          size="2xl"
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
