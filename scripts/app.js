// DOM queries
const list = document.querySelector('.chat-list');
const form = document.querySelector('.new-chat');
const nameForm = document.querySelector('.new-name');
const chats = document.querySelector('.chat-rooms');
const chatsBtn = document.querySelectorAll('.chat-rooms .btn');

    function tab(){    
        for(let i = 0; i < chatsBtn.length; i++){
            chatsBtn[i].classList.add('remove');
            chatsBtn[i].classList.remove('black');
        }   
    }

// Event Listeners

chats.addEventListener('click', e => {
    let chatSelected = e.target.getAttribute('id');
    
    tab();
    e.target.classList.add('black');

    chatroom.updateRoom(chatSelected);
    chatUI.clear();
    // get chats 
    chatroom.getChat((data) => { chatUI.render(data);
});
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let message = form.message.value.trim();
    chatroom.addChat(message).then(() => {
        form.reset();
    });
    
});

nameForm.addEventListener('submit', e => {
    e.preventDefault();
    let name = nameForm.name.value.trim();
    localStorage.setItem('name' , name);
    chatroom.updateUser(name);
    nameForm.reset();
});

let currentUser = localStorage.getItem('name');

// Instances
const chatroom = new Chatroom("general" , currentUser);
const chatUI = new ChatUI(list);

