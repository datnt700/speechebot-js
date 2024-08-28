const btn = document.querySelector('.btn');
const textArea = document.querySelector('.area');
var synth = window.speechSynthesis;
var voiceSelectLanguage = document.querySelector('.voice-item.select.language');
var voiceSelectPerson = document.querySelector('.voice-item.select.person');

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (i = 0; i < voices.length; i++) {
    var optionLanguage = document.createElement('option');
    var optionPerson = document.createElement('option');

    optionLanguage.textContent = voices[i].lang;
    optionPerson.textContent = voices[i].name;
    optionLanguage.setAttribute('data-lang', voices[i].lang);
    optionPerson.setAttribute('data-name', voices[i].name);

    voiceSelectLanguage.appendChild(optionLanguage);
    voiceSelectPerson.appendChild(optionPerson);
  }
}
var voiceFound = false;

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

let selectedPitch = 1;

const spans = document.querySelectorAll('.number span');
spans.forEach((span) => {
  span.addEventListener('click', function hanldePitch() {
    spans.forEach((s) => s.classList.remove('active'));

    this.classList.add('active');
    const value = this.textContent;
    const text = value.split('x');
    selectedPitch = parseFloat(text[0]);
  });
});

btn.addEventListener('click', function speak() {
  var selectedOptionLanguage =
    voiceSelectLanguage.selectedOptions[0].getAttribute('data-lang');
  var selectedOptionPerson =
    voiceSelectPerson.selectedOptions[0].getAttribute('data-name');
  var utterance = new SpeechSynthesisUtterance(textArea.value);

  for (i = 0; i < voices.length; i++) {
    if (
      voices[i].lang === selectedOptionLanguage &&
      voices[i].name === selectedOptionPerson
    ) {
      voiceFound = true;

      utterance.voice = voices[i];
      break;
    }
  }
  utterance.pitch = selectedPitch;
  console.log(selectedPitch);

  synth.speak(utterance);
});
