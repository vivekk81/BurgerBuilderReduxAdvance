import React from 'react'
import {connect} from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true,

    }
    componentDidMount(){
     this.props.onFetchOrders()   
    }
    render(){
        let orders = <Spinner />
        if(this.props.orders){
            orders = this.props.orders.map(order=>{
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            })
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios))