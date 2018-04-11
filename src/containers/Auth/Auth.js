import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../Store/actions/index';

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
		},
		isSignUp: true
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}
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

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignUp: !prevState.isSignUp };
		});
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
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
					<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
						Switch To {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
					</Button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp))
	};
};

export default connect(null, mapDispatchToProps)(Auth);