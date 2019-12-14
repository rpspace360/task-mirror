import { createAction } from "redux-actions";
import { getAxiosCallError, getAxiosCallRequest, getAxiosCallSuccess } from "./commonActions.js";
import { uuid } from 'uuidv4';
import axios from "axios";


let MockAdapter = require('axios-mock-adapter');
let mock = new MockAdapter(axios, { delayResponse: 200 });
export const boardSetState = createAction("BOARD_SET_STATE")
export const boardResetState = createAction("BOARD_RESET_STATE")
export const boardAddListState = createAction("BOARD_ADDLIST_STATE")
// window.localStorage.setItem(
// 	"my-task-mirror-data",
	
//   );
let storedTaskMirrorData = window.localStorage.getItem(
	"my-task-mirror-state"
	
  ) ? window.localStorage.getItem(
	"my-task-mirror-state"): ""

// window.console.log(JSON.parse(storedTaskMirrorData))
const responses = [
	['GET',  '/board/data', 200, { data: []}],
	['POST', '/board/list/add', 200],
	['POST', '/board/card/add', 200],
	
  ];

// Match ALL requests
mock.onAny().reply(config => {
	const [method, url, ...response] = responses.shift();
	if (config.url === url && config.method.toUpperCase() === method) return response;
	// Unexpected request, error out
	return [200, {}];
  });


export const reorderCurrList = (nextListStatus) => {
	return dispatch => {
		dispatch(boardResetState({
			data: nextListStatus
		}))
		return Promise.resolve()
	}
}


export const addNewList = (listTilte, id=uuid()) => {
	return dispatch => {
		
		let url = `/board/list/add`
		axios.post(url)
			.then(response => {
				dispatch(boardAddListState({listTilte:listTilte, id:id}))
				
			})
			.catch(err => {
				dispatch(getAxiosCallError(err));
			});
	};
}
