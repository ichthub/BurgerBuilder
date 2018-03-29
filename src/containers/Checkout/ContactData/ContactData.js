import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios_orders';
import Input from '../../../components/UI/Input/Input';
import withError from '../../../hoc/ErrorHandler/withError';
import * as actions from '../../../Store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: false
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLenght: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'fastest',
				validation: {}, //avoid error in checkValidity func
				valid: true
			}
		},
		formIsValid: false
	};

	orderHandler = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(order);
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		} //just another lyer of security to validation object

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLenght) {
			isValid = value.length >= rules.minLenght && isValid;
			//console.log('A', value.length);
		}
		if (rules.maxLenght) {
			isValid = value.length <= rules.maxLenght && isValid;
			//console.log('B', value.length);
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		// inputIdentifier = object keys
		const updatedOrderForm = {
			//copy orderForm object to updatedOrderForm
			...this.state.orderForm
		};
		const updatedFormElement = {
			//deep copy of object
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		//console.log(updatedFormElement);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formValidCheker = true;
		for (let inputIdentifier in updatedOrderForm) {
			formValidCheker =
				updatedOrderForm[inputIdentifier].valid && formValidCheker;
		}
		//console.log(formValidCheker);
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formValidCheker
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			//turn object to array
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	//state
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};
const mapDispatchToProps = dispatch => {
	//state
	return {
		onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withError(ContactData, axios)
);
