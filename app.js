async function loadJSON(path) {
  return fetch(path).then(res => res.json());
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateUA() {
  const devices = await loadJSON("data/devices.json");
  const apps = await loadJSON("data/social_apps.json");

  let device = pick(devices);
  let chrome = rand(133, 146);
  let appList = Object.keys(apps);
  let selectedApp = pick(appList);

  let version = rand(200, 500);

  let ua = "";

  if (device.os === "Android") {
    ua = `Mozilla/5.0 (Linux; Android ${rand(10,14)}; ${device.model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chrome}.0.0.0 Mobile Safari/537.36`;

    ua += " [" + apps[selectedApp].android.replace("{version}", version) + "]";
  }

  if (device.os === "iOS") {
    ua = `Mozilla/5.0 (iPhone; CPU iPhone OS ${rand(14,17)}_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`;

    ua += " [" + apps[selectedApp].ios.replace("{version}", version) + "]";
  }

  document.getElementById("output").value = ua;
}
