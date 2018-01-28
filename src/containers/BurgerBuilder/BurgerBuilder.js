import React , {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGR_PR = { //glabal var
	salad : 2,
	cheese : 1,
	meat : 4,
	bacon: 3
}

class BurgerBuilder extends Component{
	state = {
		ingredients: {
			salad : 0,
			bacon : 0,
			cheese: 0,
			meat: 0
		},
		totalPrice : 10,
		purchaseable: false,
		purchasing : false
	}
	
	updatedPurchaseState (ingredients) {
		
		const sum = Object.keys(ingredients)
			.map(igKey => {	
				return ingredients[igKey];
			})
			.reduce((sum, el) => { 
				return sum + el;
			}, 0);
		
		this.setState({purchaseable : sum > 0});
	}
	
	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGR_PR[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		
		this.setState({ totalPrice : newPrice, ingredients : updatedIngredients });
		this.updatedPurchaseState(updatedIngredients);
	}
	
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) return; //preventing Error when no ingredient
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGR_PR[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		
		this.setState({ totalPrice : newPrice, ingredients : updatedIngredients });
		this.updatedPurchaseState(updatedIngredients);
	}
	
	purchasingHandler = () => {
		this.setState({purchasing : true});
	}
	
	purchaseCancelHandler = () => {
		this.setState({purchasing : false});
	}
	
	purchaseContinueHandler = () => {
		alert ('You Continue!');
	}
	
	
	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0
		}
		
		return(
			<Auxi>
				<Modal show = {this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
					<OrderSummary 
						ingredients ={this.state.ingredients}
						purchaseCancelled = {this.purchaseCancelHandler}
						purchaseContinued = {this.purchaseContinueHandler}
						price = {this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients = {this.state.ingredients}/>
				<BuildControls 
					ingredientAdded = { this.addIngredientHandler}
					ingredientRemoved = { this.removeIngredientHandler}
					disabled = {disabledInfo}
					purchaseable = {this.state.purchaseable}
					ordered = {this.purchasingHandler}
					price = {this.state.totalPrice}
				/>
				
			</Auxi>
		
		);
	}
}

export default BurgerBuilder;