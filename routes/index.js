const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) =>{
	res.sendFile(path.resolve(__dirname, '../views/chat.html'));
});//tells which file to serve. this will route the URL
router.get('/chat', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

module.exports = router;