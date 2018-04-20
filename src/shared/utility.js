export const updateObj = (oldObj, updatedProps) => {
	return {
		...oldObj,
		...updatedProps
	};
};

export const checkValidity = (value, rules) => {
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
};
