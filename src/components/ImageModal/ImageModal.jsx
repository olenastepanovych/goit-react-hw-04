import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root'); // обовʼязково для accessibility

const ImageModal = ({ image, onClose }) => {
const { urls, alt_description, user, likes, description } = image;

return (
    <Modal
    isOpen={true}
    onRequestClose={onClose}
    contentLabel="Image modal"
    className={styles.modal}
    overlayClassName={styles.overlay}
    >
    <div className={styles.content}>
        <img
        src={urls.regular}
        alt={alt_description}
        className={styles.image}
        />
        <div className={styles.details}>
        <p><strong>Author:</strong> {user.name}</p>
        {description && <p><strong>Description:</strong> {description}</p>}
        <p><strong>Likes:</strong> {likes}</p>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>✖</button>
    </div>
    </Modal>
);
};

export default ImageModal;
