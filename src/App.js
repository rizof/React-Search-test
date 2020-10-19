import React from 'react';
import './App.css';
import FilterableProductTable from './FilterableProductTable'

const PRODUCTS = [
  {id: 1, category: "HOUSE", price: "$49.99", stocked: true, name: "Commode", quantity: 1},
  {id: 2, category: "Sporting Goods", price: "$9.99", stocked: true, name: "Marathon", quantity: 1},
  {id: 3, category: "Sporting Goods", price: "$29.99", stocked: false, name: "Boxe", quantity: 1},
  {id: 4, category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch", quantity: 1},
  {id: 5, category: "Electronics", price: "$39.99", stocked: false, name: "iPhone 5", quantity: 1},
  {id: 6, category: "Electronics", price: "$99.99", stocked: true, name: "Nexus 7", quantity: 1},
  {id: 7, category: "Sporting Goods", price: "$9.9", stocked: true, name: "Tennis", quantity: 1},
  {id: 8, category: "HOUSE", price: "$49.99", stocked: true, name: "Canapé", quantity: 1},
  {id: 9, category: "Sporting Goods", price: "$91.99", stocked: true, name: "Baseball", quantity: 1},
  {id: 10, category: "Sporting Goods", price: "$219.99", stocked: false, name: "Basketball", quantity: 1},
  {id: 11, category: "Electronics", price: "$939.99", stocked: true, name: "iPod Touch", quantity: 1},
  {id: 12, category: "HOUSE", price: "$3919.99", stocked: false, name: "Réfrigerateur", quantity: 1},
  {id: 13, category: "HOUSE", price: "$199.99", stocked: true, name: "Armoire", quantity: 1},
  {id: 14, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Handball", quantity: 1},
];

function App() {
  return (
    <div className="App">
      <FilterableProductTable productsObject={PRODUCTS} />
    </div>
  );
}

export default App;
