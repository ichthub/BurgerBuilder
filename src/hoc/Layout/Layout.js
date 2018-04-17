import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PropTypes from 'prop-types';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};
	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};
	sideDrawerOpenHandeler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Auxi>
				<Toolbar
					triggeredMenu={this.sideDrawerOpenHandeler}
					isAuth={this.props.isAuthenticated}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Auxi>
		);
	}
}

Layout.propTypes = {
	showSideDrawer: PropTypes.bool
};

const mapStateToProps = state => {
	return { isAuthenticated: state.auth.token !== null };
};

export default connect(mapStateToProps)(Layout);
