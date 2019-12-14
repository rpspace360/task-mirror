import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";

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
					<SubMenu title={<span><Icon type="delete" />Clear Board</span>} >
						
						
					</SubMenu>



				</Menu>
			</div>
		);
	}
}

export default HorizontalPane;
