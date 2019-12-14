import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";


import MyBoardView from "../Board/MyBoardView";

import HorizontalPane from "../../components/TaskMirror/HorizontalPane/HorizontalPane";

import "./MainComponent.scss";

const { Content } = Layout;

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
            <Content style={{ backgroundColor: "lightgreen", height: "600px" }}>
              <MyBoardView />
            </Content>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

MainComponent.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
