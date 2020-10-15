import React from 'react'
import ProductTable from './ProductTable.js' 
import SearchBar from './SearchBar.js'
import ProductCategoryRow from './ProductCategoryRow.js'
import ProductRow from './ProductRow.js'
import './FilterableProductTable.css'

class FilterableProductTable extends React.PureComponent{
    constructor (props) {
        super (props)
        this.state = {
            filterText: "",
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange= this.handleInStockOnlyChange.bind(this)
    }
    
    handleFilterTextChange (filterText) {
        this.setState({filterText})
    }
    
    handleInStockOnlyChange (inStockOnly) {
        this.setState({inStockOnly})
    }

    render () {
        const {products} = this.props
        const rows = []
        let lastCategoriy = []
        const {filterText, inStockOnly} = this.state

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
            <SearchBar 
                filterText={filterText} 
                inStockOnly={inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleInStockOnlyChange}
            />
            <ProductTable 
                products={products} 
                rows={rows}
            />
        </>)
    }
}



export default FilterableProductTable;