const express = require('express'); //include the express object

const app = express(); //instaniate new express object

app.get('/', (req, res) =>{
	res.sendFile(__dirname + '/index.html');
});//tells which file to serve. this will route the URL
app.get('/contact', (req, res) =>{
	res.sendFile(__dirname + '/contact.html');
});


app.listen(3000, ()=> {
	console.log('listening on Port 3000');
});//where are we serving it.. this consoles out to the terminal and not the browser