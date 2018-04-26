import authReducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{
    it('should return intial state',()=>{
        expect(authReducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should store token upon login',()=>{
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
            },{
               type: actionTypes.AUTH_SUCCESS,
               idToken:'Token recieved',
               userId:'user-id'
            })).toEqual({
            token:'Token recieved',
            userId:'user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
})
