import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios_orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/ErrorHandler/withError';
import Offline from '../../components/Burger/Offline/Offline';
import * as actions from '../../Store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};
	//request data from firebase
	componentDidMount() {
		this.props.onInitIngredient();
	}

	updatedPurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	}

	purchasingHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		//because we fetch data from server we want to show our burger when the request is done or we will get error
		let orderSummary = null;
		let burger = this.props.error ? <Offline /> : <Spinner />;
		if (this.props.ings) {
			burger = (
				<Auxi>
					<Burger ingredients={this.props.ings} />
					{/*enable order button with purchaseable*/}
					<BuildControls
						ingredientAdded={this.props.onIngAdd}
						ingredientRemoved={this.props.onIngRemove}
						disabled={disabledInfo}
						purchaseable={this.updatedPurchaseState(this.props.ings)}
						ordered={this.purchasingHandler}
						price={this.props.price}
						isAuth={this.props.isAuthenticated}
					/>
				</Auxi>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		return (
			<Auxi>
				<Modal
					show={this.state.purchasing}
					modelClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxi>
		);
	}
}

const mapStateToProps = state => {
	//state
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	//dispatch
	return {
		onIngAdd: ingName => dispatch(actions.addIngredient(ingName)),
		onIngRemove: ingName => dispatch(actions.removeIngredient(ingName)),
		onInitIngredient: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withError(BurgerBuilder, axios)
);
