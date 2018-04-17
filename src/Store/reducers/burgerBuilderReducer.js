import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';

const intialState = {
	ingredients: null,
	totalPrice: 10,
	error: false,
	building: false
};

const INGR_PR = {
	//glabal var
	salad: 2,
	cheese: 1,
	meat: 4,
	bacon: 3
};

const addIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	};
	const updatedIngredients = updateObj(
		//ingredients obj bellow
		state.ingredients,
		updatedIngredient
	);
	const updateState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGR_PR[action.ingredientName],
		building: true
	};
	// console.log(updatedIngredient);
	// console.log(updatedIngredients);
	// console.log(updateState);
	return updateObj(state, updateState);
};

const removeIngredient = (state, action) => {
	const updatedIng = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	};
	const updatedIngs = updateObj(
		//ingredients obj bellow
		state.ingredients,
		updatedIng
	);
	const updateSt = {
		ingredients: updatedIngs,
		totalPrice: state.totalPrice + INGR_PR[action.ingredientName],
		building: true
	};
	return updateObj(state, updateSt);
};

const setInredients = (state, action) => {
	return updateObj(state, {
		ingredients: action.ingredients,
		error: false,
		totalPrice: 10,
		building: false
	});
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setInredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObj(state, { error: true });
		default:
			return state;
	}
};

export default reducer;
