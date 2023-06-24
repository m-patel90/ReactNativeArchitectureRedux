// import {combineReducers} from 'redux'
// import dataReducer from './dataReducer.js'

// const allReducers=combineReducers(
//     {
//         user : dataReducer,
//     }
// );

// export default allReducers;

import {combineReducers} from 'redux'
import dataReducer from './dataReducer.js'

const allReducers=combineReducers(
    {
        user : dataReducer,
    }
);

export default allReducers;