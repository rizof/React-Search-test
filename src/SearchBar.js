import React from 'react'


class SearchBar extends React.Component {
    constructor (props) {
        super (props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockOnlyChange(e) {
        this.props.onStockChange(e.target.checked)
    }
    
    render() {
        const {filterText, inStockOnly} = this.props
        return <div>
            <div>
                <input type="text" value={filterText} placeholder="Rechercher" onChange={this.handleFilterTextChange}/>
            </div>
            <div>
                <input type="checkbox" id="stock" checked={inStockOnly} onChange={this.handleInStockOnlyChange}/>
                <label htmlFor="stock">Produit en stock</label>
            </div>
        </div>
    } 
}

export default SearchBar;