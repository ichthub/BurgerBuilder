import React , {Component} from 'react';
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
import * as actionTypes from '../../Store/actions';


class BurgerBuilder extends Component{
	state = {
		purchasing : false,
		loading: false,
		error : false
	}
	//request data from firebase
	componentDidMount(){
		// console.log(this.props);
		// axios.get('https://burger-builder-7b394.firebaseio.com/ingredients.json')
		// .then(res =>{
		// 	this.setState({ingredients: res.data});
		// })
		// .catch(err => {
		// 	this.setState({error : true});
		// 	return err
		// });
	}

	updatedPurchaseState (ingredients) {

		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0 ;
	}

	purchasingHandler = () => {
		this.setState({purchasing : true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing : false});
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	}

	render(){
		const disabledInfo = {
			...this.props.ings
		};
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0
		}

		//because we fetch data from server we want to show our burger when the request is done or we will get error
		let orderSummary = null;
		let burger = this.state.error ? <Offline/> : <Spinner />;
		if(this.props.ings){
			burger = (
				<Auxi>
					<Burger ingredients = {this.props.ings}/>
					{/*enable order button with purchaseable*/}
					<BuildControls
						ingredientAdded = {this.props.onIngAdd}
						ingredientRemoved = {this.props.onIngRemove}
						disabled = {disabledInfo}
						purchaseable = {this.updatedPurchaseState(this.props.ings)}
						ordered = {this.purchasingHandler}
						price = {this.props.price}
					/>
				</Auxi>

			);

			orderSummary = (
				<OrderSummary
					ingredients ={this.props.ings}
					purchaseCancelled = {this.purchaseCancelHandler}
					purchaseContinued = {this.purchaseContinueHandler}
					price = {this.props.price}/>
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

const mapStateToProps = (state) => {//state
  return{
		ings: state.ingredients,
		price : state.totalPrice
	};
};
const mapDispatchToProps = (dispatch) => {//dispatch
  return{
		onIngAdd : (ingName) => dispatch ({type: actionTypes.ADD_INGREDIENT, ingredientName : ingName}),
		onIngRemove : (ingName) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName : ingName}),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios));//how to connect
