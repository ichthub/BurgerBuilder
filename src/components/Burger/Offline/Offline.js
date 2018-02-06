import React from 'react';
import sad from '../../../assets/images/sad.png';
import classes from './Offline.css';

const offLine = (props) => (
	<div className={classes.Offline}>
		<img src ={sad} alt = "I am Sad"/>
	</div>

);

export default offLine;