// pages/Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSort, setCurrentPage,setFilters } from "../Redux/Slices/filterSlice";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import QueryString from "qs";

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import {list, Sort} from '../components/Sort';
import Pagination from "../components/Pagination/index";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const sort = useSelector((state) => state.filter.sort);
  const sortType =sort?.sortProperty || 'rating';

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(3); // підстав для Pagination

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };

  React.useEffect(() => {
    if(window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  const onChangePage = (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
  };

  const fetchPizzas = () => {
     setIsLoading(true);

    const order = sortType && sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType ? sortType.replace('-', '') : 'rating';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const url = `https://68fdc9817c700772bb11ec50.mockapi.io/Items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`;
    console.log('Fetching URL:', url);

    axios.get(url)
      .then((res) => {
        setItems(res.data || []);
        // Якщо API повертає загальну кількість — можна встановити totalPages тут
        // setTotalPages(res.headers['x-total-pages'] || 3);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setItems([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
   
    window.scrollTo(0, 0);
    if(!isSearch.current){
      fetchPizzas();
    }

    isSearch.current=false;
  }, [searchValue, currentPage ,categoryId, sortType,]);

  React.useEffect(() => {
    if (isMounted.current){
    const queryString = QueryString.stringify({
      sortProperty: Sort.sortProperty,
      categoryId,
      currentPage
    })

    navigate(`?${queryString}`);
  };
  isMounted.current = true;
  }, [searchValue, currentPage ,categoryId, sortType,]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} image={obj.imageUrl} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={(i) => dispatch(setSort(i))} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={totalPages} />
    </div>
  );
};

export default Home;