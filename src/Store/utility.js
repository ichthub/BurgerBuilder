export const updateObj = (oldObj, updatedProps) => {
	return {
		...oldObj,
		...updatedProps
	};
};
