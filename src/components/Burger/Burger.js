import React from 'react'; 
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	
	let transIngred = Object.keys(props.ingredients).map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key = {igKey + i} type = {igKey} />;
		});	
	}).reduce((arr, el)=>{ return arr.concat(el) }, []);
	
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