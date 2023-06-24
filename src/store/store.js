// import allReducers from './reducers/index.js';
// import {createStore} from 'redux';

// // const store = createStore(allReducers);

// const configureStore = () => {
//     return createStore(allReducers);
//   }

// export default configureStore;

import React, { Component } from "react";
import allReducers from './reducers/index.js';
import {createStore} from 'redux';

const store= createStore(allReducers);

export default store;
