const numberInput = document.getElementById('number');
const textInput = document.getElementById('msg');
const button = document.getElementById('button');
const response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data) {
    response.innerHTML =
        `
            <h5>Text message send to ${data.number}</h5>
            <p>Message Cost: $${data.msgPrice}</p>
            <p>Remaining Balance: $${data.remainBalance}</p>
        `;
});

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(function(res) {
        console.log(res)
    })
    .catch(function(err) {
        console.log(err);
    })
}