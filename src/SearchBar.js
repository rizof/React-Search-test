import React from 'react'


function SearchBar (props) {
    const {filterText, onFilter, inStockOnly} = props

    console.log(filterText)
    return (
        <div>
                <div>
                    <input type="text" placeholder="Rechercher" value={filterText} onChange={(e) => onFilter(e)}/>
                </div>
                <div>
                    <input type="checkbox" id="stock" checked={inStockOnly} onChange={(e) => onFilter(e)}/>
                    <label htmlFor="stock">Produit en stock</label>
                </div>
        </div>
    )
}

export default SearchBar;