import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <ClipLoader color="#36d7b7" size={50} />
  </div>
);

export default Loader;

