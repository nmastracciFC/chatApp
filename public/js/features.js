(()=>{
const socket = io();
var user;
var setName = document.querySelector('#setName');


function setUsername() {
	socket.emit('setUsername', document.querySelector('#username').value); 
};
socket.on('userExists', function(data){
	document.querySelector('#errorMsg').innerHTML = data;
});
socket.on('userSet', function(data){
	user = data.username; 
	console.log(user);debugger;
	document.body.innerHTML = '<input type="text" id="message"><button type="button" name="button" onclick="sendMessage()">SEND</button><div id="message-container"></div>';
});
function sendMessage(){
	var msg = document.querySelector('#message').value;
	if(msg) {
		socket.emit('msg', {message: msg, user: user});
	}
}
socket.on('newmsg', function(data){
	if(user) {
		document.querySelector('#message-container').innerHTML += '<div><b>'+data.user+'</br>:'+data.message+'</div>';
	}
})

setName.addEventListener("click", setUsername, false);
})();