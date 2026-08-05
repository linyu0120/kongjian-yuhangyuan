```javascript
// 🏸 羽球輪轉小幫手 V8.3 Final
// storage.js

let clubs = [];
let currentClub = null;

// ======================
// 讀取資料
// ======================

function loadClubData() {

    clubs = JSON.parse(localStorage.getItem("clubs")) || [];

    currentClub = localStorage.getItem("currentClub");

    // 如果目前球團不存在，就自動切到第一個球團
    if (
        currentClub &&
        !clubs.some(c => c.name === currentClub)
    ) {
        currentClub = clubs.length ? clubs[0].name : null;
    }

    if (currentClub) {

        const club = getCurrentClub();

        if (club) {

            clubPlayers = club.players || [];
            todayPlayers = club.todayPlayers || [];
            rounds = club.rounds || [];
            settings = club.settings || {
                courts: 3,
                players: 4
            };

        }

    } else {

        clubPlayers = [];
        todayPlayers = [];
        rounds = [];
        settings = {
            courts: 3,
            players: 4
        };

    }

}

// ======================
// 儲存所有球團
// ======================

function saveClubs() {

    localStorage.setItem(
        "clubs",
        JSON.stringify(clubs)
    );

    if (currentClub) {

        localStorage.setItem(
            "currentClub",
            currentClub
        );

    }

}

// ======================
// 取得目前球團
// ======================

function getCurrentClub() {

    return clubs.find(
        c => c.name === currentClub
    );

}

// ======================
// 建立球團
// ======================

function createClub(name) {

    name = name.trim();

    if (!name) {

        alert("請輸入球團名稱");
        return false;

    }

    if (
        clubs.some(c => c.name === name)
    ) {

        alert("球團已存在");
        return false;

    }

    clubs.push({

        name,

        players: [],

        todayPlayers: [],

        rounds: [],

        settings: {
            courts: 3,
            players: 4
        }

    });

    currentClub = name;

    saveClubs();

    return true;

}

// ======================
// 切換球團
// ======================

function switchClub(name) {

    currentClub = name;

    saveClubs();

    loadClubData();

    renderAll();

}

// ======================
// 刪除球團
// ======================

function deleteClub(name) {

    if (!confirm("確定刪除球團？")) return;

    clubs = clubs.filter(
        c => c.name !== name
    );

    if (currentClub === name) {

        currentClub =
            clubs.length ?
            clubs[0].name :
            null;

    }

    saveClubs();

    loadClubData();

    renderAll();

}
```
