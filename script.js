/* -----------------------------------
   SPA ページ切り替え
----------------------------------- */
function showPage(name) {
  // ページ表示切り替え
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');

  // ナビのアクティブ切り替え
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.dataset.page === name) n.classList.add('active');
    else n.classList.remove('active');
  });

  // 地図ページならリサイズ
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
  { id: 15, name: "朝倉(大学前)", lat: 33.550708, lng: 133.488196 },
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
  { id: 29, name: "グランド通り", lat: 33.557587, lng: 133.529442 },
  { id: 30, name: "県庁前", lat: 33.558134, lng: 133.532251 },
  { id: 31, name: "高知城前", lat: 33.558515, lng: 133.534226 },
  { id: 32, name: "大橋通", lat: 33.558933, lng: 133.536353 },
  { id: 33, name: "堀詰", lat: 33.559564, lng: 133.539408 },
  { id: 34, name: "はりまや橋", lat: 33.559575, lng: 133.5425 },
  { id: 35, name: "電鉄ターミナルビル前", lat: 33.559398, lng: 133.544067 },
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
  { id: 61, name: "住吉通り", lat: 33.576577, lng: 133.636476 },
  { id: 62, name: "東工業前", lat: 33.576442, lng: 133.637831 },
  { id: 63, name: "後免西町", lat: 33.575821, lng: 133.642929 },
  { id: 64, name: "後免中町", lat: 33.575463, lng: 133.646012 },
  { id: 65, name: "後免東町", lat: 33.574524, lng: 133.648031 },
  { id: 66, name: "御免町", lat: 33.574346, lng: 133.65041 }
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
// ここに inoGroups / gomenGroups / fareTableIno / fareTableGomen
// （蓮くんが送ってくれたもの）をそのまま残す
// ※長いので省略しないで全部入れてね！

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