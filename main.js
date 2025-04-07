// Constants
const API_URL = "https://api.cohere.com/v1/chat";
const API_KEY = "ANidsR77Z35GY7x9QtnfxmYGvebFOSnAuO3HgJGM"; // ⚠️ Replace with your API key

// Initialize speech recognition
let recognition;

// Start Speech Recognition (Speech-to-Text)
function startListening() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = async function(event) {
    const userText = event.results[0][0].transcript;
    getAIResponse(userText);
  };

  recognition.onerror = function(event) {
    console.error("Speech Error:", event.error);
  };
}

// Stop Speech Recognition
function stopListening() {
  if (recognition) {
    recognition.stop();
  }
}

// Call AI API to get a response
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
        message: userText + "response can be in 50 words in hindi language", //  Short response enforcement
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

// Convert AI Response to Speech (Text-to-Speech)
function speakText(text) {
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel(); // Cancel ongoing speech
  }

  responsiveVoice.speak(text, "Hindi Male", { rate: 1 }, { pitch: 1.8 });
}

// Toggle Listening State
function toggleFunction() {
  const onOffBtn = document.getElementById('onOffBtn'); // Ensure to set this button element id
  if (onOffBtn.textContent === "🎙️ Speak Now") {
    onOffBtn.textContent = "⏹️ Stop Listening";
    startListening(); // Start voice recognition
  } else {
    stopListening(); // Stop voice recognition
  }
}
