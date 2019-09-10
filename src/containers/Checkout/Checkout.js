import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary= <Redirect to='/' />
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = <div>
                {purchaseRedirect}
                <CheckoutSummary
              purchaseInit      ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinueded={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component = {ContactData}
                    // if want to pass data to component will use in following way.
                    // render = {(props)=>(<ContactData ingredients={this.state.ingredients}
                    //     price={this.state.totalPrice} {...props}
                    // />)}
                    
                />
            </div>
        }
        return summary
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        //price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout)