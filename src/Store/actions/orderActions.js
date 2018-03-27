import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';


export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderData: orderData,
		orderId: id
	};
};

export const purchaseBurgerFail = (error) => {
	return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
		error:error
  };
};

export const purchaseBurgerStart = () =>{
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
}

export const purchaseBurger = (orderData) =>{
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post( '/orders.json', orderData )
				.then( response => {
					console.log(response.data);
					dispatch(purchaseBurgerSuccess(response.data, orderData));
				})
				.catch( error => {
					dispatch(purchaseBurgerFail(error));
				});
	};
}
