import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const intialState = {
	orders: [],
	loading: false,
	purchased: false
};
//purchase
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
		purchased: true,
		orders: state.orders.concat(newOrder)
	});
};
const purchaseBurgerFail = (state, action) => {
	return updateObj(state, { loading: false });
};
//fetch
const fetchOrdersStart = (state, action) => {
	return updateObj(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
	return updateObj(state, {
		orders: action.orders,
		loading: false
	});
};

const fetchOrdersFail = (state, action) => {
	return updateObj(state, { loading: false });
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
			return purchaseBurgerFail(state, action);
		//fetch reducers
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrdersStart(state, action);
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrdersSuccess(state, action);
		case actionTypes.FETCH_ORDERS_FAIL:
			return fetchOrdersFail(state, action);
		default:
			return state;
	}
};

export default reducer;
