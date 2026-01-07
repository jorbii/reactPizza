// pages/Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSort, setCurrentPage,setFilters, selectFilter } from "../Redux/Slices/filterSlice";
import { fetchPizzas, pizzaSelektor} from '../Redux/Slices/pizzasSlice'


import {Link, useNavigate} from 'react-router-dom';
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

  const {categoryId,searchValue,currentPage, sort} = useSelector(selectFilter);
  const {items, status} = useSelector(pizzaSelektor);

  //const sort = useSelector(filterSelektor.sort);
  const sortType =sort?.sortProperty || 'rating';

  const [totalPages, setTotalPages] = React.useState(3);

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

  const getPizzas = async () => {


    const order = sortType && sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType ? sortType.replace('-', '') : 'rating';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
  
    

      dispatch(
      fetchPizzas({
        params: {
          order,
          sortBy,
          category,
          search,
          currentPage,
        },
      })
    )
  };

  React.useEffect(() => {
   
    window.scrollTo(0, 0);
    if(!isSearch.current){
      getPizzas();
    }

    isSearch.current=false;
  }, [searchValue, currentPage ,categoryId, sortType,]);

  React.useEffect(() => {
    if (isMounted.current){
    const queryString = QueryString.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage
    })

    navigate(`?${queryString}`);
  };
  isMounted.current = true;
  }, [searchValue, currentPage ,categoryId, sortType,]);

  const pizzas = items.map((obj) => (
    <PizzaBlock key={obj.id}
      {...obj}
      image={obj.imageUrl}/>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={(i) => dispatch(setSort(i))} />
      </div>

      <h2 className="content__title">All pizzas</h2>

      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={totalPages} />
    </div>
  );
};

export default Home;