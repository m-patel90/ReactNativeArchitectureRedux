/* eslint-disable prettier/prettier */
/* global fetch */

import fetchival from 'fetchival';
import store from '../../store/store.js';
import { getVerifiedKeys } from '../session/credentials.js'
import _ from 'lodash';


import apiConfig from './config';


export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const callRefreshApi = async (endPoint, payload = {}, method = 'get', headers = {}) => {
	console.log("callRefresh Api : " + endPoint+" - "+JSON.stringify(payload));
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: headers,
	})[method.toLowerCase()](payload)
		.catch((e) => {
			if (e.response && e.response.json) {
				e.response.json().then((json) => {
					if (json) throw json;
					throw e;
				});
			} else {
				throw e;
			}
		});
};

// Fetch APi without header
export const callApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	console.log("Call Api : " + endPoint+" - "+JSON.stringify(payload));
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: headers,
	})[method.toLowerCase()](payload)
		.catch((e) => {
			if (e.response && e.response.json) {
				e.response.json().then((json) => {
					if (json) throw json;
					throw e;
				});
			} else {
				throw e;
			}
		});
};

// Fetch Api with header data (sessionid,api_token)
export const fetchApi = async (endPoint, payload = {}, method = 'get', headers = {}) => {
	const result2 = await getVerifiedKeys();

	console.log(""+result2);

	console.log("Params : " + endPoint+" - "+JSON.stringify(payload));

	const accessToken = store.getState().user.token;
	// const sessioniId = store.getState().user.refreshToken;

	console.log(" fetchApi token : " + accessToken);
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: _.pickBy({
			...(accessToken ? {
				Authorization: `Bearer ${accessToken}`,
				// token: `${accessToken}`,
				// refreshToken:`${sessioniId}`,

				'Content-Type': 'application/json',
				'Accept': 'application/json'
				// Authorization: `Bearer ${accessToken}`,
			} : {}),
			...headers,
		}, item => !_.isEmpty(item)),



	})[method.toLowerCase()](payload)
		.catch((e) => {
			if (e.response && e.response.json) {
				e.response.json().then((json) => {
					if (json) throw json;
					throw e;
				});
			} else {
				throw e;
			}
		});

};
