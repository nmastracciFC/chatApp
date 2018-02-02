
const express = require('express'); //include the express object
const app = express(); //instaniate new express object
const io = require('socket.io')();//the round brackets instantiate it

//serve up static js and css  files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));


// app.get('/', (req, res) =>{
// 	res.sendFile(__dirname + '/index.html');
// });//tells which file to serve. this will route the URL
// app.get('/contact', (req, res) =>{
// 	res.sendFile(__dirname + '/contact.html');
// });


const server = app.listen(3000, () => {//making this a const gives socket a thing to listen to
	console.log('listening on Port 3000');
});//where are we serving it.. this consoles out to the terminal and not the browser

io.attach(server); //this attaches socket to the server and lets it know that it has to listen for messages back and forth


io.on('connection', socket => { 
	console.log('a user has connected');
	io.emit('chat message', {for: 'everyone', message: `${socket.id} is here`});

	socket.on('disconnect',() => {
		console.log('a user has disconnected');//when the browser window closes this will log in the console
		io.emit('disconnect message', `${socket.id} is gone`);
	});

});