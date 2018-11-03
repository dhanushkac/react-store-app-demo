import React, { Component } from 'react';
import SortedColumnHeader from './SortedColumnHeader';
import ProductRow from './ProductRow';

class ProductTable extends Component {
    constructor(props) {
        super(props);

        this.sortByColumnAndDirection = this.sortByColumnAndDirection.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.state = {
            sort: {
                column: 'price',
                direction: 'desc'
            }
        };
    }

    handleDestroy(id) {
        this.props.onDestroy(id);
    }

    handleEdit(product) {
        this.props.onEdit(product);
    }

    sortProducts() {
        let productAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
        return productAsArray.sort(this.sortByColumnAndDirection);
    }

    sortByColumnAndDirection(objectA, objectB) {
        let isDesc = this.state.sort.direction === 'desc' ? -1 : 1;
        let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];

        if (this.state.sort.column === 'price') {
            [a, b] = [a, b].map((value) => parseFloat(value.replace(/[^\d\.]/g, ''), 10));
        }

        if (a > b) {
            return 1 * isDesc;
        }

        if (a < b) {
            return -1 * isDesc;
        }
    }

    handleSort(column, direction) {
        this.setState({
            sort: {
                column: column,
                direction: direction
            }
        });
    }

    render() {

        let rows = [];

        this.sortProducts().forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            rows.push(
                <ProductRow product={product} key={product.id} onDestroy={this.handleDestroy} onEdit={this.handleEdit}/>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <SortedColumnHeader
                            onSort={this.handleSort}
                            currentSort={this.state.sort}
                            column="name"
                        />
                        <SortedColumnHeader
                            onSort={this.handleSort}
                            currentSort={this.state.sort}
                            column="price"
                        />
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default ProductTable;
