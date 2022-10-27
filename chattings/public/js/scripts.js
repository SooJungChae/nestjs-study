const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStranger = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const chatForm = getElementById('chat_form');

socket.on('user_connected', (username) => {
  console.log(`${username} connected`);
})

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    helloStranger.innerText = data;
  });
}

function init() {
  helloUser();
}

init();
