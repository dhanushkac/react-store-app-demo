import React, { Component } from 'react';
import Products from './Products';

class App extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto", display: "table" }}>
        <Products />
      </div>
    );
  }
}

export default App;
