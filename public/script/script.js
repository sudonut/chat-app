let currentUser;
let allMessages = [];

document.getElementById("submit-username").addEventListener("click", function (e) {
    e.preventDefault();
    (currentUser = document.getElementById("user-name-input").value),
    (modalDisplay = document.getElementById("modal-popup"));
    if (currentUser == "") {
      alert("Please enter a username");
    } else {
      modalDisplay.style.display = "none";
    }
  });

let socket = io();

let form = document.getElementById("form-data");
let input = document.getElementById("msg-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

let messageCounter = 0;

socket.on("chat message", (msg) => {
  // Create new Message wrapper
  let msgWindow = document.getElementById("msgs-container");
  let msgWrap = document.createElement("div");
  msgWrap.className = "message-wrap";
  let newId = (msgWrap.id = "msg" + messageCounter++);
  allMessages.push(newId);
  msgWindow.appendChild(msgWrap);

  let currentId = allMessages.slice(-1)[0];

  //Display user name
  let messageContent = document.getElementById(currentId);
  let userItem = document.createElement("h3");
  userItem.textContent = currentUser;
  userItem.className = "user-name";
  messageContent.appendChild(userItem);

  //Display user message
  let msgItem = document.createElement("p");
  msgItem.className = "message-text";
  msgItem.textContent = msg;
  messageContent.appendChild(msgItem);
  msgWindow.scrollTo(0, document.body.scrollHeight);
})