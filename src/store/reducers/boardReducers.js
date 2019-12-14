import { handleActions } from "redux-actions";

const board = {

	data: [{
		id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
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
		id: "1b9b6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
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
}

const boardReducer = handleActions(
	{
		BOARD_RESET_STATE: (state, action) => {
			return { ...state, ...action.payload }
		},
		BOARD_ADDLIST_STATE: (state, action) => {
			let newList = {
				id: action.payload.id,
				listTilte: action.payload.listTilte,
				cards: []
			}
			window.console.log(newList)

			return { data: [...state.data, newList] }
		}
	},
	board
);

export default boardReducer;