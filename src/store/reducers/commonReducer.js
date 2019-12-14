import { handleActions, combineActions } from "redux-actions";

import {
	getAxiosCallError,

} from "../actions/commonActions";


const commonstate = {
	loading: false,
	error: false,
	loadingRequestCount: 0,
	errorMessage: null,
	successMessage: null
};

const commonReducer = handleActions(
	{
		
		[combineActions(getAxiosCallError)](state, action) {
			if (action.payload.response) {
				return {
					...state,
					error: true,
					loading: false,
					successMessage: null,
					statusCode: action.payload.response.status
				};
			} else {
				return {
					...state,
					error: true,
					
					loading: false,
					statusCode: null,
					successMessage: null
				};
			}
		}
	},
	commonstate
);

export default commonReducer;
