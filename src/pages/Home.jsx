import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'


import { setCategoryId } from "../redux/slices/filterSlice";
import { SearchContext } from "../App";
import { Pagination } from '../components/Pagination/index';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton'
//import pizzas from './assets/pizza-db.json';

export const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector(state => state.filter);
  //const sortType = useSelector(state => state.filter.sort.sortProperty)
  //const {categoryId, sort } = useSelector(state => state.filter);
  //const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true);

    // const sortBy = sort.sortProperty.replace('-', '');
    // const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    // const category = categoryId > 0 ? String(categoryId) : '';
    // const search = searchValue;

    // fetch(
    //   `https://6562128cdcd355c0832487c7.mockapi.io/pizza-react?page=${currentPage}&limit=4&${
    //     categoryId > 0 ? `category=${categoryId}` 
    //     : ''}&sortBy={sortType.sort}&order=desc`)
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

      axios.get(`https://6562128cdcd355c0832487c7.mockapi.io/pizza-react?page=${currentPage}&limit=4&${
             categoryId > 0 ? `category=${categoryId}` 
            : ''}&sortBy={sortType.sort}&order=desc`
            )
            .then((res) => {
              setItems(res.data);
              setIsLoading(false);
            });
      window.scrollTo(0,0);
  }, [categoryId, searchValue, currentPage]);
    

    return (
        <>
            <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
          <Sort />
        </div>    
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
            : items
                .filter((obj) => {
                  if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                    return true;
                  }
                  return false;
                })
              .map(obj => 
              <PizzaBlock
              key={obj.id}
              {...obj} />)
          }
        </div>
        <Pagination onChangePage={number => setCurrentPage(number)} />
          
        </>
    )
}