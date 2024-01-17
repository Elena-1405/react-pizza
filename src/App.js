import React, { useState, useEffect } from 'react';
import '../src/scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';
//import pizzas from './assets/pizza-db.json';

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://6562128cdcd355c0832487c7.mockapi.io/pizza-react')
      .then((res) => res.json())
      .then((arr) => 
      setItems(arr));
  }, []);
    
      
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>    
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            items.map(obj => 
            <PizzaBlock
            key={obj.title}
            {...obj} />)
          }
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
