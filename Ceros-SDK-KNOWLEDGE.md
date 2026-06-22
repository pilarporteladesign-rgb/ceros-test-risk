# 🚀 Ceros SDK Dynamic Experience Guide

This guide documents **proven patterns, pitfalls, and implementation strategies** for building dynamic, data-driven experiences in Ceros using the SDK, external JSON, and JavaScript.

---

# 🧠 Overview

This system enables:

- ✅ Dynamic content from external data (GitHub JSON)
- ✅ Multi-page experiences (Page 2, Page 3, etc.)
- ✅ Conditional UI logic (tags, cards, stats)
- ✅ Reliable navigation handling
- ✅ Production-safe SDK usage

---

# ✅ What Works (Proven Patterns)

Use these patterns **always**:

✅ Inline JS in Custom HTML
✅ require(['CerosSDK'], ...)
✅ findComponentById()
✅ Polling via setInterval
✅ GitHub raw JSON (public)
✅ Cache-busting (?ts=Date.now())
✅ Group-based show/hide (for tags)
✅ Defensive UI updates (safeSet)
✅ Throttled navigation detection

---

# ❌ What Does NOT Work (Avoid These)

These are unreliable or broken in production:

---

# ⚙️ Core Architecture

### Data Flow

GitHub JSON → Fetch → Map to IDs → Update UI

---

### UI Mapping Pattern

DATA → JSON
UI → SDK IDs
LOGIC → JavaScript


# 📦 JSON Structure (Example)

```json
{
  "name": "Pilar",
  "score": 72,
  "stats": [45, 68, 80],

  "tags": {
    "group1": "financial",
    "group2": "aerospace"
  },

  "page3": {
    "eyebrow": "Your Risk Insights",
    "headlineText": "4 Coverage areas where you're below peer benchmark.",
    "cards": [
      { "title": "Coverage A", "trend": "Below" },
      { "title": "Coverage B", "trend": "Above" },
      { "title": "Coverage C", "trend": "Below" },
      { "title": "Coverage D", "trend": "Above" }
    ],
    "footer": [
      { "text": "Improvement Areas", "value": "3 key gaps identified" },
      { "text": "Strengths", "value": "5 strong positions" },
      { "text": "Recommendations", "value": "2 priority actions" }
    ]
  }
}

🧩 Core SDK Pattern
require(['CerosSDK'], function(CerosSDK) {
  CerosSDK.findExperience().done(function(experience) {

    // Detect navigation changes
    setInterval(function() {
      // detect page
      // run update
    }, 400);

  });
});
``

🔧 Full Working Script Template
const safeSet = (experience, id, value) => {
  const el = experience.findComponentById(id);
  if (el && value !== undefined && value !== null) {
    el.setText(String(value));
  }
};

const safeShow = (experience, id) => {
  experience.findComponentById(id)?.show();
};

const safeHide = (experience, id) => {
  experience.findComponentById(id)?.hide();
};

🎯 Tag System Pattern
Rules

All tags must be VISIBLE in Studio
Use groups for control
Never hide elements manually in Studio

✅ Logic Flow
1. Hide all tags
2. Check JSON value
3. Show only the correct tag

Example
const group1 = [
  'ID_1',
  'ID_2',
  'ID_3'
];

group1.forEach(id => safeHide(experience, id));

if (data.tags.group1 === "financial") {
  safeShow(experience, 'ID_1');
}

🔁 Navigation Handling (CRITICAL)
setInterval(() => {
  runUpdate(experience);
}, 400);
``

let lastRun = 0;

setInterval(() => {
  const now = Date.now();
  if (now - lastRun > 1000) {
    runUpdate(experience);
    lastRun = now;
  }
}, 400);

🧪 Debugging Playbook
❓ If UI doesn’t update:
✅ Check:

Console logs
SDK IDs
JSON structure
Component visibility

❌ JSON errors:
Use:
https://jsonlint.com/

❌ show() not working:
✅ Ensure:

Component is visible in Studio
Parent groups are visible
❌ Data works only on refresh:
✅ Problem:
No navigation detection

✅ Fix:
Use setInterval polling


❌ Values undefined:
✅ Fix:
if (value !== undefined)


🧠 Key Lessons

Ceros SDK is timing-sensitive
Navigation does NOT trigger scripts
Always assume async behavior
Defensive coding is required
IDs are more reliable than tags


📌 Recommended Workflow

Design UI in Ceros
Assign SDK IDs
Build JSON structure
Write inline JS
Map JSON → UI
Add navigation detection
Add conditional logic (tags, cards)


🚀 Reusable Modules
You can reuse:
✅ Page 2 system (stats + score)
✅ Page 3 system (cards + footer)
✅ Tag system
✅ JSON-driven UI

🧩 Example Queries (for Copilot Agent)
How do I show only one tag in Ceros?
Why is my component not updating?
How do I connect GitHub JSON to Ceros?
Why does navigation break my data?


✅ Final Notes
This system is:
✅ Production-ready
✅ Scalable
✅ Reusable across experiences
✅ Compatible with Copilot agents

🎯 Future Enhancements

Tag-based color logic
Icons per condition (↑ ↓)
Animated bars
Score visualization logic


---

# ✅ ✅ NEXT STEP

Now do this:

1. Create file:
