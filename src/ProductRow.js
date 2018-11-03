import React, { Component } from 'react';
import './ProductRow.css';

class ProductRow extends Component {
    constructor(props) {
        super(props);

        this.destroy = this.destroy.bind(this);
        this.edit = this.edit.bind(this);
    }

    destroy() {
        this.props.onDestroy(this.props.product.id);
    }

    edit() {
        this.props.onEdit(this.props.product);
    }

    render() {
        return (
            <tr>
                <td>
                    <span className={ this.props.product.stocked ? '' : 'productRow-out-of-stock' }>
                        { this.props.product.name }
                    </span>
                </td>
                <td>
                    { '$' + this.props.product.price }
                </td>
                <td>
                    <button onClick={this.destroy}>X</button>
                </td>
                <td>
                    <button onClick={this.edit}>Edit</button>
                </td>
            </tr>
        );
    }
}

export default ProductRow;
