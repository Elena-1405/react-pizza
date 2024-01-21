import React, { useState, useEffect } from "react";

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton'
//import pizzas from './assets/pizza-db.json';

export const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6562128cdcd355c0832487c7.mockapi.io/pizza-react')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
      window.scrollTo(0,0);
  }, []);
    

    return (
        <>
            <div className="content__top">
          <Categories />
          <Sort />
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