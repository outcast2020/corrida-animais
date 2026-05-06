const animals = [
  {
    number: 1,
    name: "Rato",
    hanzi: "鼠",
    pinyin: "shǔ",
    emoji: "🐭",
    color: "#d9482b",
    bg: "#ffad7a",
    story: "Pegou carona no Boi · 牛 · niú e saltou na frente.",
    narrator: "1º — Rato: quem percebeu a chance e saltou primeiro?"
  },
  {
    number: 2,
    name: "Boi",
    hanzi: "牛",
    pinyin: "niú",
    emoji: "🐂",
    color: "#c28a20",
    bg: "#ffd166",
    story: "Atravessou firme e chegou em segundo.",
    narrator: "2º — Boi: quem carregou o Rato · 鼠 · shǔ e cruzou com firmeza?"
  },
  {
    number: 3,
    name: "Tigre",
    hanzi: "虎",
    pinyin: "hǔ",
    emoji: "🐯",
    color: "#ea580c",
    bg: "#ff9f43",
    story: "Venceu a correnteza com força e rapidez.",
    narrator: "3º — Tigre: quem venceu a correnteza com coragem?"
  },
  {
    number: 4,
    name: "Coelho",
    hanzi: "兔",
    pinyin: "tù",
    emoji: "🐰",
    color: "#db2777",
    bg: "#f9a8d4",
    story: "Pulou por pedras e troncos até a margem.",
    narrator: "4º — Coelho: quem pulou por pedras e troncos?"
  },
  {
    number: 5,
    name: "Dragão",
    hanzi: "龙",
    pinyin: "lóng",
    emoji: "🐉",
    color: "#65a30d",
    bg: "#bef264",
    story: "Parou para ajudar uma aldeia trazendo chuva.",
    narrator: "5º — Dragão: quem demorou porque ajudou uma aldeia com chuva?"
  },
  {
    number: 6,
    name: "Serpente",
    hanzi: "蛇",
    pinyin: "shé",
    emoji: "🐍",
    color: "#9333ea",
    bg: "#d8b4fe",
    story: "Escondeu-se e surpreendeu o Cavalo · 马 · mǎ.",
    narrator: "6º — Serpente: quem apareceu de surpresa perto do Cavalo · 马 · mǎ?"
  },
  {
    number: 7,
    name: "Cavalo",
    hanzi: "马",
    pinyin: "mǎ",
    emoji: "🐴",
    color: "#0284c7",
    bg: "#7dd3fc",
    story: "Quase chegou antes, mas levou um susto.",
    narrator: "7º — Cavalo: quem quase chegou antes, mas levou um susto?"
  },
  {
    number: 8,
    name: "Cabra",
    hanzi: "羊",
    pinyin: "yáng",
    emoji: "🐐",
    color: "#0f766e",
    bg: "#5eead4",
    story: "Trabalhou em equipe para atravessar.",
    narrator: "8º — Cabra: quem cooperou para atravessar o rio?"
  },
  {
    number: 9,
    name: "Macaco",
    hanzi: "猴",
    pinyin: "hóu",
    emoji: "🐒",
    color: "#c2410c",
    bg: "#fdba74",
    story: "Ajudou o grupo a seguir pelo rio.",
    narrator: "9º — Macaco: quem ajudou o grupo com agilidade?"
  },
  {
    number: 10,
    name: "Galo",
    hanzi: "鸡",
    pinyin: "jī",
    emoji: "🐓",
    color: "#ca8a04",
    bg: "#fde68a",
    story: "Cooperou para encontrar o melhor caminho.",
    narrator: "10º — Galo: quem ajudou a encontrar o caminho?"
  },
  {
    number: 11,
    name: "Cão",
    hanzi: "狗",
    pinyin: "gǒu",
    emoji: "🐕",
    color: "#2563eb",
    bg: "#93c5fd",
    story: "Parou para tomar banho no rio.",
    narrator: "11º — Cão: quem parou para tomar banho?"
  },
  {
    number: 12,
    name: "Porco",
    hanzi: "猪",
    pinyin: "zhū",
    emoji: "🐖",
    color: "#e11d48",
    bg: "#fda4af",
    story: "Parou para comer e dormir antes da chegada.",
    narrator: "12º — Porco: quem parou para comer e dormir?"
  }
];

const state = {
  playerName: "",
  selectedCards: [],
  currentIndex: 0,
  audio: null,
  musicOn: false
};

const $ = (selector) => document.querySelector(selector);
const landing = $("#landing");
const game = $("#game");
const final = $("#final");
const pickGrid = $("#pick-grid");
const cardsGrid = $("#cards-grid");
const currentCall = $("#current-call");
const currentHint = $("#current-hint");
const progressBar = $("#progress-bar");
const message = $("#message");
const river = $("#river");
const arrivedList = $("#arrived-list");
const musicToggle = $("#music-toggle");

const animalLabel = (animal) => `${animal.name} · ${animal.hanzi} · ${animal.pinyin}`;
const animalShortLabel = (animal) => `${animal.name} (${animal.hanzi}, ${animal.pinyin})`;

function init() {
  renderPickButtons();
  renderCards();
  bindEvents();
  updateNarrator();
}

function bindEvents() {
  $("#start-form").addEventListener("submit", startGame);
  $("#random-pick").addEventListener("click", randomPick);
  $("#clear-pick").addEventListener("click", clearPick);
  $("#reset-game").addEventListener("click", resetToLanding);
  $("#play-again").addEventListener("click", resetToLanding);
  musicToggle.addEventListener("click", toggleMusic);
}

function renderPickButtons() {
  pickGrid.innerHTML = "";
  animals.forEach((animal) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pick-number";
    button.dataset.number = animal.number;
    button.innerHTML = `
      <span class="pick-number-value">${animal.number}</span>
      <span class="pick-number-name">${animal.name}</span>
      <span class="pick-number-animal">${animal.hanzi}</span>
      <span class="pick-number-pinyin">${animal.pinyin}</span>
    `;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `Cartão ${animal.number}: ${animalLabel(animal)}`);
    button.title = `${animal.number} — ${animalLabel(animal)}`;
    button.addEventListener("click", () => togglePick(animal.number, button));
    pickGrid.appendChild(button);
  });
}

function renderCards() {
  cardsGrid.innerHTML = "";
  animals.forEach((animal) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.number = animal.number;
    card.style.setProperty("--card-color", animal.color);
    card.style.setProperty("--card-bg", animal.bg);
    card.setAttribute("aria-label", `Cartão ${animal.number}: ${animalLabel(animal)}. Ainda não revelado.`);

    card.innerHTML = `
      <span class="card-inner">
        <span class="card-face card-back">
          <span class="card-number">${animal.number}</span>
          <span class="card-back-label">Corrida do Zodíaco</span>
        </span>
        <span class="card-face card-front">
          <span class="card-front-top">
            <span class="arrival-badge">${animal.number}º</span>
            <span class="my-badge" hidden>Meu cartão</span>
          </span>
          <span class="animal-stage" aria-hidden="true">
            <span class="animal-aura"></span>
            <span class="animal-orbit orbit-one"></span>
            <span class="animal-orbit orbit-two"></span>
            <span class="animal-shadow"></span>
            <span class="animal-emoji">${animal.emoji}</span>
          </span>
          <span class="card-info">
            <span class="pt-name">${animal.name}</span>
            <span class="hanzi">${animal.hanzi}</span>
            <span class="pinyin">${animal.pinyin}</span>
            <span class="caption">${animal.story}</span>
          </span>
        </span>
      </span>
    `;

    card.addEventListener("click", () => handleCardClick(animal.number, card));
    cardsGrid.appendChild(card);
  });
}

function togglePick(number, button) {
  const alreadySelected = state.selectedCards.includes(number);
  if (alreadySelected) {
    state.selectedCards = state.selectedCards.filter((item) => item !== number);
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
    return;
  }

  if (state.selectedCards.length >= 3) {
    flashPickLimit();
    return;
  }

  state.selectedCards.push(number);
  button.classList.add("selected");
  button.setAttribute("aria-pressed", "true");
}

function flashPickLimit() {
  const panel = document.querySelector(".pick-panel");
  panel.classList.remove("shake");
  void panel.offsetWidth;
  panel.classList.add("shake");
}

function randomPick() {
  clearPick();
  const shuffled = [...animals].sort(() => Math.random() - 0.5).slice(0, 3);
  shuffled.forEach((animal) => {
    const button = document.querySelector(`.pick-number[data-number="${animal.number}"]`);
    togglePick(animal.number, button);
  });
}

function clearPick() {
  state.selectedCards = [];
  document.querySelectorAll(".pick-number").forEach((button) => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });
}

function startGame(event) {
  event.preventDefault();
  const input = $("#player-name");
  state.playerName = input.value.trim() || "Participante";

  $("#player-label").textContent = `${state.playerName} · ${selectedLabel()}`;
  markMyCards();
  state.currentIndex = 0;
  updateNarrator();
  showScreen(game);
  setMessage("Ouça o narrador. Clique apenas no próximo animal da corrida.", "ok");
}

function selectedLabel() {
  if (!state.selectedCards.length) return "modo livre";
  const list = state.selectedCards
    .sort((a, b) => a - b)
    .map((number) => {
      const animal = animals.find((item) => item.number === number);
      return `${number}: ${animalLabel(animal)}`;
    })
    .join("; ");
  return `meus cartões: ${list}`;
}

function markMyCards() {
  document.querySelectorAll(".card").forEach((card) => {
    const number = Number(card.dataset.number);
    const isMine = state.selectedCards.includes(number);
    card.classList.toggle("my-card", isMine);
    const badge = card.querySelector(".my-badge");
    if (badge) badge.hidden = !isMine;
  });
}

function handleCardClick(number, card) {
  const expected = animals[state.currentIndex];
  if (!expected || card.classList.contains("revealed")) return;

  if (number !== expected.number) {
    wrongChoice(card, expected);
    return;
  }

  correctChoice(card, expected);
}

function wrongChoice(card, expected) {
  card.classList.remove("shake");
  void card.offsetWidth;
  card.classList.add("shake");
  playErrorTone();
  setMessage(`Ainda não! Agora precisa ser o ${expected.number}º: ${animalShortLabel(expected)}.`, "error");
}

function correctChoice(card, animal) {
  card.classList.add("revealed", "arrived", "celebrate");
  card.setAttribute("aria-label", `Cartão ${animal.number}: ${animalLabel(animal)}. Revelado.`);
  animateAnimal(animal);
  playSuccessTone();
  setMessage(`Muito bem! ${animalShortLabel(animal)} atravessou o rio.`, "ok");
  window.setTimeout(() => card.classList.remove("celebrate"), 900);

  state.currentIndex += 1;
  updateProgress();

  setTimeout(() => {
    addArrivedToken(animal);
    if (state.currentIndex >= animals.length) {
      finishGame();
    } else {
      updateNarrator();
    }
  }, 900);
}

function updateNarrator() {
  const animal = animals[state.currentIndex];
  if (!animal) return;
  currentCall.textContent = animal.narrator.replace(`${animal.number}º — ${animal.name}`, `${animal.number}º — ${animalLabel(animal)}`);
  currentHint.textContent = `${animalLabel(animal)} · ${animal.story}`;
}

function updateProgress() {
  const progress = (state.currentIndex / animals.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function animateAnimal(animal) {
  const traveler = document.createElement("span");
  traveler.className = "traveler";
  traveler.style.setProperty("--traveler-color", animal.color);
  traveler.style.setProperty("--traveler-bg", animal.bg);
  traveler.style.top = `${35 + Math.random() * 28}%`;
  traveler.innerHTML = `
    <span class="traveler-ring"></span>
    <span class="traveler-emoji">${animal.emoji}</span>
    <span class="traveler-ripple ripple-one"></span>
    <span class="traveler-ripple ripple-two"></span>
    <span class="traveler-splash splash-a"></span>
    <span class="traveler-splash splash-b"></span>
  `;
  river.appendChild(traveler);
  traveler.addEventListener("animationend", () => traveler.remove(), { once: true });
}

function addArrivedToken(animal) {
  const token = document.createElement("span");
  token.className = "arrived-token";
  token.style.setProperty("--token-color", animal.color);
  token.style.setProperty("--token-bg", animal.bg);
  token.innerHTML = `
    <span class="arrived-token-emoji">${animal.emoji}</span>
    <span class="arrived-token-text">
      <span>${animal.hanzi}</span>
      <span>${animal.pinyin}</span>
    </span>
  `;
  token.setAttribute("aria-label", `${animal.number}º ${animalLabel(animal)}`);
  token.title = `${animal.number}º ${animalLabel(animal)}`;
  arrivedList.appendChild(token);
  celebrateArrival(animal);
}

function celebrateArrival(animal) {
  const bank = document.querySelector(".bank-right");
  const burst = document.createElement("span");
  burst.className = "arrival-burst";
  burst.style.setProperty("--burst-color", animal.color);
  burst.textContent = animal.emoji;
  bank.appendChild(burst);
  burst.addEventListener("animationend", () => burst.remove(), { once: true });
}

function finishGame() {
  const finalMessage = $("#final-message");
  finalMessage.textContent = `${state.playerName}, a corrida terminou! O Imperador de Jade recebeu todos os animais.`;

  const finalAnimals = $("#final-animals");
  finalAnimals.innerHTML = "";
  animals.forEach((animal) => {
    const chip = document.createElement("span");
    chip.className = "final-chip";
    chip.innerHTML = `
      <span>${animal.number}º</span>
      <span>${animal.emoji}</span>
      <span class="final-chip-text">
        <span>${animal.name}</span>
        <span>${animal.hanzi} · ${animal.pinyin}</span>
      </span>
    `;
    finalAnimals.appendChild(chip);
  });

  setTimeout(() => showScreen(final), 700);
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function showScreen(screen) {
  [landing, game, final].forEach((section) => section.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetToLanding() {
  state.currentIndex = 0;
  setMessage("");
  progressBar.style.width = "0%";
  arrivedList.innerHTML = "";
  cardsGrid.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("revealed", "arrived", "shake", "celebrate");
    const number = Number(card.dataset.number);
    const animal = animals.find((item) => item.number === number);
    card.setAttribute("aria-label", `Cartão ${number}: ${animalLabel(animal)}. Ainda não revelado.`);
  });
  updateNarrator();
  showScreen(landing);
}

function createAudioEngine() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.035;
  master.connect(context.destination);

  let timer = null;
  let step = 0;

  // Escala pentatônica maior em Sol: G A B D E.
  // A melodia é original, curta e gerada no navegador.
  const notes = [392, 440, 494, 587, 659, 587, 494, 440, 392, 494, 587, 440];

  function pluck(frequency, time, duration = 0.32) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, time);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.9, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + duration + 0.03);
  }

  function startLoop() {
    if (timer) return;
    const tick = () => {
      if (context.state === "suspended") context.resume();
      const now = context.currentTime;
      pluck(notes[step % notes.length], now);
      if (step % 4 === 0) pluck(notes[(step + 4) % notes.length] / 2, now, 0.5);
      step += 1;
    };
    tick();
    timer = window.setInterval(tick, 420);
  }

  function stopLoop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function tone(frequency, duration = 0.18, volume = 0.06) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    osc.stop(context.currentTime + duration + 0.02);
  }

  return { context, startLoop, stopLoop, tone };
}

function ensureAudio() {
  if (!state.audio) state.audio = createAudioEngine();
  return state.audio;
}

function toggleMusic() {
  const audio = ensureAudio();
  if (!audio) {
    setMessage("Este navegador não ativou o áudio WebAudio.", "error");
    return;
  }

  state.musicOn = !state.musicOn;
  if (state.musicOn) {
    audio.context.resume();
    audio.startLoop();
    musicToggle.textContent = "♪ Música ligada";
    musicToggle.setAttribute("aria-pressed", "true");
  } else {
    audio.stopLoop();
    musicToggle.textContent = "♪ Música";
    musicToggle.setAttribute("aria-pressed", "false");
  }
}

function playSuccessTone() {
  const audio = ensureAudio();
  if (!audio) return;
  audio.context.resume();
  audio.tone(660, 0.12, 0.04);
  window.setTimeout(() => audio.tone(880, 0.18, 0.035), 110);
}

function playErrorTone() {
  const audio = ensureAudio();
  if (!audio) return;
  audio.context.resume();
  audio.tone(220, 0.16, 0.035);
}

init();
