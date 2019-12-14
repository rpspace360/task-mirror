import { createAction } from "redux-actions";
export const boardSetState = createAction("BOARD_SET_STATE")
export const boardResetState = createAction("BOARD_RESET_STATE")


export const reorderCurrList = (nextListStatus) => {
	return dispatch => {
		dispatch(boardResetState({
			data: nextListStatus
		}))
		return Promise.resolve()
	}
}
