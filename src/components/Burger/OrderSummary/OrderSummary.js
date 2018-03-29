import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	componentWillUpdate() {
		//console.log("order summary will update");
	}
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>
						{igKey} : {this.props.ingredients[igKey]}
					</span>
				</li>
			);
		});

		return (
			<Auxi>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>

				<ul>{ingredientSummary}</ul>

				<p>
					<strong>Total Price: {this.props.price.toFixed(2)} DH</strong>
				</p>

				<p>Continue to Checkout</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					Continue
				</Button>
			</Auxi>
		);
	}
}

export default OrderSummary;
