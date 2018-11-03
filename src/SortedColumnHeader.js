import React, { Component } from 'react';
import './SortedColumnHeader.css';

class SortedColumnHeader extends Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        this.props.onSort(this.props.column, e.target.name);
    }

    render() {
        let currentSort = this.props.currentSort.column === this.props.column ? this.props.currentSort.direction : false;

        return (
            <th>
                {this.props.column}
                <button
                    onClick={this.handleSort} 
                    className={ currentSort === 'asc' ? "sortedColumnHeader-currrent" : ""} 
                    name='asc'
                >&#x25B2;</button>
                <button 
                    onClick={this.handleSort}
                    className={ currentSort === 'desc' ? "sortedColumnHeader-currrent" : ""}
                    name='desc'
                >&#x25BC;</button>
            </th>
        );
    }
}

export default SortedColumnHeader;
