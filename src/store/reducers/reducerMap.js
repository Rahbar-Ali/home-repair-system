import { SET_LOCATION } from '../actions/actionTypes';

const initialState = {
    latitude: 10.2,
    longitude: 15.5,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:    
        // console.log('SET_LOCATION case invoke values: latitude= '+.latitude+' long: '+state.longitude);
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude,
            };
        default:
            // console.log('Default Run ResurcerMap.js file');
            return state;
    }
}
export default reducer;