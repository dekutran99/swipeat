import express from 'express';
import router from './routes/index';
import http from 'http';
import createError from 'http-errors';
import WebSocket from 'ws';


const app = express();
const PORT = 3000;
const server = http.createServer(app);


app.use('/', router);

app.use(express.static('./build'));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });


// WebSocket handler
const wss = new WebSocket.Server({
	server: server,
	path: '/room'
})

wss.on('connection', () => {
	console.log('A user connected.')

});

// start server
server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});


export {
	app,
	server
};