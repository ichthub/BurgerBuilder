import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userID) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idtoken: token,
		userId: userID
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
	let url =
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA2lYXo-69PTYBXnH9NCBTgKaRgRJ1zxyo';
	if (!isSignUp) {
		url =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA2lYXo-69PTYBXnH9NCBTgKaRgRJ1zxyo';
	}
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
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
