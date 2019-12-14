import { handleActions } from "redux-actions";

const board = {

	data: [{
		id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
		listTilte: "TODO",
		cards: [{
			id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
			cardTitle: "Book Hotel",
			cardDes: "Don't sleep on footpath",

		},
		{
			id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
			cardTitle: "Book Bus",
			cardDes: "Can't Hire Cab",
		}]
	},
	{
		id: "1b9b6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
		listTilte: "PROGRESS",
		cards: [{
			id: "1b8d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4eed",
			cardTitle: "Meeting",
			cardDes: "Goto Meeting",

		},
		{
			id: "1b9d7bcd-bbfd-4b2d-9b5d-ab8dfdbd4eed",
			cardTitle: "Read Book",
			cardDes: "Continous Learning",
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
			// window.console.log(newList)

			return { data: [...state.data, newList] }
		},
		BOARD_ADDCARD_STATE: (state, action) => {
			let targetList = state.data.find(item => item.id === action.payload.listId)
			window.console.log(targetList, "dasdas", action)
			if(targetList){
				let newCard = {
					id:action.payload.id,
					cardTitle: action.payload.cardTitle,
					cardDes: action.payload.cardDes

				}
				targetList.cards = [...targetList.cards, newCard]
				return { data: state.data.map(item => item.id === action.payload.listId ? targetList : item ) }
			}
			
			
		},
		BOARD_CLEAR_STATE: () => {
			return {data : []}
		}
	},
	board
);

export default boardReducer;