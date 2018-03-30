import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderData: orderData,
		orderId: id
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then(response => {
				//console.log(response.data);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = err => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: err
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('orders.json')
			.then(res => {
				const fetchedOrders = [];
				for (var key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
