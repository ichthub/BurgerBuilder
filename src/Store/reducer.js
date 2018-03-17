import * as actionsType from './actions';

const intialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 10
};

const INGR_PR = { //glabal var
	salad : 2,
	cheese : 1,
	meat : 4,
	bacon: 3
};


const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionsType.ADD_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName] : state.ingredients[action.ingredientName] + 1
          },
          totalPrice: state.totalPrice + INGR_PR[action.ingredientName]
        };
    case actionsType.REMOVE_INGREDIENT:

    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGR_PR[action.ingName]
    };

    default:
        return state;
  }
};

export default reducer;
