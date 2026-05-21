{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 window.initCerosResults = function (experience) \{\
\
\'a0 console.log("\uc0\u9989  External script loaded");\
\
\'a0 // \uc0\u9989  Listen for results page\
\'a0 experience.findPagesByTag('results-page')\
\'a0\'a0\'a0 .then(function (pages) \{\
\
\'a0\'a0\'a0\'a0\'a0 pages.on('pageVisible', function () \{\
\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 console.log("\uc0\u9989  Results page visible");\
\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 runResults(experience);\
\
\'a0\'a0\'a0\'a0\'a0 \});\
\
\'a0\'a0\'a0 \});\
\
\};\
\
\
// \uc0\u9989  MAIN LOGIC FUNCTION\
function runResults(experience) \{\
\
\'a0 console.log("\uc0\u9989  Running results logic");\
\
\'a0 // \uc0\u9989  TEST DATA (replace later with API)\
\'a0 const data = \{\
\'a0\'a0\'a0 name: "Pilar",\
\'a0\'a0\'a0 score: 72,\
\
\'a0\'a0\'a0 stats: [\
\'a0\'a0\'a0\'a0\'a0 \{ name: "Claims", value: 45 \},\
\'a0\'a0\'a0\'a0\'a0 \{ name: "Exposure", value: 68 \},\
\'a0\'a0\'a0\'a0\'a0 \{ name: "Control", value: 80 \}\
\'a0\'a0\'a0 ],\
\
\'a0\'a0\'a0 cards: [\
\'a0\'a0\'a0\'a0\'a0 \{ title: "Exposure", text: "Above avg", trend: "up", value: 75 \},\
\'a0\'a0\'a0\'a0\'a0 \{ title: "Claims", text: "Below avg", trend: "down", value: 40 \},\
\'a0\'a0\'a0\'a0\'a0 \{ title: "Controls", text: "Stable", trend: "up", value: 60 \},\
\'a0\'a0\'a0\'a0\'a0 \{ title: "Compliance", text: "Good", trend: "up", value: 80 \}\
\'a0\'a0\'a0 ],\
\
\'a0\'a0\'a0 header: \{\
\'a0\'a0\'a0\'a0\'a0 eyebrow: "Your Risk Profile"\
\'a0\'a0\'a0 \}\
\'a0 \};\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  PAGE 1 \'97 HEADER\
\'a0 // =========================\
\
\'a0 experience.findComponentsByTag('user-name')\
\'a0\'a0\'a0 .then(c => c.setText("Hi " + data.name));\
\
\'a0 experience.findComponentsByTag('score-number')\
\'a0\'a0\'a0 .then(c => c.setText(data.score.toString()));\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  SCORE IMAGE LOGIC\
\'a0 // =========================\
\
\'a0 experience.findComponentsByTag('score-image')\
\'a0\'a0\'a0 .then(c => c.hide());\
\
\'a0 experience.findComponentsByTag('score-' + data.score)\
\'a0\'a0\'a0 .then(c => c.show());\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  STATS\
\'a0 // =========================\
\
\'a0 data.stats.forEach((stat, i) => \{\
\'a0\'a0\'a0 const index = i + 1;\
\
\'a0\'a0\'a0 experience.findComponentsByTag('stat-name-' + index)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.setText(stat.name));\
\
\'a0\'a0\'a0 experience.findComponentsByTag('stat-value-' + index)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.setText(stat.value.toString()));\
\'a0 \});\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  PAGE 2 HEADER\
\'a0 // =========================\
\
\'a0 experience.findComponentsByTag('header-eyebrow')\
\'a0\'a0\'a0 .then(c => c.setText(data.header.eyebrow));\
\
\'a0 experience.findComponentsByTag('header-number')\
\'a0\'a0\'a0 .then(c => c.setText(data.score.toString()));\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  CARDS\
\'a0 // =========================\
\
\'a0 data.cards.forEach((card, i) => \{\
\'a0\'a0\'a0 const index = i + 1;\
\
\'a0\'a0\'a0 // Title\
\'a0\'a0\'a0 experience.findComponentsByTag('card-title-' + index)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.setText(card.title));\
\
\'a0\'a0\'a0 // Text\
\'a0\'a0\'a0 experience.findComponentsByTag('card-text-' + index)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.setText(card.text));\
\
\'a0\'a0\'a0 // =========================\
\'a0\'a0\'a0 // \uc0\u9989  ICON LOGIC\
\'a0\'a0\'a0 // =========================\
\
\'a0\'a0\'a0 const upTag = 'card-icon-up-' + index;\
\'a0\'a0\'a0 const downTag = 'card-icon-down-' + index;\
\
\'a0\'a0\'a0 if (card.trend === "up") \{\
\'a0\'a0\'a0\'a0\'a0 experience.findComponentsByTag(upTag)\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 .then(c => c.show());\
\
\'a0\'a0\'a0\'a0\'a0 experience.findComponentsByTag(downTag)\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 .then(c => c.hide());\
\'a0\'a0\'a0 \} else \{\
\'a0\'a0\'a0\'a0\'a0 experience.findComponentsByTag(upTag)\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 .then(c => c.hide());\
\
\'a0\'a0\'a0\'a0\'a0 experience.findComponentsByTag(downTag)\
\'a0\'a0\'a0\'a0\'a0\'a0\'a0 .then(c => c.show());\
\'a0\'a0\'a0 \}\
\
\'a0\'a0\'a0 // =========================\
\'a0\'a0\'a0 // \uc0\u9989  BAR LOGIC\
\'a0\'a0\'a0 // =========================\
\
\'a0\'a0\'a0 const step = getBarStep(card.value);\
\
\'a0\'a0\'a0 experience.findComponentsByTag('card-bar-' + index)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.hide());\
\
\'a0\'a0\'a0 experience.findComponentsByTag(`bar-$\{index\}-$\{step\}`)\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.show());\
\'a0 \});\
\
\'a0 // =========================\
\'a0 // \uc0\u9989  TRIGGER ANIMATIONS\
\'a0 // =========================\
\
\'a0 setTimeout(() => \{\
\'a0\'a0\'a0 experience.findComponentsByTag('results-trigger')\
\'a0\'a0\'a0\'a0\'a0 .then(c => c.click());\
\'a0 \}, 300);\
\}\
\
\
// \uc0\u9989  BAR HELPER FUNCTION\
function getBarStep(value) \{\
\'a0 if (value <= 25) return 25;\
\'a0 if (value <= 50) return 50;\
\'a0 if (value <= 75) return 75;\
\'a0 return 100;\
\}\
}