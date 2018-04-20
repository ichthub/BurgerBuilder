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
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkTimeout = expirationDate => {
	//token expiration
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationDate * 1000); //turn it to mins
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
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('userId', res.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkTimeout(res.data.expiresIn));
			})
			.catch(err => {
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

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				const expireTimeSec =
					(expirationDate.getTime() - new Date().getTime()) / 1000;
				dispatch(authSuccess(token, userId));
				dispatch(checkTimeout(expireTimeSec));
				//console.log(expirationDate);
				//console.log(expireTimeSec);
			} else {
				dispatch(logout());
			}
		}
	};
};
