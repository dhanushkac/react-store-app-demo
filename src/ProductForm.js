import React from 'react';

const RESET_VALUES = { id: '', category: '', price: '', stocked: false, name: '' };

class ProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: Object.assign({}, RESET_VALUES),
            error: true
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            product: nextProps.formProduct,
            error: false
        });
    }

    isFormValid() {
        return this.state.product.name.length > 0 ? true : false;
    }

    handleSave(e) {

        if (this.isFormValid()) {

            this.props.onSave(this.state.product);
            this.setState({
                product: Object.assign({}, RESET_VALUES),
                error: true
            });
            e.preventDefault();
        } else {
            alert("Name is required!!");
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = e.target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState((prevState) => {
            prevState.product[name] = value;
            prevState.error = name === 'name' ? (value.length > 0 ? false : true) : prevState.error;

            return { product: prevState.product, error: prevState.error }
        });
    }

    render() {
        let errorStatus = this.state.error ? "block" : "none";

        return (
            <form>
                <h3>Enter a new product</h3>
                <p>
                    <label>Name<br />
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} />
                    </label>
                    <label style={{ color: "red", display: errorStatus }}>name is required</label>
                </p>
                <p>
                    <label>Category<br />
                        <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} />
                    </label>
                </p>
                <p>
                    <label>Price<br />
                        <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} />
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked} /> In stock?
                    </label>
                </p>
                <input type="button" value="Save" onClick={this.handleSave} />
            </form>
        );
    }
}

export default ProductForm;