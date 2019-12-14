import { handleActions, combineActions } from "redux-actions";

import {
	getAxiosCallError,
	getAxiosCallRequest,
	getAxiosCallSuccess,
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
		[combineActions(getAxiosCallRequest)](state) {
			return {
				...state,
				loading: true,
				errorMessage: null,
				loadingRequestCount: state.loadingRequestCount + 1,
				successMessage: null,
				error: false
			};
		},
		[combineActions(getAxiosCallSuccess)](state, action) {
			return {
				...state,
				loading: false,
				successMessage: action.payload && action.payload.successMessage
					? action.payload.successMessage
					: null,
				loadingRequestCount:
					state.loadingRequestCount < 1 ? 0 : state.loadingRequestCount - 1,
				error: false
			};
		},
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
