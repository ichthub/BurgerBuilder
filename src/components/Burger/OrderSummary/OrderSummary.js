import React from 'react'; 
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientSummary =Object.keys(props.ingredients).map(igKey => {
		return (
			<li key = {igKey}>
				<span style={{textTransform: 'capitalize'}}>{igKey} : {props.ingredients[igKey]}</span>
				
			</li> );
	});
	
	return (
		<Auxi>
			<h3>Your Order</h3>
			<p>A delicious burger with following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: {props.price.toFixed(2)} DH</strong></p>
			<p>Continue to Checkout</p>
			<Button btnType = "Danger" clicked={props.purchaseCancelled}>Cancel</Button>
			<Button btnType = "Success" clicked={props.purchaseContinued}>Continue</Button>
		</Auxi>	

	);
};
	
    
export default OrderSummary;