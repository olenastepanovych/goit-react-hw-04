import { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ onSubmit }) => {
const [search, setSearch] = useState('');

const handleChange = (e) => {
    setSearch(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = search.trim();

    if (!trimmed) {
    toast.error('Please enter a search term');
    return;
    }

    onSubmit(trimmed);
};

return (
    <header className={styles.header}>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input
        type="text"
        value={search}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        className={styles.input}
        />

<button type="submit" className={styles.button}>
        <IoIosSearch size={16} />
        </button>
    </form>
    </header>
);
};

export default SearchBar;
