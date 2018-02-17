import React , {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControles/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios_orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/ErrorHandler/withError';
import Offline from '../../components/Burger/Offline/Offline';


const INGR_PR = { //glabal var
	salad : 2,
	cheese : 1,
	meat : 4,
	bacon: 3
}

class BurgerBuilder extends Component{
	state = {
		
		ingredients: null,
		totalPrice : 10,
		purchaseable: false,
		purchasing : false,
		loading: false,
		error : false
	}
	//request data from firebase
	componentDidMount(){
		axios.get('https://burger-builder-7b394.firebaseio.com/ingredients.json')
		.then(res =>{
			this.setState({ingredients: res.data});
		})
		.catch(err => {
			this.setState({error : true});
			return err
		});
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
		//alert ('You Continue!');
		this.setState({loading: true});
		const order = {
			ingredients : this.state.ingredients,
			price: this.state.totalPrice,
			customer:{
				name: 'Hassan Houmaid',
				addresse: {
					street: 'taghdirt center',
					zipCode: '1234',
					country: 'Morocco'
				},
				email: 'test@test.com'
		},
			deliveryMethod : 'fastest'
		}
		
		axios.post('/orders.json', order)
			.then(response => {
			//if request is done we want to stop loading and close model
				this.setState({loading: false, purchasing: false});
			})
			.catch(error => {
			//if request is done we want to stop loading and close model
				
				this.setState({loading: false, purchasing: false});
			});
		
	}
	
	
	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0
		}
		
		//because we fetch data from server we want to show our burger when the request is done or we will get error
		let orderSummary = null;
		let burger = this.state.error ? <Offline/> : <Spinner />;
		if(this.state.ingredients){
			burger = (
				<Auxi> 
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
		
			orderSummary = (
				<OrderSummary 
					ingredients ={this.state.ingredients}
					purchaseCancelled = {this.purchaseCancelHandler}
					purchaseContinued = {this.purchaseContinueHandler}
					price = {this.state.totalPrice}/>
			);
		}
		if(this.state.loading){
			orderSummary = <Spinner />;
		}
		
		return(
			<Auxi>
				<Modal show = {this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxi>
		
		);
	}
}

export default withError(BurgerBuilder, axios);