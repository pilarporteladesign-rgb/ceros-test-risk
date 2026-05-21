(function () {

  console.log("✅ External JS Loaded");

  function init() {

    if (!window.CerosSDK) {
      console.log("⏳ Waiting for SDK...");
      setTimeout(init, 100);
      return;
    }

    console.log("✅ SDK Detected");

    window.CerosSDK.findExperience().done(function (experience) {

      console.log("✅ SDK Ready (external)");

      setTimeout(function () {

        console.log("✅ Fetching GitHub data");

        getExternalData(function (data) {

          console.log("✅ Data received:", data);

          updateUI(experience, data);

        });

      }, 1500);

    });

  }

  // ✅ START INIT
  init();


  // ✅ FETCH JSON
  function getExternalData(callback) {

    fetch("https://raw.githubusercontent.com/pilarporteladesign-rgb/ceros-test-risk/main/data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        callback({
          name: data.name,
          score: data.score
        });

      })
      .catch(function (error) {
        console.error("❌ Fetch error:", error);
      });

  }

  // ✅ UPDATE UI
  function updateUI(experience, data) {

    console.log("✅ Updating UI");

    var nameComponent = experience.findComponentById('6a0ce37dd7c1e');

    if (nameComponent) {
      nameComponent.setText("Hi " + data.name);
    }

    var scoreComponent = experience.findComponentById('6a0cc3669d712');

    if (scoreComponent) {
      scoreComponent.setText(data.score.toString());
    }

  }

})();
