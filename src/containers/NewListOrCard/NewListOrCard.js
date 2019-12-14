import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Modal, Button, Input, Form, Row, Col } from "antd";

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
        this.props.itemType === "Card"
          ? this.props.addNewCard(values.title, values.des, this.props.listId)
          : this.props.addNewList(values.title, values.des);
        this.setState({ visible: false });
      }
    });
    this.props.form.resetFields();
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
        <center>
          <Button
            type="primary"
            size="default"
            icon="plus-circle"
            style={{ margin: "10px" }}
            onClick={this.showModal}
          >
            {`Add New ${this.props.itemType}`}
          </Button>
        </center>
        <Modal
          title={`Add ${this.props.itemType}`}
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
    addNewList: listTitle => dispatch(actions.addNewList(listTitle)),
    addNewCard: (cardTitle, cardDes, listId) =>
      dispatch(actions.addNewCard(cardTitle, cardDes, listId))
  };
};

NewListOrCard.propTypes = {};
const WrappedNewListOrCard = Form.create()(NewListOrCard);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNewListOrCard);
