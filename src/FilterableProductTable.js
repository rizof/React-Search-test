import React, { useState } from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductCategoryRow from './ProductCategoryRow.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'
import Column2 from './Column2.js'

function FilterableProductTable ({products}) {
    const [filterText, setText] = useState("")
    const [inStockOnly, setStock] = useState(false)
    
    const rows = []
    let lastCategoriy = []

    const handleInFilterText = function(e){
        setText (e.target.value)
    }

    const handleInStockOnlyChange = function (e) {
        setStock (e.target.checked)
    }

    products.map((product, index) => {
        if (inStockOnly && !product.stocked)
            return false
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
            return false
        if (!lastCategoriy.includes(product.category)){
            lastCategoriy.push(product.category)
            rows.push(<ProductCategoryRow key={product.category} category={product.category} />)
        }
        const name = product.stocked ? product.name : <span className='danger'>{product.name}</span>
        const price = product.price 
        rows.push(<ProductRow key={index} name={name} price={price}/>)
        return true
    })

    return (<>
        <header>
            <Column2 
                left={
                    <img className="imgLogo" alt="logo" src="https://fr.freelogodesign.org/Content/img/logo-samples/flooop.png"/>
                }
                right={
                    <div className="contentTopRightHeader">            
                        <SearchBar 
                            filterText={filterText} 
                            onFilterTextChange={handleInFilterText}
                            inStockOnly={inStockOnly}
                            onStockChange={handleInStockOnlyChange}
                        />
                    </div>
                }
            />
        </header>
        <div className="contentTableProduct">
            <ProductTable 
                products={products} 
                rows={rows}
            />
        </div>
    </>)
}



export default FilterableProductTable;