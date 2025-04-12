import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    query: Yup.string().required('Обовʼязкове поле'),
  });

  const handleFormSubmit = (values, { resetForm }) => {
    const trimmed = values.query.trim();
    if (!trimmed) {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(trimmed);
    resetForm();
  };

  return (
    <header className={styles.header}>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form className={styles.form}>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
