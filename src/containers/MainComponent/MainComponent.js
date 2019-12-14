import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import MyBoardView from "../Board/MyBoardView";


import HorizontalPane from "../../components/TaskMirror/HorizontalPane/HorizontalPane";



import "./MainComponent.scss";


const { Header, Content, Footer, Sider } = Layout;

class MainComponent extends Component {



	render() {
		if (true) {
			return this.renderWhenLoggedIn();
		}
	}

	renderWhenLoggedIn() {
		return (
			<React.Fragment>
				<Layout>
					
						<HorizontalPane />
						
					
					<Layout>

						<Content style={{ backgroundColor: 'lightgreen', height: "600px" }}>
							<Switch>
								<Redirect exact from="/" to="/board/" />
								<Redirect exact from="/login" to="/board/" />

								<Route path="/board/" exact component={MyBoardView} />

							</Switch>
						</Content>

					</Layout>
				</Layout>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {

	};
};

MainComponent.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
