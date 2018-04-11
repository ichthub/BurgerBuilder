import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 7
				},
				valid: false,
				touched: false
			}
		}
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
		// if (rules.maxLenght) {
		// 	isValid = value.length <= rules.maxLenght && isValid;
		// 	//console.log('B', value.length);
		// }
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

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			//turn object to array
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const form = formElementsArray.map(formElement => (
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
		));
		return (
			<div className={classes.Auth}>
				<form>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
			</div>
		);
	}
}

export default Auth;
