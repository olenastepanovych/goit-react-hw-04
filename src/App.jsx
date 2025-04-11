import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import toast from 'react-hot-toast';

const ACCESS_KEY = 'CJ8gOmWTkkq7SYVXb-TAH6cnnVr8SupJVLtAlGi2pOo'; // 🔑 встав свій ключ тут

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const fetchImages = async (searchQuery, currentPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchQuery,
          page: currentPage,
          per_page: 10,
          client_id: ACCESS_KEY,
        },
      });

      if (response.data.results.length === 0) {
        toast.error('No images found for this query.');
        return;
      }

      setImages((prev) =>
        currentPage === 1 ? response.data.results : [...prev, ...response.data.results]
      );
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching images.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === query) return;
    setQuery(searchTerm);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (imageData) => {
    setModalData(imageData);
  };

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}

      {isLoading && <Loader />}

      {modalData && <ImageModal image={modalData} onClose={closeModal} />}
    </div>
  );
};

export default App;

