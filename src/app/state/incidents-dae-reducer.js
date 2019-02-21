import * as ActionTypes from './action-types';

const INITIAL_STATE = {
    isDataAvailable: false,
	incidentsData: {},
}

export default function incidentsDaeReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case ActionTypes.LOAD_INCIDENTS_DAE_DATA_SUCCESS:
            return {
                ...state,
                incidentsData: action.payload,
                isDataAvailable: true
            };
        
        // case ActionTypes.INCIDENTS_DAE_DATA_INVALID:
        //     return {
        //         ...state,
        //         incidentsData:{},
        //         isDataAvailable:false
        //     }
            
        default: 
            return state;
    }
}