// ======== DŹWIĘKI – REFERENCJE ========
const sClick = document.getElementById("soundClick");
const sHover = document.getElementById("soundHover");
const sCorrect = document.getElementById("soundCorrect");
const sWrong = document.getElementById("soundWrong");
const sNext = document.getElementById("soundNext");
const sBg = document.getElementById("bgMusic");

let soundEnabled = true;
let audioUnlocked = false;

// ======== ODBLOKOWANIE AUDIO ========
function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;

  [sClick, sHover, sCorrect, sWrong, sNext, sBg].forEach((sound) => {
    if (!sound) return;
    const originalVolume = sound.volume || 1;
    sound.volume = 0;
    sound
      .play()
      .then(() => {
        setTimeout(() => {
          sound.pause();
          sound.currentTime = 0;
          sound.volume = originalVolume;
        }, 50);
      })
      .catch(() => {
        sound.volume = originalVolume;
      });
  });
}

document.addEventListener("click", unlockAudio, { once: true });

// ======== FUNKCJA ODTWARZANIA ========
function play(sound) {
  if (!soundEnabled || !sound) return;
  if (!audioUnlocked) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

// ======== AUDIO PANEL ========
const audioToggleBtn = document.getElementById("audioToggleBtn");

if (audioToggleBtn) {
  audioToggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    audioToggleBtn.textContent = soundEnabled ? "🔊 Dźwięk: włączony" : "🔈 Dźwięk: wyłączony";
    if (soundEnabled && audioUnlocked && sBg) {
      sBg.volume = 0.25;
      sBg.play().catch(() => {});
    } else if (sBg) {
      sBg.pause();
    }
  });
}

// ======== OGÓLNY DŹWIĘK KLIKNIĘCIA + PULS ========
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("pulse");
    setTimeout(() => e.target.classList.remove("pulse"), 200);
    play(sClick);
  }
});

// ======== DŹWIĘK HOVER ========
document.addEventListener("mouseover", (e) => {
  if (!audioUnlocked) return;
  if (
    e.target.classList.contains("nav-btn") ||
    e.target.classList.contains("filter-btn") ||
    e.target.classList.contains("quiz-option") ||
    e.target.classList.contains("card") ||
    e.target.classList.contains("knowledge-tile")
  ) {
    play(sHover);
  }
});

// ======== DANE: MAPA WIEDZY ========

const knowledgeModules = [
  {
    id: "tissues",
    title: "Tkanki",
    label: "Budulec ciała",
    summary: "Cztery podstawowe typy tkanek tworzą wszystkie narządy organizmu.",
    description:
      "Tkanki to grupy komórek o podobnej budowie i funkcji. Mamy nabłonkową, łączną, mięśniową i nerwową. Z nich powstają wszystkie narządy."
  },
  {
    id: "blood",
    title: "Krew",
    label: "Transport i odporność",
    summary: "Płynna tkanka łączna – przewozi tlen, składniki odżywcze i broni przed patogenami.",
    description:
      "Krew składa się z osocza oraz erytrocytów, leukocytów i trombocytów. Transportuje tlen, składniki odżywcze, hormony i usuwa odpady."
  },
  {
    id: "lymph",
    title: "Limfa",
    label: "Oczyszczanie i odporność",
    summary: "Układ limfatyczny filtruje patogeny i usuwa odpady z tkanek.",
    description:
      "Limfa zbiera płyny i odpady z tkanek, filtruje patogeny w węzłach chłonnych, wspiera odporność i transport tłuszczów."
  },
  {
    id: "hormones",
    title: "Hormony",
    label: "Sterowniki organizmu",
    summary: "Chemiczne komunikaty, które mówią komórkom, co mają robić i kiedy.",
    description:
      "Hormony regulują metabolizm, sen, stres, wzrost, dojrzewanie i inne procesy. Wydzielane są przez gruczoły dokrewne."
  },
  {
    id: "mitochondria",
    title: "Mitochondria",
    label: "Elektrownie komórek",
    summary: "Produkują ATP – walutę energetyczną całego ciała.",
    description:
      "Mitochondria wytwarzają ATP na bazie tlenu i składników odżywczych. Gdy są przeciążone, spada energia i pogarsza się regeneracja."
  },
  // Narządy i układy
  {
    id: "heart",
    title: "Serce",
    label: "Układ krążenia",
    summary: "Pompuje krew i utrzymuje życie.",
    description:
      "Serce to mięsień wielkości pięści, który nieustannie pompuje krew. Składa się z czterech jam i posiada własny układ bodźcotwórczy."
  },
  {
    id: "lungs",
    title: "Płuca",
    label: "Układ oddechowy",
    summary: "Wymiana tlenu i dwutlenku węgla.",
    description:
      "Płuca umożliwiają wymianę gazową: tlen trafia do krwi, a CO₂ jest usuwany. Miliony pęcherzyków zwiększają powierzchnię wymiany."
  },
  {
    id: "liver",
    title: "Wątroba",
    label: "Detoksykacja",
    summary: "Filtruje krew, produkuje żółć, magazynuje energię.",
    description:
      "Wątroba neutralizuje toksyny, magazynuje glikogen, produkuje żółć i reguluje metabolizm tłuszczów i białek."
  },
  {
    id: "stomach",
    title: "Żołądek",
    label: "Trawienie",
    summary: "Rozpoczyna trawienie białek i miesza pokarm.",
    description:
      "Żołądek wydziela kwas solny i enzymy trawienne. Miesza pokarm, przygotowując go do dalszego trawienia w jelicie cienkim."
  },
  {
    id: "intestines",
    title: "Jelita",
    label: "Wchłanianie",
    summary: "Wchłaniają składniki odżywcze i wodę.",
    description:
      "Jelito cienkie wchłania składniki odżywcze, jelito grube wodę i formuje stolec. To centrum mikrobiomu."
  },
  {
    id: "pancreas",
    title: "Trzustka",
    label: "Hormony i enzymy",
    summary: "Produkuje insulinę i enzymy trawienne.",
    description:
      "Trzustka wydziela insulinę i glukagon, regulując poziom glukozy, oraz enzymy trawienne do jelita cienkiego."
  },
  {
    id: "kidneys",
    title: "Nerki",
    label: "Filtracja",
    summary: "Usuwają toksyny i regulują gospodarkę wodną.",
    description:
      "Nerki filtrują krew, regulują gospodarkę wodno-elektrolitową, ciśnienie oraz produkują erytropoetynę."
  },
  {
    id: "spleen",
    title: "Śledziona",
    label: "Odporność",
    summary: "Filtruje krew i wspiera układ odpornościowy.",
    description:
      "Śledziona usuwa stare krwinki, filtruje drobnoustroje i magazynuje limfocyty."
  },
  {
    id: "thymus",
    title: "Grasica",
    label: "Układ odpornościowy",
    summary: "Dojrzewają w niej limfocyty T.",
    description:
      "Grasica jest ważna szczególnie w dzieciństwie. Kształtuje odporność poprzez dojrzewanie limfocytów T."
  },
  {
    id: "bones",
    title: "Kości",
    label: "Układ kostny",
    summary: "Szkielet, ochrona narządów, magazyn wapnia.",
    description:
      "Kości tworzą szkielet, chronią narządy, magazynują wapń i są miejscem produkcji komórek krwi w szpiku."
  },
  {
    id: "joints",
    title: "Stawy",
    label: "Układ ruchu",
    summary: "Łączą kości i umożliwiają ruch.",
    description:
      "Stawy to połączenia kości, stabilizowane przez więzadła i mięśnie. Umożliwiają płynny, kontrolowany ruch."
  },
  {
    id: "muscles",
    title: "Mięśnie",
    label: "Układ mięśniowy",
    summary: "Ruch, postawa, metabolizm.",
    description:
      "Mięśnie szkieletowe umożliwiają ruch, gładkie pracę narządów, a sercowy pompowanie krwi."
  },
  {
    id: "brain",
    title: "Mózg",
    label: "Układ nerwowy",
    summary: "Kontroluje całe ciało.",
    description:
      "Mózg przetwarza informacje, steruje ruchem, emocjami, pamięcią i homeostazą całego organizmu."
  },
  {
    id: "nerves",
    title: "Nerwy",
    label: "Komunikacja",
    summary: "Przesyłają sygnały w całym ciele.",
    description:
      "Nerwy przewodzą impulsy elektryczne między mózgiem, rdzeniem kręgowym i narządami oraz mięśniami."
  }
];

// ======== DANE: KARTY ========

const cardsData = [
  {
    id: "cortisol",
    type: "hormone",
    name: "Kortyzol",
    tag: "Hormon stresu",
    short: "Zwiększa energię w sytuacjach nagłego zagrożenia, ale w nadmiarze szkodzi.",
    pills: ["stres", "tłuszcz trzewny"],
    details:
      "Kortyzol pomaga mobilizować energię, ale przewlekle podwyższony obniża odporność, pogarsza sen i sprzyja odkładaniu tłuszczu trzewnego."
  },
  {
    id: "t3",
    type: "hormone",
    name: "T3 (trójjodotyronina)",
    tag: "Hormon tarczycy",
    short: "Steruje tempem metabolizmu i poziomem energii.",
    pills: ["metabolizm", "energia"],
    details:
      "T3 reguluje tempo przemiany materii, wpływa na temperaturę, pracę serca, mózgu i mięśni."
  },
  {
    id: "muscle",
    type: "tissue",
    name: "Tkanka mięśniowa",
    tag: "Tkanka",
    short: "Odpowiada za ruch, postawę i duży udział w metabolizmie.",
    pills: ["ruch", "spalanie"],
    details:
      "Mięśnie szkieletowe to magazyn energii i klucz do zdrowego metabolizmu. Ruch poprawia pracę całego organizmu."
  },
  {
    id: "epithelium",
    type: "tissue",
    name: "Tkanka nabłonkowa",
    tag: "Tkanka",
    short: "Tworzy barierę ochronną i powierzchnie wymiany.",
    pills: ["skóra", "jelita"],
    details:
      "Pokrywa skórę, wyściela jelita, płuca i naczynia. Chroni i reguluje wchłanianie."
  },
  {
    id: "ashwagandha",
    type: "adaptogen",
    name: "Ashwagandha",
    tag: "Adaptogen",
    short: "Wspiera odporność na stres i jakość snu.",
    pills: ["kortyzol ↓", "sen ↑"],
    details:
      "Ashwagandha bywa stosowana jako wsparcie w regulacji osi stresu i poprawie regeneracji."
  },
  {
    id: "rhodiola",
    type: "adaptogen",
    name: "Różeniec górski (Rhodiola)",
    tag: "Adaptogen",
    short: "Delikatnie wspiera energię psychiczną i koncentrację.",
    pills: ["koncentracja", "zmęczenie ↓"],
    details:
      "Może wspierać odporność na zmęczenie psychiczne i koncentrację."
  },
  // Narządy i układy
  {
    id: "heartCard",
    type: "organ",
    name: "Serce",
    tag: "Narząd",
    short: "Pompuje krew i utrzymuje życie.",
    pills: ["krążenie", "tlen"],
    details:
      "Serce pompuje krew przez cały organizm, dostarczając tlen i składniki odżywcze każdej komórce."
  },
  {
    id: "liverCard",
    type: "organ",
    name: "Wątroba",
    tag: "Narząd",
    short: "Filtruje krew i produkuje żółć.",
    pills: ["detoks", "metabolizm"],
    details:
      "Wątroba bierze udział w detoksykacji, magazynowaniu energii i trawieniu tłuszczów."
  },
  {
    id: "lungsCard",
    type: "organ",
    name: "Płuca",
    tag: "Narząd",
    short: "Wymiana tlenu i CO₂.",
    pills: ["oddech", "tlen"],
    details:
      "Płuca umożliwiają wymianę gazową – tlen do krwi, dwutlenek węgla na zewnątrz."
  },
  {
    id: "stomachCard",
    type: "organ",
    name: "Żołądek",
    tag: "Narząd",
    short: "Rozpoczyna trawienie białek.",
    pills: ["trawienie"],
    details:
      "Żołądek rozkłada białka i miesza pokarm z kwasem oraz enzymami."
  },
  {
    id: "intestinesCard",
    type: "organ",
    name: "Jelita",
    tag: "Narząd",
    short: "Wchłaniają składniki odżywcze.",
    pills: ["mikrobiom", "wchłanianie"],
    details:
      "Jelita decydują, jak dużo składników odżywczych i wody trafi z pokarmu do organizmu."
  },
  {
    id: "kidneysCard",
    type: "organ",
    name: "Nerki",
    tag: "Narząd",
    short: "Filtrują krew i regulują wodę.",
    pills: ["filtracja", "elektrolity"],
    details:
      "Nerki usuwają toksyny, regulują wodę i elektrolity oraz ciśnienie krwi."
  },
  {
    id: "brainCard",
    type: "organ",
    name: "Mózg",
    tag: "Narząd",
    short: "Centrum dowodzenia całego ciała.",
    pills: ["pamięć", "emocje"],
    details:
      "Mózg integruje bodźce i steruje wszystkimi funkcjami organizmu."
  },
  {
    id: "bonesCard",
    type: "system",
    name: "Kości",
    tag: "Układ kostny",
    short: "Szkielet i ochrona narządów.",
    pills: ["wapń", "szpik"],
    details:
      "Kości stabilizują ciało, chronią narządy i są magazynem minerałów."
  },
  {
    id: "jointsCard",
    type: "system",
    name: "Stawy",
    tag: "Układ ruchu",
    short: "Łączą kości i umożliwiają ruch.",
    pills: ["ruch", "stabilizacja"],
    details:
      "Stawy sprawiają, że możemy się poruszać, skakać, zginać i obracać."
  },
  {
    id: "musclesCard",
    type: "system",
    name: "Mięśnie",
    tag: "Układ mięśniowy",
    short: "Ruch i metabolizm.",
    pills: ["siła", "energia"],
    details:
      "Mięśnie odpowiadają za ruch, ale też wpływają na metabolizm i stabilizację postawy."
  }
];

// ======== DANE: QUIZ ========

const quizQuestions = [
  {
    question: "Która tkanka jest odpowiedzialna głównie za ruch i postawę ciała?",
    options: ["Tkanka łączna", "Tkanka mięśniowa", "Tkanka nerwowa", "Tkanka nabłonkowa"],
    correctIndex: 1,
    explanation: "Tkanka mięśniowa – zwłaszcza mięśnie szkieletowe – odpowiada za ruch i postawę."
  },
  {
    question: "Który składnik krwi odpowiada za transport tlenu?",
    options: ["Leukocyty", "Trombocyty", "Erytrocyty", "Limfocyty B"],
    correctIndex: 2,
    explanation: "Erytrocyty (krwinki czerwone) zawierają hemoglobinę wiążącą tlen."
  },
  {
    question: "Za co głównie odpowiada układ limfatyczny?",
    options: [
      "Transport tlenu",
      "Oczyszczanie tkanek i odporność",
      "Produkcję hormonów",
      "Regulację temperatury"
    ],
    correctIndex: 1,
    explanation:
      "Układ limfatyczny filtruje patogeny, usuwa odpady z tkanek i wspiera układ odpornościowy."
  },
  {
    question: "Jaką rolę pełnią mitochondria w komórkach?",
    options: [
      "Przechowują materiał genetyczny",
      "Produkują ATP – energię",
      "Budują ścianę komórkową",
      "Syntetyzują hormony steroidowe"
    ],
    correctIndex: 1,
    explanation: "Mitochondria wytwarzają ATP – podstawową „walutę energetyczną” komórki."
  },
  {
    question: "Kortyzol jest hormonem przede wszystkim związanym z:",
    options: ["Snem", "Stresem", "Ciążą", "Wapniem"],
    correctIndex: 1,
    explanation: "Kortyzol to hormon stresu, mobilizujący energię w sytuacjach zagrożenia."
  },
  {
    question: "Który narząd pompuje krew w całym ciele?",
    options: ["Płuca", "Mózg", "Serce", "Wątroba"],
    correctIndex: 2,
    explanation: "Serce jest pompą, która napędza krążenie krwi."
  },
  {
    question: "Gdzie głównie wchłaniane są składniki odżywcze z pokarmu?",
    options: ["Żołądek", "Jelito cienkie", "Jelito grube", "Trzustka"],
    correctIndex: 1,
    explanation: "Większość składników odżywczych wchłania się w jelicie cienkim."
  },
  {
    question: "Który narząd odpowiada za filtrację krwi i produkcję moczu?",
    options: ["Nerki", "Wątroba", "Śledziona", "Trzustka"],
    correctIndex: 0,
    explanation: "Nerki filtrują krew, produkując mocz i regulując gospodarkę wodną."
  },
  {
    question: "Za kontrolę całego ciała, myślenie i emocje odpowiada przede wszystkim:",
    options: ["Serce", "Mózg", "Trzustka", "Płuca"],
    correctIndex: 1,
    explanation: "Mózg jest centrum dowodzenia całego organizmu."
  }
];

// ======== NAWIGACJA ========

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");

function switchView(targetViewId) {
  views.forEach((view) => {
    if (view.id === targetViewId) {
      view.classList.add("view--active");
      view.style.display = "block";
    } else {
      view.classList.remove("view--active");
      view.style.display = "none";
    }
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetViewId = btn.dataset.view;
    navButtons.forEach((b) => b.classList.remove("nav-btn--active"));
    btn.classList.add("nav-btn--active");
    switchView(targetViewId);
    play(sNext);
  });
});

// ======== MAPA WIEDZY ========

const knowledgeGridEl = document.getElementById("knowledgeGrid");
const infoTitleEl = document.getElementById("infoTitle");
const infoBodyEl = document.getElementById("infoBody");

function renderKnowledgeTiles() {
  knowledgeGridEl.innerHTML = "";
  knowledgeModules.forEach((mod) => {
    const tile = document.createElement("div");
    tile.className = "knowledge-tile";
    tile.dataset.id = mod.id;
    tile.innerHTML = `
      <div class="knowledge-tile__label">${mod.label}</div>
      <div class="knowledge-tile__title">${mod.title}</div>
      <div class="knowledge-tile__summary">${mod.summary}</div>
    `;
    tile.addEventListener("click", () => {
      infoTitleEl.textContent = mod.title;
      infoBodyEl.textContent = mod.description;
      play(sNext);
    });
    knowledgeGridEl.appendChild(tile);
  });
}

// ======== KARTY ========

const cardsGridEl = document.getElementById("cardsGrid");
const cardDetailsTitleEl = document.getElementById("cardDetailsTitle");
const cardDetailsBodyEl = document.getElementById("cardDetailsBody");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentCardsFilter = "all";

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCardsFilter = btn.dataset.type;
    filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
    btn.classList.add("filter-btn--active");
    renderCards();
  });
});

function renderCards() {
  cardsGridEl.innerHTML = "";
  const filtered = cardsData.filter(
    (card) => currentCardsFilter === "all" || card.type === currentCardsFilter
  );
  filtered.forEach((card) => {
    const cardEl = document.createElement("article");
    cardEl.className = "card";
    cardEl.dataset.id = card.id;
    cardEl.innerHTML = `
      <div class="card__tag">${card.tag}</div>
      <div class="card__title">${card.name}</div>
      <p class="card__subtitle">${card.short}</p>
      <div class="card__pills">
        ${card.pills.map((pill) => `<span class="card__pill">${pill}</span>`).join("")}
      </div>
    `;
    cardEl.addEventListener("click", () => {
      cardDetailsTitleEl.textContent = card.name;
      cardDetailsBodyEl.textContent = card.details;
      play(sNext);
    });
    cardsGridEl.appendChild(cardEl);
  });
}

// ======== QUIZ ========

let quizIndex = 0;
let quizScore = 0;
let selectedOptionIndex = null;

const quizQuestionCounterEl = document.getElementById("quizQuestionCounter");
const quizScoreEl = document.getElementById("quizScore");
const quizQuestionTextEl = document.getElementById("quizQuestionText");
const quizOptionsEl = document.getElementById("quizOptions");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizFeedbackEl = document.getElementById("quizFeedback");

function renderQuizQuestion() {
  const q = quizQuestions[quizIndex];
  selectedOptionIndex = null;
  quizQuestionCounterEl.textContent = `Pytanie ${quizIndex + 1} / ${quizQuestions.length}`;
  quizScoreEl.textContent = `Wynik: ${quizScore}`;
  quizQuestionTextEl.textContent = q.question;
  quizFeedbackEl.textContent = "";
  quizOptionsEl.innerHTML = "";
  quizNextBtn.disabled = true;

  q.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = optText;
    btn.addEventListener("click", () => handleQuizOptionClick(idx));
    quizOptionsEl.appendChild(btn);
  });
}

function handleQuizOptionClick(idx) {
  if (selectedOptionIndex !== null) return;
  selectedOptionIndex = idx;
  const q = quizQuestions[quizIndex];
  const optionButtons = quizOptionsEl.querySelectorAll(".quiz-option");

  if (idx === q.correctIndex) {
    quizScore++;
    quizFeedbackEl.textContent = "Dobrze! " + q.explanation;
    quizFeedbackEl.style.color = "#2f7a2f";
    play(sCorrect);
  } else {
    quizFeedbackEl.textContent = "Źle. " + q.explanation;
    quizFeedbackEl.style.color = "#a51616";
    play(sWrong);
  }

  optionButtons.forEach((btn, i) => {
    btn.classList.remove("quiz-option--correct", "quiz-option--wrong");
    if (i === q.correctIndex) btn.classList.add("quiz-option--correct");
    else if (i === idx) btn.classList.add("quiz-option--wrong");
  });

  quizScoreEl.textContent = `Wynik: ${quizScore}`;
  quizNextBtn.disabled = false;
}

quizNextBtn.addEventListener("click", () => {
  play(sNext);
  quizIndex++;
  if (quizIndex >= quizQuestions.length) {
    quizQuestionTextEl.textContent = "Koniec quizu! Możesz zacząć od nowa.";
    quizOptionsEl.innerHTML = "";
    quizFeedbackEl.textContent = `Twój wynik: ${quizScore} / ${quizQuestions.length}`;
    quizFeedbackEl.style.color = "#5A4633";
    quizNextBtn.disabled = true;
    return;
  }
  renderQuizQuestion();
});

// ======== INIT ========

function init() {
  switchView("mapView");
  renderKnowledgeTiles();
  renderCards();
  renderQuizQuestion();
  // muzyka tła tylko po odblokowaniu i przy włączonym dźwięku
  if (sBg && soundEnabled && audioUnlocked) {
    sBg.volume = 0.25;
    sBg.play().catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", init);
