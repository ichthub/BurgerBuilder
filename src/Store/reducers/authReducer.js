import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';
const intialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

const authReducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return updateObj(state, { error: null, loading: true });
		case actionTypes.AUTH_SUCCESS:
			return updateObj(state, {
				token: action.idToken,
				userId: action.userId,
				error: null,
				loading: false
			});
		case actionTypes.AUTH_FAIL:
			return updateObj(state, { error: action.error, loading: false });
		case actionTypes.AUTH_LOGOUT:
			return updateObj(state, { token: null, userId: null });
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return updateObj(state, { authRedirectPath: action.path });
		default:
			return state;
	}
};

export default authReducer;
