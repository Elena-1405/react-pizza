import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../App";
import { Pagination } from '../components/Pagination/index';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton'
//import pizzas from './assets/pizza-db.json';

export const Home = () => {
  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6562128cdcd355c0832487c7.mockapi.io/pizza-react?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy={sortType.sort}&order=desc`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0,0);
  }, [categoryId, searchValue, currentPage]);
    

    return (
        <>
            <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
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