import React from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import * as actions from "../../../store/actions";

const SubMenu = Menu.SubMenu;

class HorizontalPane extends React.Component {

	state = {
		current: "list"
	}
	handleClick = e => {
		this.setState({
			current: e.key
		});
	};
	
	render() {
		return (
			<div>
				<Menu
					
					theme="dark"
					onClick={this.handleClick}
					selectedKeys={[this.state.current]}
					mode="horizontal"
				
				>
					

					<SubMenu title={<span><Icon type="book" />Task Mirror</span>} >
						
						
					</SubMenu>
					<SubMenu title={<span onClick={() => this.props.clearBoardData()}><Icon type="delete" />Clear Board Store</span>} >
						
						
					</SubMenu>



				</Menu>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
	  boardData: state.board.data
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
	  clearBoardData: () => dispatch(actions.clearBoardData())
	};
  };
  
  HorizontalPane.propTypes = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(HorizontalPane);
  
