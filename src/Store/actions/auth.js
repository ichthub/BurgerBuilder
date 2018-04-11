import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.Auth_START
	};
};

export const authSuccess = authData => {
	return {
		type: actionTypes.Auth_SUCCESS,
		authData: authData
	};
};

export const authFail = error => {
	return {
		type: actionTypes.Auth_FAIL,
		error: error
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
				dispatch(authSuccess(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
