import React from 'react'; 
import Auxi from '../../../hoc/Auxi';

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
			<p>Continue to Checkout</p>
		</Auxi>	

	);
};
	
    
export default OrderSummary;