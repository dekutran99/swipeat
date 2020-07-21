import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../src/App';
import Room from '../../src/components/Room';


const router = express.Router();

const sendComponentFromServer = (htmlContent, res) => {
	const indexFile = path.resolve('./build/index.html');
	fs.readFile(indexFile, 'utf8', (err, data) => {
		if (err) {
			console.error('Something went wrong:', err);
			return res.status(500).send('Internal server error.');
		}
		return res.send(
			data.replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`)
		);
	});
}

/* GET home page. */
router.get('/', (req, res) => {
	const htmlContent = ReactDOMServer.renderToString(<App />);
	sendComponentFromServer(htmlContent, res);
});

router.get('/room', (req, res) => {
	if (req.query.room_id === undefined) {
		return res.status(400).send('Bad request.')
	}
	const htmlContent = ReactDOMServer.renderToString(<Room room_id={req.query.room_id} ssr='true'/>);
	sendComponentFromServer(htmlContent, res);
})


export default router;
