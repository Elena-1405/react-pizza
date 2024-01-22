import React from "react";
//import { useState } from "react";


export function Categories({ value, onChangeCategory }) {
  //const [activeCategory, setActiveCategory] = useState(0);

  // const OnClickCategory = (index) => {
  //   setActiveCategory(index);
  // }

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

    return (
      <div className="categories">
        <ul>
          {
            categories.map((categoryName, i) => 
              <li
                key={i}
                onClick={() => onChangeCategory(i)}
                className={value === i ? 'active' : ''}>
                {categoryName}
              </li>)
          }   
        </ul>
      </div>
    )
  }