import * as actionTypes from './actionTypes';
import axios from 'axios';

//action creators
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkTimeout = expirationTime => {
	//token expiration
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000); //turn it to mins
	};
};
export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2lYXo-69PTYBXnH9NCBTgKaRgRJ1zxyo';
		if (!isSignUp) {
			url =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA2lYXo-69PTYBXnH9NCBTgKaRgRJ1zxyo';
		}

		axios
			.post(url, authData)
			.then(res => {
				console.log(res);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkTimeout(res.data.expiresIn));
			})
			.catch(err => {
				console.log(err.response.data.error);
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};
