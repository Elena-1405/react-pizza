import React from "react";
import { useState } from "react";


export function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const OnClickCategory = (index) => {
    setActiveCategory(index);
  }

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
            categories.map((value, index) => 
              <li
                key={index}
                onClick={() => OnClickCategory(index)}
                className={activeCategory === index ? 'active' : ''}>
                {value}
              </li>)
          }   
        </ul>
      </div>
    )
  }