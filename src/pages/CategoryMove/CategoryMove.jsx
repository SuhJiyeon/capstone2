import React, { useState } from 'react';

function CategoryMove() {
  const [articles, setArticles] = useState([]);
  
  const handleClick = (categoryId) => {
    fetch(`https://www.assac.shop/api/categories/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.amrticles);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
    { id: 6, name: 'Category 6' },
    // 다른 카테고리 추가
  ];
  
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
        >
          {category.name}
        </button>
      ))}
  
      <h2>Registered Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMove;
