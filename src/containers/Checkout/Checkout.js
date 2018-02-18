import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients : {
			salad :1,
			meat : 1,
			bacon: 1,
			cheese: 1,
		}
	}
	componentDidMount () {
		//extrat url serach params
		const query = new URLSearchParams(this.props.location.search);
		console.log('Search params '+ query);
		const extractedIngredients = {};
		for(let param of query.entries()){
			extractedIngredients[param[0]] = +param[1];
			//console.log(extractedIngredients);
		}
		this.setState({ingredients : extractedIngredients});
	}
	
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}
	
	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}
	
	
	render(){
		return (
			<div>
				<CheckoutSummary 
					ingredients = {this.state.ingredients}
					checkoutCancelled = {this.checkoutCancelledHandler}
					checkoutContinued = {this.checkoutContinuedHandler}/>
				<Route  
					path = {this.props.match.path +'/contact-data'} 
					component={ContactData}/>
			</div>
		);
	}
}

export default Checkout;