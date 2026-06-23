(function () {

  console.log("✅ Ceros Dynamic System Running");

  require.config({
    paths: {
      CerosSDK: "//sdk.ceros.com/standalone-player-sdk-v5.min"
    }
  });

  require(['CerosSDK'], function (CerosSDK) {

    CerosSDK.findExperience().done(function (experience) {

      console.log("✅ SDK Ready");

      let lastRun = 0;

      setInterval(function () {

        const now = Date.now();
        if (now - lastRun < 1200) return;

        lastRun = now;

        runUpdate(experience);

      }, 400);

    });

  });

  function runUpdate(experience) {

    fetch("https://raw.githubusercontent.com/pilarporteladesign-rgb/ceros-test-risk/main/data3.json?ts=" + Date.now())
      .then(res => res.json())
      .then(function (data) {

        console.log("✅ Data received:", data);

        const set = (id, value) => {
          const el = experience.findComponentById(id);
          if (el && value !== undefined && value !== null) {
            el.setText(String(value));
          }
        };

        const show = (id) => experience.findComponentById(id)?.show();
        const hide = (id) => experience.findComponentById(id)?.hide();

        // =========================
        // ✅ PAGE 1 DATA
        // =========================

        set('35e46a90e23d', data.companyName);
        set('351f66c2e454', data.industry);
        set('88715b14200c', data.annualRevenue);

        set('e9af2c46ecec', data.documentsUploaded);
        set('9ae61039422e', data.datapointsIdentified);
        set('0d3fbd812cee', data.questionsAnswered);

        set('487774531e9b', data.totalPremiumValue);
        set('9b027379d2bf', data.totalPremiumLabel);

        set('47ebce171527', data.clientsInIndustry);
        set('07057683d038', data.activePolicies);

        // =========================
        // ✅ PAGE 3 TEXT
        // =========================

        if (data.page3) {

          set('a33906149e20', data.page3.missingFields[0]);
          set('6a39bfd71dbdc', data.page3.missingFields[1]);
          set('6a39bfec1dbdd', data.page3.missingFields[2]);
          set('6a39c1891dbe5', data.page3.missingFields[3]);
          set('6a39c1911dbe6', data.page3.missingFields[4]);

        }

        // =========================
        // ✅ DOT COLOR LOGIC
        // =========================

        const dotGroups = [
          {
            red: '6a39ca75cba93',
            yellow: '6a39ca75cba92',
            green: 'acece6b8d2ec'
          },
          {
            red: '6a39ca9acba98',
            yellow: '6a39ca9acba99',
            green: '6a39ca9acba9a'
          },
          {
            red: '6a39caa9cba9c',
            yellow: '6a39caa9cba9d',
            green: '6a39caa9cba9e'
          },
          {
            red: '6a39cab7cbaa0',
            yellow: '6a39cab7cbaa1',
            green: '6a39cab7cbaa2'
          },
          {
            red: '6a39cac6cbaa4',
            yellow: '6a39cac6cbaa5',
            green: '6a39cac6cbaa6'
          }
        ];

        if (data.dotColors) {

          dotGroups.forEach((group, index) => {

            // hide all first
            hide(group.red);
            hide(group.yellow);
            hide(group.green);

            const color = data.dotColors[index];

            if (color === "red") show(group.red);
            if (color === "yellow") show(group.yellow);
            if (color === "green") show(group.green);

          });

        }

      })
      .catch(err => console.error("❌ Fetch error:", err));

  }

})();
