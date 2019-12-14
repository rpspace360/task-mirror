import { createAction } from "redux-actions";
import {
  getAxiosCallError,
} from "./commonActions.js";
import { uuid } from "uuidv4";
import axios from "axios";

let MockAdapter = require("axios-mock-adapter");
let mock = new MockAdapter(axios, { delayResponse: 200 });
export const boardResetState = createAction("BOARD_RESET_STATE");
export const boardAddListState = createAction("BOARD_ADDLIST_STATE");
export const boardAddCardState = createAction("BOARD_ADDCARD_STATE");
export const clearBoardState = createAction("BOARD_CLEAR_STATE");

export const resetBoardDataState = createAction("BOARD_SET_DEFAULT_STATE");

const responses = [
  ["GET", "/board/data", 200, { data: [] }],
  ["POST", "/board/list/add", 200],
  ["POST", "/board/card/add", 200],
  ["POST", "/board/delete", 200],
  ["POST", "/board/reset", 200]
];

// Match ALL requests
mock.onAny().reply(config => {
  const [method, url, ...response] = responses.shift();
  if (config.url === url && config.method.toUpperCase() === method)
    return response;
  // Unexpected request, error out
  return [200, {}];
});

export const reorderCurrList = nextListStatus => {
  return dispatch => {
    dispatch(
      boardResetState({
        data: nextListStatus
      })
    );
    window.localStorage.setItem(
      "my-task-mirror-state",
      JSON.stringify(nextListStatus)
    );
    return Promise.resolve();
  };
};

export const addNewList = (listTilte, id = uuid()) => {
  return dispatch => {
    let url = `/board/list/add`;
    axios
      .post(url)
      .then(response => {
        dispatch(boardAddListState({ listTilte: listTilte, id: id }));
      })
      .catch(err => {
        dispatch(boardAddListState({ listTilte: listTilte, id: id }));
      });
  };
};

export const addNewCard = (cardTitle, cardDes, listId, id = uuid()) => {
  return dispatch => {
    window.console.log("comming addNew", cardTitle, cardDes, listId);

    let url = `/board/card/add`;
    axios
      .post(url)
      .then(response => {
        window.console.log("comming res addNew", cardTitle, cardDes, listId);
        dispatch(
          boardAddCardState({
            cardTitle: cardTitle,
            cardDes: cardDes,
            listId: listId,
            id: id
          })
        );
      })
      .catch(err => {
        dispatch(
          boardAddCardState({
            cardTitle: cardTitle,
            cardDes: cardDes,
            listId: listId,
            id: id
          })
        );
        dispatch(getAxiosCallError(err));
      });
  };
};
export const clearBoardData = () => {
  return dispatch => {
    let url = `/board/delete`;
    axios
      .post(url)
      .then(response => {
        dispatch(clearBoardState());
      })
      .catch(err => {
        dispatch(clearBoardState());

        dispatch(getAxiosCallError(err));
      });
  };
};
export const resetBoardData = () => {
  return dispatch => {
    let url = `/board/reset`;
    axios
      .post(url)
      .then(response => {
        dispatch(resetBoardDataState());
      })
      .catch(err => {
        dispatch(resetBoardDataState());

        dispatch(getAxiosCallError(err));
      });
  };
};
