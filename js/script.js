const startScreen = document.getElementById("start-screen");
const explanationScreen = document.getElementById("explanation-screen");
const explanationText = document.getElementById("explanation-text");
const startQuizButton = document.getElementById("start-quiz");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const finalTitle = document.getElementById("final-title");
const finalFeedback = document.getElementById("final-feedback");
const restartButton = document.getElementById("restart-button");
const categoryButtonsStart = document.querySelectorAll("#start-screen .category-button");
const nextButton = document.getElementById("next-button");

const scenarios = {
  "adgangskoder": {
  "start": {
    text: "Du skal oprette en ny adgangskode til din arbejdsmail. Hvad er det vigtigste at overveje?",
    options: [
      { text: "At den er nem at huske.", next: "adgangskoder/easy_remember_q2", feedback: "En adgangskode der er nem at huske for dig, er sandsynligvis også nem at gætte for andre." },
      { text: "At den indeholder personlige informationer.", next: "adgangskoder/personal_info_bad_ending", feedback: "Personlige informationer som navne og fødselsdage er let tilgængelige og gør din adgangskode sårbar." },
      { text: "At den er lang, unik og kompleks.", next: "adgangskoder/strong_q2", feedback: "En lang, unik og kompleks adgangskode er fundamentet for god sikkerhed." }
    ]
  },
  "easy_remember_q2": {
    text: "Du valgte en nem adgangskode. Hvilken af disse er stadig en dårlig idé at inkludere?",
    options: [
      { text: "Dit kæledyrs navn.", next: "adgangskoder/easy_remember_bad_ending", feedback: "Dit kæledyrs navn er ofte let at finde på sociale medier eller i samtaler." },
      { text: "Et almindeligt ord efterfulgt af '123'.", next: "adgangskoder/easy_pattern_bad_ending", feedback: "Almindelige ord og simple mønstre er blandt de første ting, hackere forsøger." },
      { text: "En kombination af små bogstaver fra et yndlingscitat.", next: "adgangskoder/easy_but_better_neutral_ending", feedback: "Selvom det er nemmere at huske, er det stadig ikke så sikkert som en kompleks kode med forskellige tegn." }
    ]
  },
  "strong_q2": {
    text: "Du valgte en stærk adgangskode. Hvad bør du gøre for at øge sikkerheden yderligere?",
    options: [
      { text: "Genbruge den på flere vigtige konti.", next: "adgangskoder/strong_bad_reuse_ending", feedback: "Hvis én konto bliver kompromitteret, er alle dine genbrugte adgangskoder i fare." },
      { text: "Regelmæssigt opdatere den til en ny, kompleks kode.", next: "adgangskoder/strong_good_rotate_q3", feedback: "Regelmæssige opdateringer minimerer risikoen, selv hvis din adgangskode skulle blive kompromitteret." },
      { text: "Dele den sikkert med din IT-administrator 'for en sikkerheds skyld'.", next: "adgangskoder/strong_bad_share_ending", feedback: "Del aldrig din adgangskode med nogen. IT-administratorer har andre måder at få adgang, hvis nødvendigt." }
    ]
  },
  "strong_good_rotate_q3": {
    text: "Du beslutter dig for at opdatere din adgangskode regelmæssigt. Hvilken anden foranstaltning er vigtig?",
    options: [
      { text: "Skrive den ned på en post-it ved din skærm, så du ikke glemmer den.", next: "adgangskoder/strong_bad_write_down_ending", feedback: "At skrive din adgangskode ned et synligt sted er en stor sikkerhedsrisiko." },
      { text: "Aktivere to-faktor autentificering (2FA) på din mailkonto.", next: "adgangskoder/strong_good_2fa_ending", feedback: "To-faktor autentificering tilføjer et ekstra sikkerhedslag, der gør det meget sværere for uvedkommende at få adgang." },
      { text: "Fortælle din nærmeste kollega din adgangskode i tilfælde af, at du glemmer den.", next: "adgangskoder/strong_bad_tell_colleague_ending", feedback: "Din adgangskode er personlig og bør ikke deles." }
    ]
  },
  // Slutninger
  "personal_info_bad_ending": { text: "Brug af personlige oplysninger gør din adgangskode alt for let at gætte.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Hackere kan nemt finde frem til personlige oplysninger og bruge dem til at kompromittere din konto." },
  "easy_remember_bad_ending": { text: "En adgangskode baseret på let tilgængelig information er meget sårbar.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Selv små variationer af kendte ord eller personlige detaljer er ofte nemme at gætte." },
  "easy_pattern_bad_ending": { text: "Simple mønstre er blandt de første ting, der testes ved angreb.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Undgå almindelige sekvenser og tastaturmønstre i dine adgangskoder." },
  "easy_but_better_neutral_ending": { text: "Det er bedre, men en blanding af store og små bogstaver, tal og symboler er stærkere.", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "neutral", feedback: "For maksimal sikkerhed bør din adgangskode indeholde en variation af forskellige tegn." },
  "strong_bad_reuse_ending": { text: "Genbrug af adgangskoder er en stor sikkerhedsrisiko.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Hvis en af dine konti bliver hacket, kan angriberne potentielt få adgang til alle dine andre konti, der bruger den samme adgangskode." },
  "strong_bad_share_ending": { text: "Din adgangskode er nøglen til din konto og bør aldrig deles.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Selv betroede personer bør ikke have din adgangskode. Brug sikre metoder til at dele information, hvis nødvendigt." },
  "strong_good_rotate_q3": { text: "Regelmæssig opdatering er et vigtigt led i god sikkerhedspraksis.", options: [{ text: "Fortsæt", next: "adgangskoder/strong_good_rotate_q3" }], isEnding: true, feedback: "Hyppige ændringer gør det sværere for potentielle angribere at udnytte en kompromitteret adgangskode over tid." },
  "strong_bad_write_down_ending": { text: "At skrive din adgangskode ned gør den tilgængelig for alle, der finder sedlen.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Brug i stedet en sikker adgangskodeadministrator eller forsøg at huske den komplekse kode." },
  "strong_good_2fa_ending": { text: "Korrekt! To-faktor autentificering giver et markant løft i sikkerheden.", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "Selv hvis din adgangskode skulle blive stjålet, vil 2FA forhindre uautoriseret adgang uden den anden faktor (f.eks. en kode fra din telefon)." },
  "strong_bad_tell_colleague_ending": { text: "Din adgangskode er personlig og bør forblive privat.", options: [{ text: "Start forfra", next: "adgangskoder/start" }], isEnding: true, type: "bad", feedback: "Deling af adgangskoder øger risikoen for misbrug og gør det svært at spore, hvem der har foretaget handlinger på kontoen." },
  "win_ending": { text: "Spillet er slut. Tak for din deltagelse!", options: [{ text: "Start forfra", next: "start" }], isEnding: true, type: "good" }
},
  "phishing": {
 "start": {
  text: "Du modtager en e-mail fra 'din bank' om mistænkelig aktivitet. Hvad gør du?",
  options: [
    { text: "Afsenderens navn matcher bankens navn.", next: "phishing/check_sender_q2", feedback: "Husk, at afsenderens navn ikke er en garanti for ægthed. Cyberkriminelle kan nemt forfalske afsenderens navn." },
    { text: "Tjekker afsenderens e-mailadresse nøje.", next: "phishing/check_sender_q2", feedback: "En mistænkelig afsenderadresse er et tydeligt tegn på phishing." },
    { text: "Ringer direkte til din banks officielle telefonnummer for at verificere.", next: "phishing/call_bank_good_ending", feedback: "At kontakte banken direkte via deres officielle kanaler er den sikreste måde at håndtere mistænkelige henvendelser." }
  ]
},
  "check_sender_q2": {
    text: "Du tjekker afsenderens e-mailadresse. Hvad lægger du især mærke til?",
    options: [
      { text: "Afsenderens navn matcher bankens navn.", next: "phishing/name_match_neutral_feedback", feedback: "Afsenderens navn kan nemt forfalskes. Fokuser på selve e-mailadressen." },
      { text: "Domænet i e-mailadressen ser underligt eller forkert ud.", next: "phishing/suspicious_domain_q3", feedback: "Et domæne, der ikke stemmer overens med bankens officielle hjemmeside, er meget mistænkeligt." },
      { text: "E-mailadressen er en lang række tilfældige bogstaver og tal.", next: "phishing/random_email_bad_ending", feedback: "En usædvanlig og ikke-professionel e-mailadresse er et stærkt tegn på svindel." }
    ]
  },
  "suspicious_domain_q3": {
    text: "Du bemærker et underligt domæne i e-mailadressen. Hvad er din næste handling?",
    options: [
      { text: "Ignorerer det og klikker på linket alligevel.", next: "phishing/ignore_domain_bad_ending", feedback: "At ignorere tydelige tegn på phishing kan føre til kompromittering af dine oplysninger." },
      { text: "Søger efter bankens officielle hjemmeside via en søgemaskine og logger ind derfra.", next: "phishing/official_website_good_ending", feedback: "Ved at gå direkte til bankens officielle side undgår du potentielle phishing-fælder." },
      { text: "Videresender e-mailen til en ven for at spørge, om de tror, den er ægte.", next: "phishing/forward_friend_neutral_feedback", feedback: "Selvom det er godt at være forsigtig, er det bedre at kontakte banken direkte eller rapportere mistænkelig aktivitet." }
    ]
  },
  // Slutninger
  "click_link_bad_ending": { text: "Du lander på en side, der ligner din banks, og indtaster dine oplysninger...", options: [{ text: "Start forfra", next: "phishing/start" }], isEnding: true, type: "bad", feedback: "DineLoginoplysninger er nu potentielt stjålet. Vær altid forsigtig med links i uventede e-mails." },
  "call_bank_good_ending": { text: "Banken bekræfter, at e-mailen er falsk. Godt gået!", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "Direkte verifikation er den sikreste måde at håndtere mistænkelige henvendelser." },
  "random_email_bad_ending": { text: "Du klikker på linket fra den underlige e-mail...", options: [{ text: "Start forfra", next: "phishing/start" }], isEnding: true, type: "bad", feedback: "Vær altid skeptisk over for e-mails fra ukendte eller mærkelige afsendere." },
  "ignore_domain_bad_ending": { text: "Desværre var det en phishing-e-mail, og dine oplysninger er i fare.", options: [{ text: "Start forfra", next: "phishing/start" }], isEnding: true, type: "bad", feedback: "Vær opmærksom på domænenavnet i afsenderens e-mailadresse." },
  "official_website_good_ending": { text: "Du logger sikkert ind via bankens officielle side. God beslutning!", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "Log altid ind på vigtige konti ved at navigere direkte til den officielle hjemmeside." },
"name_match_neutral_feedback": { text: "Godt at vide: Afsenderens navn alene er ikke nok til at afgøre ægtheden. Klik 'Næste' for at se nærmere på e-mailadressen.", options: [{ text: "Næste", next: "phishing/check_sender_q2" }], isEnding: true, feedback: "Cyberkriminelle kan nemt forfalske afsenderens navn." },
  "forward_friend_neutral_feedback": { text: "Det er bedre at søge råd fra en ekspert eller kontakte organisationen direkte.", options: [{ text: "Fortsæt", next: "phishing/suspicious_domain_q3" }], isEnding: true, feedback: "Din ven er måske heller ikke sikker. Bekræft altid med den pågældende organisation." },
  "win_ending": { text: "Spillet er slut. Tak for din deltagelse!", options: [{ text: "Start forfra", next: "start" }], isEnding: true, type: "good" }
},
  "opdateringer": {
  "start": {
    text: "Din computer viser en pop-up besked: 'Vigtige sikkerhedsopdateringer er tilgængelige. Klik her for at installere.' Hvad gør du?",
    options: [
      { text: "Klikker straks på 'Installer' i pop-up'en.", next: "opdateringer/click_popup_q2", feedback: "Vær forsigtig med pop-ups. Direkte klik kan nogle gange installere malware." },
      { text: "Ignorerer beskeden og fortsætter med dit arbejde.", next: "opdateringer/ignore_updates_bad_ending", feedback: "At ignorere sikkerhedsopdateringer kan gøre dit system sårbart over for kendte sikkerhedshuller." },
      { text: "Lukker pop-up'en og tjekker manuelt for opdateringer via operativsystemets indstillinger.", next: "opdateringer/check_manually_good_ending", feedback: "Manuel kontrol via systemindstillingerne sikrer, at du får de officielle og sikre opdateringer." }
    ]
  },
  "click_popup_q2": {
    text: "Du klikker på 'Installer' i pop-up'en. Hvad sker der nu?",
    options: [
      { text: "Installationen starter uden yderligere bekræftelse.", next: "opdateringer/silent_install_bad_ending", feedback: "En installation der starter uden din udtrykkelige tilladelse kan være mistænkelig." },
      { text: "Du bliver bedt om at indtaste dit administrator-password.", next: "opdateringer/admin_password_q3", feedback: "At blive bedt om administratorrettigheder er normalt for installation af systemopdateringer, men vær sikker på kilden." },
      { text: "Din antivirus advarer om en potentiel trussel.", next: "opdateringer/antivirus_warning_bad_ending", feedback: "En antivirusadvarsel skal altid tages alvorligt. Afbryd installationen." }
    ]
  },
  "admin_password_q3": {
    text: "Du bliver bedt om dit administrator-password. Hvad bør du overveje, før du indtaster det?",
    options: [
      { text: "Indtaster det uden at tænke videre, da det er en 'vigtig' opdatering.", next: "opdateringer/enter_password_risky_ending", feedback: "Selvom det ligner en officiel opdatering, skal du være sikker på kilden, før du giver administratoradgang." },
      { text: "Tjekker om pop-up-vinduet ser legitimt ud og om navnet på softwareudgiveren er korrekt.", next: "opdateringer/check_legitimacy_good_ending", feedback: "Verifikation af vinduets udseende og udgiverens navn er et godt skridt." },
      { text: "Annulerer og tjekker i stedet for opdateringer manuelt via systemindstillingerne.", next: "opdateringer/check_manually_again_good_ending", feedback: "At gå via de officielle systemindstillinger er altid den sikreste metode." }
    ]
  },
  // Slutninger
  "ignore_updates_bad_ending": { text: "Ved at ignorere opdateringer gør du dit system sårbart over for sikkerhedshuller, som hackere kan udnytte.", options: [{ text: "Start forfra", next: "opdateringer/start" }], isEnding: true, type: "bad", feedback: "Sikkerhedsopdateringer indeholder vigtige rettelser, der beskytter dit system." },
  "silent_install_bad_ending": { text: "En installation uden din udtrykkelige tilladelse kan indikere installation af uønsket software eller malware.", options: [{ text: "Start forfra", next: "opdateringer/start" }], isEnding: true, type: "bad", feedback: "Vær altid opmærksom på, hvad der installeres på din computer." },
  "antivirus_warning_bad_ending": { text: "Din antivirus har sandsynligvis opdaget skadelig software. Stol på advarslen og afbryd installationen.", options: [{ text: "Start forfra", next: "opdateringer/start" }], isEnding: true, type: "bad", feedback: "Antivirusprogrammer er designet til at beskytte dig mod trusler - ignorér dem ikke." },
  "enter_password_risky_ending": { text: "Du gav potentielt administratoradgang til skadelig software. Vær altid sikker på kilden til opdateringer.", options: [{ text: "Start forfra", next: "opdateringer/start" }], isEnding: true, type: "bad", feedback: "Giv kun administratorrettigheder, hvis du er sikker på, at det er en legitim handling." },
  "check_manually_good_ending": { text: "Du tjekkede sikkert for opdateringer via systemindstillingerne og installerede de nødvendige. Godt gjort!", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "Manuel kontrol sikrer, at du får de officielle opdateringer direkte fra producenten." },
  "check_legitimacy_good_ending": { text: "Ved at tjekke vinduets legitimitet var du forsigtig og undgik potentielt skadelig software.", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "At være opmærksom på detaljer kan hjælpe med at spotte falske opdateringsvinduer." },
  "check_manually_again_good_ending": { text: "Du tog den sikreste vej ved at kontrollere opdateringer manuelt. Fremragende!", options: [{ text: "Afslut spillet", next: "win_ending" }], isEnding: true, type: "good", feedback: "At stole på de officielle kanaler for opdateringer er den bedste praksis." },
  "win_ending": { text: "Spillet er slut. Tak for din deltagelse!", options: [{ text: "Start forfra", next: "start" }], isEnding: true, type: "good" }
}
};

let currentScenario = "start";
let currentCategory = null;
let userChoices = [];

function showScenario(scenarioId) {
  console.log(`Viser scenarie: ${currentCategory}/${scenarioId}`);
  const scenario = scenarios[currentCategory][scenarioId];
  questionText.textContent = scenario.text;
  answersContainer.innerHTML = "";
  const feedbackTextElement = document.getElementById("feedback-text");
  feedbackTextElement.textContent = "";
  nextButton.style.display = "none";
  nextButton.onclick = null;

  scenario.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.addEventListener("click", () => {
      if (option.next) {
        userChoices.push({
          category: currentCategory,
          question: scenario.text,
          answer: option.text,
          feedback: option.feedback
        });
        localStorage.setItem('userChoices', JSON.stringify(userChoices));

        currentScenario = option.next;
        console.log("Current Category ved klik på svar:", currentCategory, "Next:", currentScenario);
        const nextScenarioId = option.next.split('/')[1];
        feedbackTextElement.textContent = option.feedback || "";
        nextButton.style.display = "block";

        answersContainer.querySelectorAll('button').forEach(btn => {
          btn.disabled = true;
        });

        nextButton.onclick = () => {
          nextButton.onclick = null;
          answersContainer.querySelectorAll('button').forEach(btn => {
            btn.disabled = false;
          });
          if (scenarios[currentCategory] && scenarios[currentCategory][nextScenarioId] && scenarios[currentCategory][nextScenarioId].isEnding) {
            showEnding(scenarios[currentCategory][nextScenarioId]);
          } else if (scenarios[currentCategory] && scenarios[currentCategory][nextScenarioId]) {
            showScenario(nextScenarioId);
          } else {
            console.error("Fejl: Kunne ikke finde scenarie:", currentCategory, nextScenarioId);
          }
        };
      }
    });
    answersContainer.appendChild(button);
  });
}

function showEnding(endingScenario) {
  questionScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalTitle.textContent = endingScenario.text;
  finalScore.textContent = "";
  finalFeedback.textContent = endingScenario.feedback || "";
  finalTitle.className = "";
  if (endingScenario.type === "good") {
    finalTitle.classList.add("good-ending");
  } else if (endingScenario.type === "bad") {
    finalTitle.classList.add("bad-ending");
  } else if (endingScenario.type === "neutral") {
    finalTitle.classList.add("neutral-ending");
  }
  displayUserChoices();
}

function startGame() {
  console.log(`Starter spil med kategori: ${currentCategory}`);
  explanationScreen.classList.remove("active");
  questionScreen.classList.add("active");
  currentScenario = "start";
  userChoices = [];
  localStorage.removeItem('userChoices');
  showScenario(currentScenario);
}

function showExplanation(category) {
  currentCategory = category;
  console.log(`Valgt kategori: ${currentCategory}`);
  startScreen.classList.remove("active");
  explanationScreen.classList.add("active");
  explanationText.textContent = `Du har valgt kategorien '${category}'. Gennemgå de følgende scenarier og træf de bedste beslutninger for at forbedre din cybersikkerhed. Klik på 'Start' for at begynde.`;
  userChoices = [];
  localStorage.removeItem('userChoices');
}

function restartGame() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  currentCategory = null;
  currentScenario = "start";
  userChoices = [];
  localStorage.removeItem('userChoices');
}

function downloadJSON(data, filename) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function displayUserChoices() {
  const storedChoices = localStorage.getItem('userChoices');
  const choices = storedChoices ? JSON.parse(storedChoices) : [];

  const existingOverview = resultScreen.querySelector('.user-choices-overview');
  if (existingOverview) {
    resultScreen.removeChild(existingOverview);
  }

  if (choices.length > 0) {
    const choicesOverview = document.createElement('div');
    choicesOverview.classList.add('user-choices-overview');

    const overviewTitle = document.createElement('h3');
    overviewTitle.textContent = 'Dine valg:';
    choicesOverview.appendChild(overviewTitle);

    const choicesList = document.createElement('ul');
    choices.forEach(choice => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>Kategori:</strong> ${choice.category}<br>
                            <strong>Spørgsmål:</strong> ${choice.question}<br>
                            <strong>Dit svar:</strong> ${choice.answer}<br>
                            ${choice.feedback ? `<strong>Feedback:</strong> ${choice.feedback}` : ''}<hr>`;
      choicesList.appendChild(listItem);
    });
    choicesOverview.appendChild(choicesList);
    resultScreen.appendChild(choicesOverview);
  }
}


window.addEventListener('beforeunload', () => {
  localStorage.removeItem('userChoices');
});


categoryButtonsStart.forEach(button => {
  button.addEventListener("click", function() {
    showExplanation(this.dataset.category);
  });
});

startQuizButton.addEventListener("click", () => {
  if (currentCategory) {
    startGame();
  } else {
    alert("Vælg venligst en kategori før du starter quizzen.");
  }
});

restartButton.addEventListener("click", restartGame);

downloadButton.textContent = 'Download Scenarios som JSON';
downloadButton.classList.add('download-button');
downloadButton.addEventListener('click', () => {
  downloadJSON(scenarios, 'scenarios.json');
});
startScreen.appendChild(downloadButton);

explanationScreen.classList.remove("active");
questionScreen.classList.remove("active");
resultScreen.classList.remove("active");
startScreen.classList.add("active");
