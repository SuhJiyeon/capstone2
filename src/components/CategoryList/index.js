import React from "react";
import styles from "./CategoryList.module.css";

function CategoryList({ categories, onClick, selectedCategory, noData }) {
  return (
    <ul className={styles.categoryList}>
      {categories.length > 0
        ? categories?.map((category, idx) => {
            return (
              <li
                key={category.id}
                onClick={() => onClick(category.id, category.value)}
                className={`${styles.categoryItem} ${
                  category.value === selectedCategory && styles.selectedCategory
                }`}
              >
                <div className="category-box">
                  <div className={`${styles.boxInner} ${styles.selected}`}>
                    {category.label}
                  </div>
                </div>
              </li>
            );
          })
        : noData}
    </ul>
  );
}

export default CategoryList;
