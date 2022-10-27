const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStranger = getElementById('hello_stranger');
const chattingBox = getElementById('chatting_box');
const chatForm = getElementById('chat_form');

socket.on('user_connected', (username) => {
  console.log(`${username} connected`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawChat(`${username}: ${chat}`);
})

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    helloStranger.innerText = data;
  });
}

const drawChat = (chat) => {
  const chatBox = document.createElement('div');
  chatBox.innerText = chat;
  
  chatForm.append(chatBox);
};

const handleSubmit = (e) => {
  // submit 해서 refresh 되는 걸 방지
  e.preventDefault();
  
  const chatTarget = e.target.elements[0];
  const chat = chatTarget.value;
  if (chat === '') return;
  
  socket.emit('submit_chat', chat);
  
  drawChat(`current user: ${chat}`);
  chatTarget.value = '';
};

function init() {
  helloUser();
  chatForm.addEventListener('submit', handleSubmit);
}

init();
