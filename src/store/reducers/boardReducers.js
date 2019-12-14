import { handleActions } from "redux-actions";

// usinng localStorage to store board data so that it will persist
// even after the browser window has been closed.
let storedTaskMirrorData = window.localStorage.getItem("my-task-mirror-state");

const defaultDataStore = [
  {
    id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    listTilte: "TODO",
    cards: [
      {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
        cardTitle: "Book Hotel",
        cardDes: "Don't sleep on footpath"
      },
      {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
        cardTitle: "Book Bus",
        cardDes: "Can't Hire Cab"
      }
    ]
  },
  {
    id: "1b9b6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    listTilte: "PROGRESS",
    cards: [
      {
        id: "1b8d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
        cardTitle: "Meeting",
        cardDes: "Goto Meeting"
      },
      {
        id: "1b9d7bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
        cardTitle: "Read Book",
        cardDes: "Continous Learning"
      }
    ]
  }
];

const board = {
  data: storedTaskMirrorData
    ? JSON.parse(storedTaskMirrorData)
    : defaultDataStore
};

const boardReducer = handleActions(
  {
    BOARD_RESET_STATE: (state, action) => {
      return { ...state, ...action.payload };
    },
    BOARD_ADDLIST_STATE: (state, action) => {
      let newList = {
        id: action.payload.id,
        listTilte: action.payload.listTilte,
        cards: []
      };
      let updatedState = [...state.data, newList];
      window.localStorage.setItem(
        "my-task-mirror-state",
        JSON.stringify(updatedState)
      );

      return { data: updatedState };
    },
    BOARD_ADDCARD_STATE: (state, action) => {
      let targetList = state.data.find(
        item => item.id === action.payload.listId
      );
      window.console.log(targetList, "dasdas", action);
      if (targetList) {
        let newCard = {
          id: action.payload.id,
          cardTitle: action.payload.cardTitle,
          cardDes: action.payload.cardDes
        };
        targetList.cards = [...targetList.cards, newCard];
        let updatedState = state.data.map(item =>
          item.id === action.payload.listId ? targetList : item
        );
        window.localStorage.setItem(
          "my-task-mirror-state",
          JSON.stringify(updatedState)
        );

        return { data: updatedState };
      }
    },
    BOARD_CLEAR_STATE: () => {
      window.localStorage.setItem("my-task-mirror-state", "");
      return { data: [] };
    },
    BOARD_SET_DEFAULT_STATE: () => {
      return { data: defaultDataStore };
    }
  },
  board
);

export default boardReducer;
