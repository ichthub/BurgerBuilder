import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};
export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setInredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchInredientsFailed = () => {
	return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://burger-builder-7b394.firebaseio.com/ingredients.json')
			.then(res => {
				dispatch(setInredients(res.data));
			})
			.catch(err => {
				dispatch(fetchInredientsFailed());
			});
	};
};
