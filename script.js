/* -----------------------------------
   SPA ページ切り替え
----------------------------------- */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.dataset.page === name) n.classList.add('active');
    else n.classList.remove('active');
  });

  if (name === 'map' && window.appMap) {
    setTimeout(() => window.appMap.invalidateSize(), 100);
  }
}

/* -----------------------------------
   電停データ（座標つき）
----------------------------------- */
const stations = [
  { id: 1, name: "伊野", lat: 33.548392, lng: 133.428537 },
  { id: 2, name: "伊野駅前", lat: 33.548435, lng: 133.429886 },
  { id: 3, name: "鳴谷", lat: 33.54866, lng: 133.432839 },
  { id: 4, name: "北山", lat: 33.549747, lng: 133.441788 },
  { id: 5, name: "北内", lat: 33.549758, lng: 133.441815 },
  { id: 6, name: "伊野商業前", lat: 33.550187, lng: 133.444302 },
  { id: 7, name: "枝川", lat: 33.551297, lng: 133.449561 },
  { id: 8, name: "中山", lat: 33.551652, lng: 133.45248 },
  { id: 9, name: "八代通", lat: 33.55216, lng: 133.456329 },
  { id: 10, name: "宇治団地前", lat: 33.551903, lng: 133.461186 },
  { id: 11, name: "咥内", lat: 33.55238, lng: 133.4711 },
  { id: 12, name: "宮の奥", lat: 33.552358, lng: 133.475719 },
  { id: 13, name: "朝倉神社前", lat: 33.551964, lng: 133.480762 },
  { id: 14, name: "朝倉駅前", lat: 33.550819, lng: 133.485754 },
  { id: 15, name: "朝倉", lat: 33.550708, lng: 133.488196 },
  { id: 16, name: "曙町", lat: 33.551141, lng: 133.490822 },
  { id: 17, name: "曙町東町", lat: 33.551614, lng: 133.493528 },
  { id: 18, name: "鴨部", lat: 33.552199, lng: 133.496864 },
  { id: 19, name: "鏡川橋", lat: 33.555746, lng: 133.498686 },
  { id: 20, name: "蛍橋", lat: 33.555414, lng: 133.503403 },
  { id: 21, name: "旭町三丁目", lat: 33.555676, lng: 133.506302 },
  { id: 22, name: "旭駅前通", lat: 33.555987, lng: 133.509637 },
  { id: 23, name: "旭町一丁目", lat: 33.55673, lng: 133.513595 },
  { id: 24, name: "上町五丁目", lat: 33.557291, lng: 133.51728 },
  { id: 25, name: "上町四丁目", lat: 33.557336, lng: 133.519869 },
  { id: 26, name: "上町二丁目", lat: 33.557358, lng: 133.523055 },
  { id: 27, name: "上町一丁目", lat: 33.557365, lng: 133.525124 },
  { id: 28, name: "枡形", lat: 33.557376, lng: 133.527166 },
  { id: 29, name: "グランド通", lat: 33.557587, lng: 133.529442 },
  { id: 30, name: "県庁前", lat: 33.558134, lng: 133.532251 },
  { id: 31, name: "高知城前", lat: 33.558515, lng: 133.534226 },
  { id: 32, name: "大橋通", lat: 33.558933, lng: 133.536353 },
  { id: 33, name: "堀詰", lat: 33.559564, lng: 133.539408 },
  { id: 34, name: "はりまや橋", lat: 33.559575, lng: 133.5425 },
  { id: 35, name: "デンテツターミナルビル前", lat: 33.559398, lng: 133.544067 },
  { id: 36, name: "菜園場町", lat: 33.559084, lng: 133.548559 },
  { id: 37, name: "宝永町", lat: 33.558684, lng: 133.55367 },
  { id: 38, name: "知寄町一丁目", lat: 33.558381, lng: 133.556677 },
  { id: 39, name: "知寄町二丁目", lat: 33.558078, lng: 133.559926 },
  { id: 40, name: "知寄町", lat: 33.557874, lng: 133.561861 },
  { id: 41, name: "知寄町三丁目", lat: 33.557519, lng: 133.56559 },
  { id: 42, name: "葛島橋東詰", lat: 33.557039, lng: 133.569679 },
  { id: 43, name: "西高須", lat: 33.558257, lng: 133.573078 },
  { id: 44, name: "県立美術館通", lat: 33.558863, lng: 133.575093 },
  { id: 45, name: "高須", lat: 33.559344, lng: 133.577117 },
  { id: 46, name: "文珠通", lat: 33.559329, lng: 133.579195 },
  { id: 47, name: "介良通", lat: 33.560328, lng: 133.583557 },
  { id: 48, name: "新木", lat: 33.562321, lng: 133.586601 },
  { id: 49, name: "東新木", lat: 33.564539, lng: 133.59029 },
  { id: 50, name: "田辺島通", lat: 33.566458, lng: 133.593113 },
  { id: 51, name: "鹿児", lat: 33.567172, lng: 133.597125 },
  { id: 52, name: "舟戸", lat: 33.570222, lng: 133.599508 },
  { id: 53, name: "北浦", lat: 33.573705, lng: 133.603928 },
  { id: 54, name: "領石通", lat: 33.5742, lng: 133.607671 },
  { id: 55, name: "清和学園前", lat: 33.574973, lng: 133.612823 },
  { id: 56, name: "一条橋", lat: 33.574777, lng: 133.614089 },
  { id: 57, name: "明見橋", lat: 33.574685, lng: 133.617939 },
  { id: 58, name: "長崎", lat: 33.57511, lng: 133.620894 },
  { id: 59, name: "小篭通", lat: 33.576381, lng: 133.626059 },
  { id: 60, name: "篠原", lat: 33.577028, lng: 133.631651 },
  { id: 61, name: "住吉通", lat: 33.576577, lng: 133.636476 },
  { id: 62, name: "東工業前", lat: 33.576442, lng: 133.637831 },
  { id: 63, name: "後免西町", lat: 33.575821, lng: 133.642929 },
  { id: 64, name: "後免中町", lat: 33.575463, lng: 133.646012 },
  { id: 65, name: "後免東町", lat: 33.574524, lng: 133.648031 },
  { id: 66, name: "後免町", lat: 33.574346, lng: 133.65041 },
  { id: 67, name: "高知駅前", lat: 33.56679, lng: 133.543668 },
  { id: 68, name: "高知橋", lat: 33.564544, lng: 133.543414 },
  { id: 69, name: "蓮池町通", lat: 33.562135, lng: 133.543231 },
  { id: 70, name: "梅の辻", lat: 33.554156, lng: 133.543529 },
  { id: 71, name: "桟橋通一丁目", lat: 33.550352, lng: 133.546091 },
  { id: 72, name: "桟橋通二丁目", lat: 33.549095, lng: 133.546952 },
  { id: 73, name: "桟橋通三丁目", lat: 33.546714, lng: 133.548541 },
  { id: 74, name: "桟橋通四丁目", lat: 33.544591, lng: 133.550004 },
  { id: 75, name: "桟橋車庫前", lat: 33.54124, lng: 133.552248 },
  { id: 76, name: "桟橋通五丁目", lat: 33.540471, lng: 133.552769 }
];

/* -----------------------------------
   電停名だけの配列（picker 用）
----------------------------------- */
const stationNames = stations.map(s => s.name);

/* -----------------------------------
   電停選択 UI（picker）
----------------------------------- */
let currentSelectType = null;

function selectStation(type) {
  currentSelectType = type;

  const list = document.getElementById("picker-list");
  list.innerHTML = "";

  stationNames.forEach(name => {
    const div = document.createElement("div");
    div.className = "picker-item";
    div.textContent = name;
    div.onclick = () => chooseStation(name);
    list.appendChild(div);
  });

  document.getElementById("station-picker").style.bottom = "0";
  document.getElementById("picker-overlay").style.display = "block";
}

function chooseStation(name) {
  if (currentSelectType === "from") {
    document.getElementById("from-station").textContent = name;
  } else {
    document.getElementById("to-station").textContent = name;
  }
  closePicker();
}

function closePicker() {
  document.getElementById("station-picker").style.bottom = "-70%";
  document.getElementById("picker-overlay").style.display = "none";
}

/* -----------------------------------
   運賃計算（グループ表）
----------------------------------- */
const GomenGroups = [
  { ticket: 1, group: "1", id: 0,
    stations: ["伊野","伊野駅前","鳴谷","北山","北内","伊野商業前","枝川",
               "中山","八代通"]
  },

  { ticket: 2, group: "2", id: 1,
    stations: ["宇治団地前","咥内","宮の奥","朝倉神社前","朝倉駅前"]
  },

  { ticket: 3, group: "3-1", id: 2,
    stations: ["朝倉","曙町","曙町東町"]
  },

  { ticket: 3, group: "3-2", id: 3,
    stations: ["鴨部"]
  },

  { ticket: 3, group: "3-3", id: 4,
    stations: ["鏡川橋","蛍橋","旭町三丁目","旭駅前通"]
  },

  { ticket: 4, group: "4-1", id: 5,
    stations: ["旭町一丁目","上町五丁目","上町四丁目","上町二丁目","上町一丁目",
               "枡形","グランド通","県庁前","高知城前","大橋通","堀詰",
               "はりまや橋","デンテツターミナルビル前","菜園場町",
               "宝永町","知寄町一丁目","知寄町二丁目","知寄町"]
  },

  { ticket: 4, group: "4-2", id: 6,
    stations: ["蓮池町通","高知橋","高知駅前"]
  },

  { ticket: 4, group: "4-3", id: 7,
    stations: ["梅の辻","桟橋通一丁目","桟橋通二丁目","桟橋通三丁目",
               "桟橋通四丁目","桟橋車庫前","桟橋通五丁目"]
  },

  { ticket: 4, group: "4-4", id: 8,
    stations: ["葛島橋東詰","西高須","県立美術館通","高須","文珠通","介良通"]
  },

  { ticket: 5, group: "5-1", id: 9,
    stations: ["新木","東新木","田辺島通","鹿児"]
  },

  { ticket: 5, group: "5-2", id: 10,
    stations: ["舟戸"]
  },

  { ticket: 6, group: "6", id: 11,
    stations: ["北浦","領石通","清和学園前","一条橋","明見橋","長崎"]
  },

  { ticket: 7, group: "7", id: 12,
    stations: ["小篭通","篠原","住吉通","東工業前","後免西町","後免中町",
               "後免東町","後免町"]
  }
];

const InoGroups = [
  { ticket: 1, group: "1", id: 0,
    stations: ["伊野","伊野駅前","鳴谷","北山","北内","伊野商業前","枝川","中山"]
  },

  { ticket: 2, group: "2", id: 1,
    stations: ["八代通","宇治団地前","咥内","宮の奥","朝倉神社前"]
  },

  { ticket: 3, group: "3", id: 2,
    stations: ["朝倉駅前","朝倉","曙町"]
  },

  { ticket: 4, group: "4-1", id: 3,
    stations: ["曙町東町"]
  },

  { ticket: 4, group: "4-2", id: 4,
    stations: ["鴨部","鏡川橋","蛍橋","旭町三丁目"]
  },

  { ticket: 4, group: "4-3", id: 5,
    stations: ["旭駅前通","旭町一丁目","上町五丁目","上町四丁目","上町二丁目",
               "上町一丁目","枡形","グランド通","県庁前","高知城前","大橋通",
               "堀詰","はりまや橋","デンテツターミナルビル前","菜園場町",
               "宝永町","知寄町一丁目","知寄町二丁目","知寄町"]
  },

  { ticket: 4, group: "4-4", id: 6,
    stations: ["蓮池町通","高知橋","高知駅前"]
  },

  { ticket: 4, group: "4-5", id: 7,
    stations: ["梅の辻","桟橋通一丁目","桟橋通二丁目","桟橋通三丁目",
               "桟橋通四丁目","桟橋車庫前","桟橋通五丁目"]
  },

  { ticket: 5, group: "5-1", id: 8,
    stations: ["知寄町三丁目","葛島橋東詰","西高須","県立美術館通","高須","文珠通"]
  },

  { ticket: 5, group: "5-2", id: 9,
    stations: ["介良通","新木","東新木","田辺島通"]
  },

  { ticket: 6, group: "6-1", id: 10,
    stations: ["鹿児"]
  },

  { ticket: 6, group: "6-2", id: 11,
    stations: ["舟戸","北浦","領石通","清和学園前","一条橋","明見橋"]
  },

  { ticket: 7, group: "7", id: 12,
    stations: ["長崎","小篭通","篠原","住吉通","東工業前",
               "後免西町","後免東町","後免町"]
  }
];

/* -----------------------------------
   運賃表
----------------------------------- */
const fareTableGomen = [
//       0    1     2     3     4     5     6     7     8     9    10    11    12
  /*0*/ [150, null, null, null, null, null, null, null, null, null, null, null, null],
  /*1*/ [250, 150, null, null, null, null, null, null, null, null, null, null, null],
  /*2*/ [330, 250, 150, null, null, null, null, null, null, null, null, null, null],
  /*3*/ [330, 250, 150, 150, null, null, null, null, null, null, null, null, null],
  /*4*/ [330,  50, 150, 150, 150, null, null, null, null, null, null, null, null],
  /*5*/ [500, 440, 330, 230, 230, 230, null, null, null, null, null, null, null],
  /*6*/ [500, 440, 340, 230, 230, 230, 230, null, null, null, null, null, null],
  /*7*/ [500, 440, 330, 230, 230, 230, 230, 230, null, null, null, null, null],
  /*8*/ [500, 440, 330, 230, 230, 230, 230, 230, 150, null, null, null, null],
  /*9*/ [500, 500, 440, 330, 330, 330, 330, 330, 150, 150, null, null, null],
  /*10*/[500, 500, 440, 330, 330, 330, 330, 330, 150, 150, 150, null, null],
  /*11*/[500, 500, 500, 440, 440, 440, 440, 440, 250, 250, 150, 150, null],
  /*12*/[500, 500, 500, 500, 500, 500, 500, 500, 330, 330, 250, 250, 150]
];

const fareTableIno = [
  //       0    1     2     3     4     5     6     7     8     9    10    11    12
  /*0*/ [150, 250, 330, 330, 500, 500, 500, 500, 500, 500, 500, 500, 500],
  /*1*/ [null,150, 250, 250, 250, 440, 440, 440, 440, 500, 500, 500, 500],
  /*2*/ [null,null,150, 150, 150, 330, 330, 330, 330, 440, 440, 500, 500],
  /*3*/ [null,null,null,150, 150, 230, 230, 230, 230, 330, 330, 440, 500],
  /*4*/ [null,null,null,null,150, 230, 230, 230, 230, 330, 330, 440, 500],
  /*5*/ [null,null,null,null,null,230, 230, 230, 230, 330, 330, 440, 500],
  /*6*/ [null,null,null,null,null,null,230, 230, 230, 330, 330, 440, 500],
  /*7*/ [null,null,null,null,null,null,null,230, 230, 330, 330, 440, 500],
  /*8*/ [null,null,null,null,null,null,null,null,150, 150, 150, 250, 330],
  /*9*/ [null,null,null,null,null,null,null,null,null,150, 150, 250, 330],
  /*10*/[null,null,null,null,null,null,null,null,null,null,150, 150, 250],
  /*11*/[null,null,null,null,null,null,null,null,null,null,null,150, 250],
  /*12*/[null,null,null,null,null,null,null,null,null,null,null,null,150]
];

/* -----------------------------------
   運賃計算ロジック
----------------------------------- */
function getTicketGroup(direction, station) {
  const groups = direction === "ino" ? inoGroups : gomenGroups;
  for (const g of groups) {
    if (g.stations.includes(station)) {
      return { ticket: g.ticket, group: g.group, id: g.id };
    }
  }
  return null;
}

function calcFare(direction, fromStation, toStation) {
  const fareTable = direction === "ino" ? fareTableIno : fareTableGomen;

  const from = getTicketGroup(direction, fromStation);
  const to   = getTicketGroup(direction, toStation);

  if (!from || !to) return null;

  return fareTable[from.id][to.id];
}

function determineDirection(from, to) {
  for (const g of inoGroups) {
    if (g.stations.includes(from)) return "ino";
  }
  return "gomen";
}

/* -----------------------------------
   経路検索（運賃＋次の電車）
----------------------------------- */
function searchRoute() {
  const from = document.getElementById("from-station").textContent;
  const to   = document.getElementById("to-station").textContent;

  if (from === "出発電停" || to === "到着電停") return;

  const direction = determineDirection(from, to);
  const fare = calcFare(direction, from, to);

  document.getElementById("fare-result").innerHTML =
    fare === null
      ? `<i class="ti ti-cash"></i> 運賃：—`
      : `<i class="ti ti-cash"></i> 運賃：${fare}円`;

  document.getElementById("next-train-result").innerHTML =
    `<i class="ti ti-train"></i> 次の電車：準備中`;
}

/* -----------------------------------
   現在地 → 最寄り電停
----------------------------------- */
function findNearestStation(lat, lon) {
  let nearest = null;
  let minDist = Infinity;

  for (const s of stations) {
    const dist = Math.hypot(lat - s.lat, lon - s.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = s.name;
    }
  }
  return nearest;
}

function updateCurrentLocation() {
  const locationSpan = document.querySelector(".location-bar span");

  if (!navigator.geolocation) {
    locationSpan.textContent = "現在地：未対応";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const nearest = findNearestStation(lat, lon);

      locationSpan.textContent =
        nearest ? `現在地：${nearest}付近` : "現在地：取得できませんでした";
    },
    () => {
      locationSpan.textContent = "現在地：取得できませんでした";
    }
  );
}

window.addEventListener("load", updateCurrentLocation);

/* -----------------------------------
   地図（Leaflet）
----------------------------------- */
function initMap() {
  const map = L.map('map').setView([33.559530, 133.542865], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  window.appMap = map;
  addStationMarkers();
}

document.addEventListener("DOMContentLoaded", initMap);

/* -----------------------------------
   駅マーカー
----------------------------------- */
const stationIcon = L.divIcon({
  className: "station-marker",
  html: `<div class="station-dot"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

function addStationMarkers() {
  stations.forEach(st => {
    const marker = L.marker([st.lat, st.lng], { icon: stationIcon }).addTo(appMap);
    marker.bindPopup(`<b>${st.name}</b>`);
  });
}