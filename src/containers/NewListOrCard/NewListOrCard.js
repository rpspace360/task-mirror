import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Modal, Button, Input, Form, Icon, Checkbox, Row, Col } from "antd";

class NewListOrCard extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      window.console.log(values, "lll");
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.addNewList(values.title, values.des);
        this.setState({ visible: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let descForm =
      this.props.itemType === "Card" ? (
        <Form.Item>
          {getFieldDecorator("des", {
            rules: [{ required: false, message: "Please input Description!" }]
          })(<Input.TextArea rows={2} placeholder="Description" />)}
        </Form.Item>
      ) : (
        ""
      );

    return (
      <div>
        <Button
          type="primary"
          size="large"
          icon="plus-circle"
          onClick={this.showModal}
        >
          {`Add Another ${this.props.itemType}`}
        </Button>
        <Modal
          title={`Add Another ${this.props.itemType}`}
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Please input title" }]
              })(<Input placeholder="Title" />)}
            </Form.Item>
            {descForm}

            <Form.Item>
              <Row gutter={[0, 3]}>
                <Col span={16}></Col>
                <Col span={4} style={{ marginRight: "5" }}>
                  <Button
                    type="primary"
                    onClick={() => this.setState({ visible: false })}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={4}>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
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
    addNewList: listTitle => dispatch(actions.addNewList(listTitle))
  };
};

NewListOrCard.propTypes = {};
const WrappedNewListOrCard = Form.create()(NewListOrCard);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNewListOrCard);