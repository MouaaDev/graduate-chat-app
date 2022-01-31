// Grab DOM elements
const username = document.getElementById("username")
const message = document.getElementById("message")
const form = document.querySelector("form")
const chatBox = document.querySelector(".chat-box")

const socket = io()

socket.on("message", (msg) => {
  const el = document.createElement("div")
  el.innerHTML = `<div class="message-box">
                    <span>${msg.user}</span>
                    <p>${msg.text}</p>
                  </div>`
  chatBox.appendChild(el)
  chatBox.scrollTo(0, chatBox.scrollHeight)
})

// Send the messages
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const msg = { text: message.value.trim(), user: username.value }
  if (msg.text) {
    socket.emit("message", msg)
  }
  message.value = ""
  message.focus()
})

// Clear inputs whenever the page reloads
document.body.onload = () => {
  username.value = ""
  message.value = ""
  message.focus()
}
