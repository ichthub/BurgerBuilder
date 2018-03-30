import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';

const intialState = {
	orders: [],
	loading: false,
	purchased: false
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return updateObj(state, { purchased: false });
		// return {
		// 	...state
		// 	purchased: false
		// };

		case actionTypes.PURCHASE_BURGER_START:
			return updateObj(state, { loading: true });
		// return {
		// 	...state,
		// 	loading: true
		// };

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = updateObj(action.orderData, { id: action.orderId });
			return updateObj(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			});
		// const newOrder = {
		// 	...action.orderData,
		// 	id: action.orderId
		// };

		// return {
		// 	...state,
		// 	loading: false,
		// 	orders: state.orders.concat(newOrder),
		// 	purchased: true
		// };

		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateObj(state, { loading: true });
		// return {
		// 	...state,
		// 	loading: true
		// };

		case actionTypes.FETCH_ORDERS_START:
			return updateObj(state, { loading: true });
		// return {
		// 	...state,
		// 	loading: true
		// };

		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObj(state, {
				loading: false,
				orders: action.orders
			});
		// return {
		// 	...state,
		// 	loading: false,
		// 	orders: action.orders
		// };
		case actionTypes.FETCH_ORDERS_FAIL:
			return updateObj(state, { loading: false });
		// return {
		// 	...state,
		// 	loading: false
		// };

		default:
			return state;
	}
};

export default reducer;
