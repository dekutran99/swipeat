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


export default router;
