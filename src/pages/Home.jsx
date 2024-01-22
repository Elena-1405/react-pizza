import React, { useState, useEffect } from "react";

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton'
//import pizzas from './assets/pizza-db.json';

export const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
      name: 'популярности',
      sort: 'rating',
    });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6562128cdcd355c0832487c7.mockapi.io/pizza-react?${
        categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy={sortType.sort}&order=desc`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0,0);
  }, [categoryId]);
    

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
            : items.map(obj => 
            <PizzaBlock
            key={obj.id}
            {...obj} />)
          }
        </div>
        </>
    )
}