import React,{Component}  from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';
const withError = (WrappedComonent, axios) => {
	return class extends Component{
	state = {
		error: null
	}
		componentWillMount (){
			this.reqInterceptors = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			});
			this.resInterceptors = axios.interceptors.response.use(res => res, err =>{ //simple way to say (res => { return res; });
				this.setState({error: err});
			});
		}
		//destroy needless interceptors
		
		componentWillUnmount () {
			axios.interceptors.request.eject(this.reqInterceptors);
			axios.interceptors.request.eject(this.resInterceptors);
		}
	errorConfirmedHandler = () => {
		this.setState({error: null});
	}

	render(){
		return(
			<Auxi>
				<Modal show ={this.state.error} modelClosed ={this.errorConfirmedHandler}>
					{this.state.error ? this.state.error.message : null}
				</Modal>
				<WrappedComonent {...this.props}/>
			{/*any wrapped components and its props*/}
			</Auxi>
		
		);
	}
		
	}

}

export default withError;