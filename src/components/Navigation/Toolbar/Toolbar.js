import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrowerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
	<header className = {classes.Toolbar}>


		<DrowerToggle clicked = {props.triggeredMenu}/>

		<div className={classes.Logo}>
			<Logo/>
		</div>

		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuthenticated={props.isAuth}/>
		</nav>

	</header>
);

export default toolbar;
