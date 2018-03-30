import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';

const intialState = {
	orders: [],
	loading: false,
	purchased: false
};

const purchaseInit = (state, action) => {
	return updateObj(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
	return updateObj(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
	const newOrder = updateObj(action.orderData, { id: action.orderId });
	return updateObj(state, {
		loading: false,
		orders: state.orders.concat(newOrder),
		purchased: true
	});
};
const fetchOrdersSuccess = (state, action) => {
	return updateObj(state, {
		loading: false,
		orders: action.orders
	});
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		//purchase reducers
		case actionTypes.PURCHASE_INIT:
			return purchaseInit(state, action);
		case actionTypes.PURCHASE_BURGER_START:
			return purchaseBurgerStart(state, action);
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateObj(state, { loading: true });
		//fetch reducers
		case actionTypes.FETCH_ORDERS_START:
			return updateObj(state, { loading: true });
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrdersSuccess(state, action);
		case actionTypes.FETCH_ORDERS_FAIL:
			return updateObj(state, { loading: false });
		default:
			return state;
	}
};

export default reducer;
