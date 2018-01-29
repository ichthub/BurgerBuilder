import React from 'react'; 
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	
	let transIngred = Object.keys(props.ingredients).map(igKey => {//transform my object into array
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key = {igKey + i} type = {igKey} />; 
		});	//return a BurgerIngredient component based on the values of my object property
	}).reduce((arr, el)=>{ return arr.concat(el) }, []);
	//reduce here is to serve if there is no ingredients want to for adding them <p>Please Start adding Ingredients</p>
	if(transIngred.length ===0){
		transIngred = <p>Please Start adding Ingredients</p>;
	}
    return (
		<div className = {classes.Burger}>
			<BurgerIngredient type = 'bread-top' />
			{transIngred}
			<BurgerIngredient type = 'bread-bottom' />
		</div>
	);
}; 

export default burger;