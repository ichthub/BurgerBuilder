import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../utility';

const intialState = {
	ingredients: null,
	totalPrice: 10,
	error: false
};

const INGR_PR = {
	//glabal var
	salad: 2,
	cheese: 1,
	meat: 4,
	bacon: 3
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
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
				totalPrice: state.totalPrice + INGR_PR[action.ingredientName]
			};
			console.log(updatedIngredient);
			console.log(updatedIngredients);
			console.log(updateState);
			return updateObj(state, updateState);
		//{
		// ...state,
		// ingredients: {
		// 	...state.ingredients,
		// 	[action.ingredientName]: state.ingredients[action.ingredientName] + 1
		// },
		// totalPrice: state.totalPrice + INGR_PR[action.ingredientName]
		//};
		case actionTypes.REMOVE_INGREDIENT:
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
				totalPrice: state.totalPrice + INGR_PR[action.ingredientName]
			};
			console.log(updatedIng);
			console.log(updatedIngs);
			console.log(updateSt);
			return updateObj(state, updateSt);

		// {
		// 	...state,
		// 	ingredients: {
		// 		...state.ingredients,
		// 		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		// 	},
		// 	totalPrice: state.totalPrice - INGR_PR[action.ingName]
		// };
		case actionTypes.SET_INGREDIENTS:
			return updateObj(state, {
				ingredients: action.ingredients,
				error: false,
				totalPrice: 10
			});
		// return {
		// 	...state,
		// 	ingredients: action.ingredients,
		// 	error: false,
		// 	totalPrice: 10
		// };
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObj(state, { error: true });
		// return {
		// 	...state,
		// 	error: true
		// };
		default:
			return state;
	}
};

export default reducer;
