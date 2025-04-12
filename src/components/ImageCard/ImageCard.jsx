import styles from './ImageCard.module.css';

const ImageCard = ({ image, onSelect }) => {
  return (
    <div className={styles.card} onClick={() => onSelect(image)}>
      <img src={image.urls.small} alt={image.alt_description} className={styles.image}/>
    </div>
  );
};

export default ImageCard;
