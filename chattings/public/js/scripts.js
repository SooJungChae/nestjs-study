const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStranger = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const chatForm = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username);
  socket.on('hello_user', (data) => {
    console.log(data);
  })
}

function init() {
  helloUser();
}

init();
