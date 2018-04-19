import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				console.log(response);
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				console.log(error);
				dispatch(purchaseBurgerFail(error));
			});
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

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('orders.json' + queryParams)
			.then(response => {
				console.log(response);
				const fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
				console.log(response);
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
				console.log(err);
			});
	};
};
