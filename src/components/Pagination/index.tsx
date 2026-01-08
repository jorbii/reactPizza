import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type PaginationProps = {
 currentPage: number ;
 onChangePage: (page: number) => void;
 pageCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, pageCount = 3 }) => {
  // локальний selected (0-based для ReactPaginate)
  const [selected, setSelected] = React.useState(currentPage - 1);

  // Синхронізуємо локальний selected, коли зовнішній currentPage змінюється,
  // але тільки якщо воно відрізняється — щоб уникнути лишніх викликів.
  React.useEffect(() => {
    const desired = currentPage - 1;
    if (desired !== selected) {
      setSelected(desired);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (event:any) => {
    const newSelected = event.selected;
    // якщо та сама сторінка — не диспатчимо
    if (newSelected === selected) return;

    setSelected(newSelected); // оновлюємо локально — щоб UI відреагував миттєво
    const newPageNumber = newSelected + 1;
    onChangePage(newPageNumber);
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={selected} // тепер forcePage керується локальним станом
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;