import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: [],
    }
    
    componentDidMount() {
        this.loadProducts();
    }

loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo })    
};

nextPage = () => {
    const { page, productInfo } = this.data;

    if (page === productInfo.page) return;

    const pageNumber = page + 1;
    
    this.loadProducts(pageNumber);
}


    render(){

        const { products } = this.state;

        return (
            <div className="product-list">
               { products.map(product => (
                <article key={product._id}>
                    <strong>{ product.title }</strong>
                    <p>{ product.description }</p>
                    <a href="">Detalhes</a>
                </article>
               ))
               }
               <div className="actions">
                   <button onClick={this.prevPage}>Anterior</button>
                   <button onClick={this.nextPage}>Próximo</button>
               </div>
            </div>
        )
    }
}

//export default Main;
