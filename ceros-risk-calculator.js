// ==========================================
// ✅ CEROS SDK RESULTS INITIALIZER
// ==========================================
window.initCerosResults = function (experience) {

  console.log("✅ External script loaded");

  // ✅ Listen for results page visibility
  experience.findPagesByTag('results-page')
    .then(function (pages) {

      pages.on('pageVisible', function () {

        console.log("✅ Results page visible");

        runResults(experience);

      });

    });

};


// ==========================================
// ✅ MAIN RESULTS FUNCTION
// ==========================================
function runResults(experience) {

  console.log("✅ Running results logic");

  // ✅ TEST DATA (replace later with API / SharePoint)
  const data = {
    name: "Pilar",
    score: 72,

    stats: [
      { name: "Claims", value: 45 },
      { name: "Exposure", value: 68 },
      { name: "Control", value: 80 }
    ],

    cards: [
      { title: "Exposure", text: "Above avg", trend: "up", value: 75 },
      { title: "Claims", text: "Below avg", trend: "down", value: 40 },
      { title: "Controls", text: "Stable", trend: "up", value: 60 },
      { title: "Compliance", text: "Good", trend: "up", value: 80 }
    ],

    header: {
      eyebrow: "Your Risk Profile"
    }
  };


  // ==========================================
  // ✅ PAGE 1 — HEADER
  // ==========================================
  experience.findComponentsByTag('user-name')
    .then(c => c.setText("Hi " + data.name));

  experience.findComponentsByTag('score-number')
    .then(c => c.setText(data.score.toString()));


  // ==========================================
  // ✅ SCORE IMAGE LOGIC
  // ==========================================
  experience.findComponentsByTag('score-image')
    .then(c => c.hide());

  experience.findComponentsByTag('score-' + data.score)
    .then(c => c.show());


  // ==========================================
  // ✅ PAGE 1 — STATS
  // ==========================================
  data.stats.forEach((stat, i) => {
    const index = i + 1;

    experience.findComponentsByTag('stat-name-' + index)
      .then(c => c.setText(stat.name));

    experience.findComponentsByTag('stat-value-' + index)
      .then(c => c.setText(stat.value.toString()));
  });


  // ==========================================
  // ✅ PAGE 2 — HEADER
  // ==========================================
  experience.findComponentsByTag('header-eyebrow')
    .then(c => c.setText(data.header.eyebrow));

  experience.findComponentsByTag('header-number')
    .then(c => c.setText(data.score.toString()));


  // ==========================================
  // ✅ CARD LOGIC
  // ==========================================
  data.cards.forEach((card, i) => {

    const index = i + 1;

    // ✅ Title
    experience.findComponentsByTag('card-title-' + index)
      .then(c => c.setText(card.title));

    // ✅ Description text
    experience.findComponentsByTag('card-text-' + index)
      .then(c => c.setText(card.text));

    // ==========================================
    // ✅ ICON LOGIC (UP / DOWN)
    // ==========================================
    const upTag = 'card-icon-up-' + index;
    const downTag = 'card-icon-down-' + index;

    if (card.trend === "up") {

      experience.findComponentsByTag(upTag)
        .then(c => c.show());

      experience.findComponentsByTag(downTag)
        .then(c => c.hide());

    } else {

      experience.findComponentsByTag(upTag)
        .then(c => c.hide());

      experience.findComponentsByTag(downTag)
        .then(c => c.show());
    }


    // ==========================================
    // ✅ BAR LOGIC (WIDTH SIMULATION)
    // ==========================================
    const step = getBarStep(card.value);

    // Hide all variations
    experience.findComponentsByTag('card-bar-' + index)
      .then(c => c.hide());

    // Show correct variation
    experience.findComponentsByTag('bar-' + index + '-' + step)
      .then(c => c.show());

  });


  // ==========================================
  // ✅ TRIGGER ANIMATIONS
  // ==========================================
  setTimeout(() => {
    experience.findComponentsByTag('results-trigger')
      .then(c => c.click());
  }, 300);

}


// ==========================================
// ✅ HELPER: BAR STEP CALCULATION
// ==========================================
function getBarStep(value) {

  if (value <= 25) return 25;
  if (value <= 50) return 50;
  if (value <= 75) return 75;

  return 100;
}
