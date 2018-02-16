(() => {
	const socket = io();

	let messageList = document.querySelector('ul'),
		chatForm = document.querySelector('form'),
		chatMessage = chatForm.querySelector('.message'),
		nameInput = document.querySelector('.nickName'),
		nickName = null;
		console.log(nameInput, nickName);

	function handleSendMessage(e) {
		e.preventDefault();//block the default behaviour of the parent (page refresh)
		// debugger;
		//ternerary statement.. shorthand for if/else
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
		messageList.innerHTML += newMsg;
	}

	function setNickname() {
		nickName = this.value;
	}

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);//listneing from server
	socket.addEventListener('disconnect message', appendDiscMessage, false);//listneing from server
	//socket events can be called whatever you want



})();