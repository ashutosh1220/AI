const API_URL = "https://api.cohere.com/v1/chat";
const API_KEY = "ANidsR77Z35GY7x9QtnfxmYGvebFOSnAuO3HgJGM";

let recognition;

function startListening() {

  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel(); // Cancel ongoing speech
  }

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = async function (event) {
    const userText = event.results[0][0].transcript;
    getAIResponse(userText);
  };

  recognition.onerror = function (event) {
    console.error("Speech Error:", event.error);
  };
}


function stopListening() {
  if (recognition) {
    recognition.stop();
  }
}


function speakText(text) {
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel(); // Cancel ongoing speech
  }
  setTimeout(() => {
    responsiveVoice.speak(text, "Hindi Male", { rate: 1, pitch: 1.2 });
  }, 50);

  setTimeout(() => {
    bot.style.backgroundImage = "url(ring.jpg)";
    document.querySelector('.stand').style.backgroundImage = "url(ring.jpg)";
  }, 100);
}


async function getAIResponse(userText) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "command-r",
        message: userText + "short answer in 20 words.",
        temperature: 0.3
      })
    });


    const data = await response.json();

    if (data.text) {
      let shortResponse = data.text.split(" ").slice(0, 50).join(" "); // Limit to 50 words
      speakText(shortResponse);
    } else {
      console.error("AI Response Error:", data);
    }
  } catch (error) {
    console.error("API Error:", error.message);
  }
}

const onOffBtn = document.getElementById('onoffbtn'),
  left_eye = document.getElementById('left_eye'),
  right_eye = document.getElementById('right_eye'),
  left_hand = document.querySelector('.left_hand'),
  right_hand = document.querySelector('.right_hand'),
  head = document.querySelector('.head'),
  antennaBall = document.querySelectorAll('.ball'),
  bot = document.querySelector('.bot'),
  mask = document.querySelector('.mask'),
  stand = document.querySelector('.stand'),
  askbtn = document.getElementById("askbtn");
on = onOffBtn.style.boxShadow,
  off = 'inset -2px -2px 4px black, inset 2px 2px 4px black, 1px 1px 40px rgb(255, 0, 0), 1px 1px 30px rgb(0, 0, 0, 0.7)';

onOffBtn.style.boxShadow = off;
dismental();

function dismental() {
  requestAnimationFrame(() => {
    Object.assign(left_eye.style, { animation: 'none', height: '1%' });
    Object.assign(right_eye.style, { animation: 'none', height: '1%' });
    Object.assign(head.style, { transition: 'all 0.5s ease', top: '12%' });
    Object.assign(left_hand.style, { transition: 'all 0.5s ease' });
    Object.assign(right_hand.style, { transition: 'all 0.5s ease' });
    Object.assign(stand.style, { boxShadow: 'inset -2px -2px 20px rgb(100, 100, 0, 0.8), inset 2px 2px 30px black, inset 1px 1px 60px rgb(170, 0, 100)' });
    Object.assign(askbtn.style, {display : 'none'});

    left_antenna.style.transform = 'rotate(80deg)';
    right_antenna.style.transform = 'rotate(-80deg)';

    antennaBall.forEach(ball => Object.assign(ball.style, { height: '0%', width: '0%', border: 'none' }));

    setTimeout(() => {
      Object.assign(left_hand.style, { left: '30%', top: '37%' });
      Object.assign(right_hand.style, { right: '30%', top: '37%' });
    }, 500);

    setTimeout(() => mask.style.top = '22%', 700);

    bot.style.backgroundImage = "url(ring.jpg)";
    document.querySelector('.stand').style.backgroundImage = "url(ring.jpg)";
    responsiveVoice.cancel();
  });

  stopListening();
}

function assemble() {
  requestAnimationFrame(() => {
    Object.assign(left_eye.style, { animation: 'blink 3s infinite' });
    Object.assign(right_eye.style, { animation: 'blink 3s infinite' });
    mask.style.top = '2%';

    setTimeout(() => {
      Object.assign(left_hand.style, { transition: 'all 0.5s ease', left: '20%', top: '35%' });
      Object.assign(right_hand.style, { transition: 'all 0.5s ease', right: '20%', top: '35%' });

      setTimeout(() => {
        setTimeout(() => left_antenna.style.transform = 'rotate(20deg)', 500);
        right_antenna.style.transform = 'rotate(-20deg)';
      }, 400);
    }, 500);

    antennaBall.forEach(ball => Object.assign(ball.style, { height: '16.5%', width: '255%', border: '3px solid white' }));

    Object.assign(head.style, { transition: 'all 0.5s ease', top: '8%' });
    Object.assign(stand.style, { boxShadow: 'inset -2px -2px 20px rgb(0, 100, 100, 0.1), inset 2px 2px 30px black, inset 1px 1px 60px rgb(0, 255, 200)' });

    Object.assign(askbtn.style, {display : 'flex'});

    askbtn.addEventListener('click', () => {

      if (on === onOffBtn.style.boxShadow || askbtn.style.display === 'flex') {
        bot.style.backgroundImage = "url(wave.gif)";
        document.querySelector('.stand').style.backgroundImage = "url(wave.gif)";

        startListening();
      }
      // else {
      //   bot.style.backgroundImage = "url(ring.jpg)";
      //   document.querySelector('.stand').style.backgroundImage = "url(ring.jpg)";
      // }
    })
  });
}

setTimeout(() => onOffBtn.addEventListener('click', toggleFunction, { once: true }), 1500);

function toggleFunction() {
  requestAnimationFrame(() => {
    if (onOffBtn.style.boxShadow === on) {
      Object.assign(onOffBtn.style, { boxShadow: off, height: '30%', width: '30%', backgroundImage: "url(offcharge.jpg)", animation: 'none' });
      dismental();
    } else {
      Object.assign(onOffBtn.style, { boxShadow: on, height: '40%', width: '40%', animation: 'rotate 200s infinite', backgroundImage: "url(fan.jpeg)" });
      assemble();
    }
  });

  setTimeout(() => onOffBtn.addEventListener('click', toggleFunction, { once: true }), 1500);
} 
