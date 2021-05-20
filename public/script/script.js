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
    // let formSubmit = document.getElementById("form-data");

    // formSubmit.addEventListener("submit", (e) => {
    //   let form = e.target
    //   const formData = new FormData(this);

    //   fetch("/server/server.js", {
    //     method: "POST",
    //     body: formData
    //   })
    //   form.submit();
    // });
    addMessage();    
  }
});

document.getElementById("send").addEventListener("click", addMessage);

function addMessage() {
  if (currentUser === undefined || "") {
    alert("Please select a username first.");
    return;
  }
  createMessage();
}

let messageCounter = 0;

function createMessage() {
  let messageVal = document.getElementById("msg-input").value;

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
  messageText.textContent = messageVal;
  messageContent.appendChild(messageText);
}
