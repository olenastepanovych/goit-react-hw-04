import { useCallback, useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


const ACCESS_KEY = 'CJ8gOmWTkkq7SYVXb-TAH6cnnVr8SupJVLtAlGi2pOo';
const BASE_URL = 'https://api.unsplash.com/search/photos';



const searchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 12,
    },
  });
  return response.data;
};

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalData, setModalData] = useState(null);

  const handleSearch = newQuery => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const fetchImages = useCallback(async () => {
    if (!query) return;

    try {
      setLoading(true);
      setError('');
      const data = await searchImages(query, page);
      if (data.results.length === 0) toast.error('No images found for this query.');
      setImages(prev => [...prev, ...data.results]);
    } catch {
      setError('Something went wrong while fetching images.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openModal = imageData => setModalData(imageData);
  const closeModal = () => setModalData(null);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onSelect={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={() => setPage(p => p + 1)} />}
      {modalData && <ImageModal image={modalData} onClose={closeModal} />}

    </>
  );
};

export default App;

