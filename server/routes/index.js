import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../src/App';
import Room from '../../src/components/Room';

import {sendComponentFromServer} from '../functions/index.js';


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	const htmlContent = ReactDOMServer.renderToString(<App />);
	sendComponentFromServer(htmlContent, res);
});

router.get('/room', (req, res) => {
	if (req.query.room_id === undefined) {
		return res.status(400).send('Bad request.');
	}
	const htmlContent = ReactDOMServer.renderToString(<Room room_id={req.query.room_id} ssr='true' />);
	sendComponentFromServer(htmlContent, res);
})

// router.get('/places', (req, res) => {

// 	let requestOptions = {
// 		method: 'GET',
// 		redirect: 'follow'
// 	};

// 	// places api
// 	fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCMa_633zIvLQT2eqSMZY3q7uRXf5w7ZF0&location=49.284390, -123.128996&radius=1500&type=restaurant", requestOptions)
// 		.then(response => {
// 			if (response.ok) {
// 				return response.json();
// 			} else {
// 				return {};
// 			}
// 		}).then(data => {
// 			if (Object.keys(data).length === 0) {
// 				return res.send("Something is wrong");
// 			} else {
// 				return res.send(data['results']);
// 			}
// 		})
// })

export default router;
