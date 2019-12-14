import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as actions from "../../store/actions";
import { Row, Col,  Button } from 'antd';



const reorderArray = (list, startIndex, endIndex) => {
    const futureArray = Array.from(list);
    const [removed] = futureArray.splice(startIndex, 1);
    futureArray.splice(endIndex, 0, removed);

    return futureArray;
};



const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({

    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? 'lightgreen' : 'white',

    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgreen',
    padding: grid,
    
    display: 'flex',
   
  
  overflow: 'auto',
});

const getCildListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 150,
    border: 'solid',
    
});

class MyBoardView extends Component {
    state = {
        data: [{
            id: "1c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            listTilte: "TODO",
            cards: [{
                id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
                cardTitle: "Book Hotel",
                cardDes: "Get a Hoetl",

            },
            {
                id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
                cardTitle: "Book Bus",
                cardDes: "Get a Bus",
            }]
        },
        {
            id: "1b7b6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            listTilte: "PROGRESS",
            cards: [{
                id: "1b8d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
                cardTitle: "Meeting",
                cardDes: "Get a Meeting",

            },
            {
                id: "1b9d7bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
                cardTitle: "Book Bus",
                cardDes: "Get a Bus",
            }]
        }



        ]
    };



    getList = id => this.state[this.id2List[id]];

    getCardsArrayOfAList = id => this.props.boardData.find(element => element.id === id);

    onDragEnd = result => {
        window.console.log(result, "ada")
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorderArray(
                this.props.boardData,
                source.index,
                destination.index
            );



            this.props.reorderCurrList(items);
        } else {

        }
    };

    onCardDragEnd = result => {
        const { source, destination } = result;
        window.console.log(result)

        // dropped outside context area
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            window.console.log(this.getCardsArrayOfAList(source.droppableId))
            let targetList = this.getCardsArrayOfAList(source.droppableId)
            const cardsArray = reorderArray(
                this.getCardsArrayOfAList(source.droppableId) ? this.getCardsArrayOfAList(source.droppableId).cards : [],
                source.index,
                destination.index
            );
            let reorderedList = { ...targetList, cards: cardsArray }


            this.props.reorderCurrList(this.props.boardData.map(item => item.id === source.droppableId ? reorderedList
                : item));
        } else {

        }
    };

    render() {
        return (
            <React.Fragment>
            <Row>
            <Col span={20}>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal" >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.props.boardData.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.listTilte}
                                            <DragDropContext onDragEnd={this.onCardDragEnd}>
                                                <Droppable droppableId={item.id} >
                                                    {(childProvided, childSnapshot) => (
                                                        <div
                                                            ref={childProvided.innerRef}
                                                            style={getCildListStyle(childSnapshot.isDraggingOver)}>
                                                            {item.cards.map((childItem, childIndex) => (
                                                                <Draggable
                                                                    key={childItem.id}
                                                                    draggableId={childItem.id}
                                                                    index={childIndex}>
                                                                    {(childProvided, childSnapshot) => (
                                                                        <div
                                                                            ref={childProvided.innerRef}
                                                                            {...childProvided.draggableProps}
                                                                            {...childProvided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                childSnapshot.isDragging,
                                                                                childProvided.draggableProps.style
                                                                            )}>
                                                                            {childItem.cardTitle}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>
            </Col>
            <Col span={4}>
            <Button type="primary" size="large" icon="plus-circle">Add Another List</Button>
            </Col>
          </Row>
            
            </React.Fragment>
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
        reorderCurrList: (boardData) => dispatch(actions.reorderCurrList(boardData)),

    };
};

MyBoardView.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBoardView);

