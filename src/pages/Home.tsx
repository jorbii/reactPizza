// pages/Home.jsx
import React from "react";
import { useSelector, } from "react-redux";
import { setCategoryId, setSort, setCurrentPage,setFilters, selectFilter } from "../Redux/Slices/filterSlice.ts";
import  { fetchPizzas, pizzaSelektor, FetchPizzasParams} from '../Redux/Slices/pizzasSlice.ts'

import { useAppDispatch } from "../Redux/hooks.ts";

import { useNavigate} from 'react-router-dom';
import QueryString from "qs";

import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Categories from '../components/Categories.tsx';
import Sort, {list} from '../components/Sort.tsx';
import Pagination from "../components/Pagination/index.tsx";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {categoryId,searchValue,currentPage, sort} = useSelector(selectFilter);
  const {items, status} = useSelector(pizzaSelektor);


  const sortType =sort?.sortProperty || 'rating';

  const [totalPages, setTotalPages] = React.useState(3);

  const onChangeCategory = (id:number) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };

  React.useEffect(() => {
    if(window.location.search) {
      const params = (QueryString.parse(window.location.search.substring(1))as unknown as FetchPizzasParams);
      const sort = list.find((obj) => obj.sortProperty === params.sortBy)
    
      dispatch(setFilters({
        searchValue: params.search,
        categoryId:  Number(params.category),
        currentPage: params.currentPage,
        sort: sort || list[0],
      }));

      isSearch.current = true;
      }
  }, []);

  const onChangePage = (pageNumber: number) => {
      dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {


    const order = sortType && sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType ? sortType.replace('-', '') : 'rating';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
  
    

      dispatch(
      fetchPizzas({
          order,
          sortBy,
          category,
          search,
          currentPage,
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

  const pizzas = items.map((obj: any) => (
    <PizzaBlock key={obj.id}
      {...obj}
      image={obj.imageUrl}/>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={(i: number) => dispatch(setSort(list[i]))} />
      </div>

      <h2 className="content__title">All pizzas</h2>

      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={totalPages} />
    </div>
  );
};

export default Home;