
const express = require('express'); 
const app = express(); 
const io = require('socket.io')();

app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));

const server = app.listen(3000, () => {
	console.log('listening on Port 3000');
});

io.attach(server); 
io.on('connection', socket => { 
	console.log('a user has connected');
	io.emit('chat message', {for: 'everyone', message: `${socket.id} is here`});

//this is the function that allows chat messages to be shot back and forth along the socket.io string
socket.on('chat message', msg => {
	console.log('message: ', msg);
	io.emit('chat message', { for: 'everyone', message: msg});
});

	socket.on('disconnect',() => {
		console.log('a user has disconnected');//when the browser window closes this will log in the console
		io.emit('disconnect message', `${socket.id} is gone`);
	});

});