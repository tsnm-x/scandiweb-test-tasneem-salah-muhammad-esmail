import React, { Component } from 'react';
import ProductCard from '../ProductCard/ProductCardComponent';
import { connect } from 'react-redux';
import { getData } from "../../network/ApolloClient";
import queries from "../../enums/queries"

class ProductList extends Component {

    constructor(props){
        super(props);

        this.state = {
            productList: []
        }
    }

    async componentDidMount(){
        if(this.props?.category?.category){
            const productQuery = queries.products(this.props.category.category);
            const productList = await getData(productQuery);

            this.setState({productList: productList?.data?.category?.products})
        }
    }

    async componentDidUpdate(prevProps){
        if(this.props?.category?.category !== prevProps.category?.category ){
            const productQuery = queries.products(this.props.category.category);
            const productList = await getData(productQuery);

            this.setState({productList: productList?.data?.category?.products})
        }
    }

    render(){

        return (
            <div className="d-flex-column custom-align-center">
                    <div className="custom-pb-8 custom-mb-8 custom-pt-8 custom-mt-8 custom-col-11 custom-text-style custom-text-7 capitalize">{this.props?.category?.category}</div>
                    <div className="custom-col-11 grid-col-3 custom-mb-6">
                        {this.state.productList?.map((product, idx) => {
                            return (
                                <div key={idx}>
                                    <ProductCard setDisableCartIcons={this.props.setDisableCartIcons} disableCartIcons={this.props.disableCartIcons} product={product} cartDropDown={this.props.cartDropDown} setCartDropDown={this.props.setCartDropDown}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps)(ProductList);