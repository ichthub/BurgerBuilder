import React, {Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios_orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		addresse: {
			street:'',
			postalCode:'',
		},
		loading: false,
	}

	orderHandler = (event) =>{
		event.preventDefault();
		//console.log(this.props.ingredients);
		this.setState({loading: true});
		const order = {
			ingredients : this.props.ingredients,
			price: this.props.price,
			customer:{
				name: 'Hassan Houmaid',
				addresse: {
					street: 'Ghandi',
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
				this.setState({loading: false});
				this.props.history.push('/');//after sending data to the server u will be redirected to /
			})
			.catch(error => {
			//if request is done we want to stop loading and close model

				this.setState({loading: false});
			});
	}

	render () {
		let form = (
			<form>
				<input className = {classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className = {classes.Input} type="email" name="email" placeholder="Your Email" />
				<input className = {classes.Input} type="text" name="street" placeholder="Street" />
				<input className = {classes.Input} type="text" name="postal" placeholder="Postal Code" />
				<Button btnType = "Success" clicked = {this.orderHandler}>ORDER</Button>
			</form>
		);
		if(this.state.loading){
			form = <Spinner />
		}
		return (
			<div className = {classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
				</div>

		);

	}

}

export default ContactData;
