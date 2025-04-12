import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <div className={styles.info}>
        <p><strong>Author:</strong> {image.user.name}</p>
        <p><strong>Likes:</strong> {image.likes}</p>
        {image.description && <p><strong>Description:</strong> {image.description}</p>}
      </div>
    </Modal>
  );
};

export default ImageModal;
