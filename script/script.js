let currentUser;

document
  .getElementById("submit-username")
  .addEventListener("click", function (e) {
    e.preventDefault();
    (currentUser = document.getElementById("user-name-input").value),
      (modalDisplay = document.getElementById("modal-popup"));

    if (currentUser == "") {
      console.log("Please enter a username");
    } else {
      modalDisplay.style.display = "none";
    }
  });

class Message {
  constructor(user, message) {
    this.user = user;
    this.message = message;
  }
}

document.getElementById("msg-input").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    addMessage();
  };
});

document.getElementById("send").addEventListener("click", addMessage);

function addMessage() {
  if (currentUser === undefined || "") {
    alert("Please select a username first.");
    return
  }
  let messageVal = document.getElementById("msg-input").value;
  let messageContainer = document.getElementById("msgs-container");
  let newMessage = document.createElement("div");
  newMessage.className = "message-wrap";
  newMessage.id = "msg-wrap";
  messageContainer.appendChild(newMessage);

  let message = new Message(currentUser, messageVal);

  console.log(message);

  document.getElementById("msg-input").value = "";
}
