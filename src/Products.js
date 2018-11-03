import React, { Component } from 'react';
import Filters from './Filters';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

let PRODUCTS = {
    '1': { id: 1, category: 'Musical Instruments', price: '459.99', stocked: true, name: 'Clarinet' },
    '2': { id: 2, category: 'Musical Instruments', price: '5,000', stocked: true, name: 'Cello' },
    '3': { id: 3, category: 'Musical Instruments', price: '11,000', stocked: false, name: 'Fortepiano' },
    '4': { id: 4, category: 'Furniture', price: '799', stocked: true, name: 'Chaise Lounge' },
    '5': { id: 5, category: 'Furniture', price: '1,300', stocked: false, name: 'Dining Table' },
    '6': { id: 6, category: 'Furniture', price: '100', stocked: true, name: 'Bean Bag' }
};

const RESET_VALUES = { id: '', category: '', price: '', stocked: false, name: '' };

class Products extends Component {
    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.state = {
            filterText: '',
            inStockOnly: false,
            products: PRODUCTS,
            formProduct: Object.assign({}, RESET_VALUES)
        };
    }

    handleFilter(filterInput) {
        this.setState(filterInput);
    }

    handleEdit(product) {
        this.setState({
            formProduct: product
        });
    }

    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products;
            delete products[productId];
            return { products };
        });
    }

    saveProduct(product) {

        let id = product.id;
        product.id = id === '' ? new Date().getTime() : id;

        this.setState((prevState) => {
            let products = prevState.products;
            products[product.id] = product;
            return { products: products, formProduct: Object.assign({}, RESET_VALUES)};
        });
    }

    render() {
        return (
            <div style={{ width: "300px" }}>
                <Filters
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilter={this.handleFilter}
                />
                <ProductTable
                    products={PRODUCTS}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onDestroy={this.handleDestroy}
                    onEdit={this.handleEdit}
                />
                <ProductForm onSave={this.saveProduct} formProduct={this.state.formProduct}/>
            </div>
        );
    }
}

export default Products;
