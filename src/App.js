import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import Spinner from '../src/components/UI/Spinner/Spinner';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/actions/index';

//code splitting
const checkout = Loadable({
	loader: () => import('./containers/Checkout/Checkout'),
	loading:() =>  <Spinner />
});
const orders = Loadable({
	loader: () => import('./containers/Orders/Orders'),
	loading:() =>  <Spinner />
});
const auth = Loadable({
	loader: () => import('./containers/Auth/Auth'),
	loading:() =>  <Spinner />
});


class App extends Component {
	
	componentDidMount() {
		this.props.authStateChecking();
	}
	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={checkout} />
					<Route path="/orders" component={orders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={auth} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authStateChecking: () => dispatch(actions.authCheckState())
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
