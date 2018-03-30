import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios_orders';
import withError from '../../hoc/ErrorHandler/withError';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	componentDidMount() {
		this.props.onOrderFetch();
	}

	render() {
		let orderComp = <Spinner />;
		if (!this.props.loading) {
			orderComp = this.props.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			));
		}
		return <div>{orderComp}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onOrderFetch: () => dispatch(actions.fetchOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withError(Orders, axios)
);
