<script>
(function() {

  console.log("✅ Inline working version (navigation-aware)");

  require.config({
    paths: {
      CerosSDK: "//sdk.ceros.com/standalone-player-sdk-v5.min"
    }
  });

  require(['CerosSDK'], function(CerosSDK) {

    CerosSDK.findExperience().done(function(experience) {

      console.log("✅ SDK Ready");

      // ✅ RUN on ANY page change
      experience.on('pageChanged', function() {

        console.log("✅ Page changed → run update");

        runUpdate(experience);

      });

      // ✅ ALSO run once on load
      runUpdate(experience);

    });

  });

  function runUpdate(experience) {

    console.log("✅ Fetching fresh data");

    fetch("https://raw.githubusercontent.com/pilarporteladesign-rgb/ceros-test-risk/main/data.json?ts=" + Date.now())
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {

        console.log("✅ Data received:", data);

        // ✅ NAME
        var nameComponent = experience.findComponentById('6a0ce37dd7c1e');
        if (nameComponent) {
          nameComponent.setText("Hi " + data.name);
        }

        // ✅ SCORE
        var scoreComponent = experience.findComponentById('6a0cc3669d712');
        if (scoreComponent) {
          scoreComponent.setText(data.score.toString());
        }

      });

  }

})();
</script>
