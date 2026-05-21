(function() {

  console.log("✅ External JS Loaded");

  require.config({
    paths: {
      CerosSDK: "//sdk.ceros.com/standalone-player-sdk-v5.min"
    }
  });

  require(['CerosSDK'], function(CerosSDK) {

    CerosSDK.findExperience().done(function(experience) {

      console.log("✅ SDK Ready (from external file)");

      setTimeout(function() {

        console.log("✅ Fetching GitHub data");

        getExternalData(function(data) {

          console.log("✅ Data received:", data);

          updateUI(experience, data);

        });

      }, 1500);

    });

  });

  // ✅ FETCH FROM GITHUB JSON
  function getExternalData(callback) {

    fetch("https://raw.githubusercontent.com/pilarporteladesign-rgb/ceros-test-risk/main/data.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        callback({
          name: data.name,
          score: data.score
        });

      })
      .catch(function(error) {
        console.error("❌ Fetch error:", error);
      });

  }

  // ✅ UPDATE UI VIA ID (YOUR WORKING METHOD)
  function updateUI(experience, data) {

    console.log("✅ Updating UI from external JS");

    // ✅ NAME (update with your real ID)
    var nameComponent = experience.findComponentById('6a0ce37dd7c1e');

    if (nameComponent) {
      nameComponent.setText("Hi " + data.name);
    }

    // ✅ SCORE (update with your real ID)
    var scoreComponent = experience.findComponentById('6a0cc3669d712');

    if (scoreComponent) {
      scoreComponent.setText(data.score.toString());
    }

  }

})();
