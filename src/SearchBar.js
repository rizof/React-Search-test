import React from 'react'


function SearchBar (props) {
    const {filterText, onFilterTextChange, onStockChange, inStockOnly} = props

    return (
        <div>
            <div>
                <input type="text" 
                    value={filterText} 
                    placeholder="Rechercher" 
                    onChange={(e) => onFilterTextChange(e)}
                />
            </div>
            <div>
                <input type="checkbox" 
                    id="stock" 
                    checked={inStockOnly} 
                    onChange={(e) => onStockChange(e)}
                />
                <label htmlFor="stock">Produit en stock</label>
            </div>
        </div>
    )
}

export default SearchBar;
