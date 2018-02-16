(() => {
	const socket = io();

	let messageList = document.querySelector('ul'),
		chatForm = document.querySelector('form'),
		chatMessage = chatForm.querySelector('.message'),
		nameInput = document.querySelector('.username'),
		nickName = null;
		console.log(socket);
		

	// const toChat = document.querySelector('#setName');

	// function scrollToChat(e){
	// 	e.preventDefault();
	// TweenLite.to(window, 2, {scrollTo:{y:"#chatroom"}, ease:Power2.easeInOut, onComplete: goAway});
	// }
	// function goAway(){
	// 	var signIn = document.querySelector('#signIn');
	// 	signIn.style.display = "none";
	// }

	function handleSendMessage(e) {
		e.preventDefault();
		// debugger;
		nickName = (nickName && nickName.length >0) ? nickName : 'user';
		msg = `${nickName} says ${chatMessage.value}`;
		socket.emit('chat message', msg);
		chatMessage.value = "";
		return false;

	}

	function appendMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg.message}</li>`;//message is an object
		messageList.innerHTML += newMsg;//makes a list item and appends to container
	}

	function appendDiscMessage(msg) {
		// debugger;
		let newMsg = `<li>${msg}</li>`;//this does not include an object it's just a string
		newMsg += messageList.innerHTML;
	}

	function setNickname() {
		nickName = this.value;
	}

	// toChat.addEventListener("click", scrollToChat, false);
	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);//listneing from server
	socket.addEventListener('disconnect message', appendDiscMessage, false);//listneing from server
	//socket events can be called whatever you want



})();