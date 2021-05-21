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

document.getElementById("msg-input").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addMessage();    
  }
});

document.getElementById("send").addEventListener("click", addMessage);

function addMessage() {
  if (currentUser === undefined || "") {
    alert("Please select a username first.");
    return;
  }
}

let messageCounter = 0;

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

socket.on("chat message", (msg) => {
  console.log("TESTING THIS MESSAGE SEND")
  // Create new Message container
  let messageContainer = document.getElementById("msgs-container");
  let newMessageDiv = document.createElement("div");
  newMessageDiv.className = "message-wrap";
  let newId = (newMessageDiv.id = "msg" + messageCounter++);
  allMessages.push(newId);
  messageContainer.appendChild(newMessageDiv);

  let currentId = allMessages.slice(-1)[0];

  //Display user name
  let messageContent = document.getElementById(currentId);
  let userDisplay = document.createElement("h3");
  userDisplay.textContent = currentUser;
  userDisplay.className = "user-name";
  messageContent.appendChild(userDisplay);

  //Display user message
  let messageText = document.createElement("p");
  messageText.className = "message-text";
  messageText.textContent = msg;
  messageContent.appendChild(messageText);
})