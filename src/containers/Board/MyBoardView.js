import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as actions from "../../store/actions";
import { Popover } from "antd";

import NewListOrCard from "../NewListOrCard/NewListOrCard";
import "./MyBoardView.scss"

const reorderArray = (list, startIndex, endIndex) => {
  const futureArray = Array.from(list);
  const [removed] = futureArray.splice(startIndex, 1);
  futureArray.splice(endIndex, 0, removed);

  return futureArray;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "white",

  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "green" : "lightgreen",
  padding: grid,


  display: "flex",

  overflow: "auto"
});

const getCildListStyle = isDraggingOver => ({
  background: isDraggingOver ? "green" : "lightgrey",
  padding: grid,
  width: 200,
  minHeight: 200,
  border: "0.5px solid",
  wordWrap: "break-word"
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class MyBoardView extends Component {
  state = {
    data: [
      {
        id: "1c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        listTilte: "TODO",
        cards: [
          {
            id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
            cardTitle: "Book Hotel",
            cardDes: "Get a Hoetl"
          },
          {
            id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
            cardTitle: "Book Bus",
            cardDes: "Get a Bus"
          }
        ]
      },
      {
        id: "1b7b6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        listTilte: "PROGRESS",
        cards: [
          {
            id: "1b8d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
            cardTitle: "Meeting",
            cardDes: "Get a Meeting"
          },
          {
            id: "1b9d7bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
            cardTitle: "Book Bus",
            cardDes: "Get a Bus"
          }
        ]
      }
    ]
  };

  getCardsArrayOfAList = id =>
    this.props.boardData.find(element => element.id === id);

  onDragListEnd = result => {
    window.console.log(result, "ada");
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
  onDragEndHandler = result => {
    window.console.log(result, "arrr");
    const { destination, type } = result;
    if (!destination) {
      return;
    }
    if (type === "CARD") {
      this.onCardDragEnd(result);
    } else if (type === "LIST") {
      this.onDragListEnd(result);
    }
  };

  onCardDragEnd = result => {
    const { source, destination } = result;
    window.console.log(result);

    // dropped outside context area
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      window.console.log(this.getCardsArrayOfAList(source.droppableId));
      let targetList = this.getCardsArrayOfAList(source.droppableId);
      const cardsArray = reorderArray(
        this.getCardsArrayOfAList(source.droppableId)
          ? this.getCardsArrayOfAList(source.droppableId).cards
          : [],
        source.index,
        destination.index
      );
      let reorderedList = { ...targetList, cards: cardsArray };

      this.props.reorderCurrList(
        this.props.boardData.map(item =>
          item.id === source.droppableId ? reorderedList : item
        )
      );
    } else {
      let targetList = this.getCardsArrayOfAList(source.droppableId);
      let destinationList = this.getCardsArrayOfAList(destination.droppableId);
      const newResult = move(
        targetList.cards,
        destinationList.cards,
        source,
        destination
      );
      let reorderedList1 = {
        ...targetList,
        cards: newResult[`${source.droppableId}`]
      };
      let reorderedList2 = {
        ...destinationList,
        cards: newResult[`${destination.droppableId}`]
      };

      this.props.reorderCurrList(
        this.props.boardData.map(item => {
          if (item.id === source.droppableId) return reorderedList1;
          if (item.id === destination.droppableId) return reorderedList2;
          return item;
        })
      );
    }
  };

  render() {
    return (
      <React.Fragment>

            <DragDropContext onDragEnd={this.onDragEndHandler}>
              <Droppable
                droppableId="droppable"
                direction="horizontal"
                type="LIST"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.props.boardData.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            
                            {/* <DragDropContext onDragEnd={this.onCardDragEnd}> */}
                            <Droppable droppableId={item.id} type="CARD">
                              {(childProvided, childSnapshot) => (
                                  <React.Fragment>
                                <div
                                  ref={childProvided.innerRef}
                                  style={getCildListStyle(
                                    childSnapshot.isDraggingOver
                                  )}
                                >
                                <span><center>{item.listTilte}</center></span>
                                  {item.cards.map((childItem, childIndex) => (
                                    
                                    <Draggable
                                      key={childItem.id}
                                      draggableId={childItem.id}
                                      index={childIndex}
                                    >
                                      {(childProvided, childSnapshot) => (
                                        <Popover content={childItem.cardDes} title={childItem.cardTitle} trigger="click">
                                        <div
                                          ref={childProvided.innerRef}
                                          {...childProvided.draggableProps}
                                          {...childProvided.dragHandleProps}
                                          style={getItemStyle(
                                            childSnapshot.isDragging,
                                            childProvided.draggableProps.style
                                          )}
                                        >
                                          <span><center>{childItem.cardTitle}</center></span>
                                        </div>
                                        </Popover>
                                      )}
                                    </Draggable>
                                     
                                  ))}
                                  {provided.placeholder}
                                  
                                </div>
                                <NewListOrCard itemType="Card" listId={item.id}></NewListOrCard>
                                </React.Fragment>
                              )}
                            </Droppable>
                            {/* </DragDropContext> */}
                            
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <NewListOrCard itemType="List"></NewListOrCard>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
         
    
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
    reorderCurrList: boardData => dispatch(actions.reorderCurrList(boardData))
  };
};

MyBoardView.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyBoardView);
