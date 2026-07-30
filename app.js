let players = JSON.parse(localStorage.getItem("players")) || [];

function addPlayer() {
  let input = document.getElementById("playerName");
  let name = input.value.trim();

  if (name === "") {
    alert("請輸入球友姓名");
    return;
  }

  players.push(name);

  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );

  input.value = "";

  showPlayers();
}


function removePlayer(index) {
  players.splice(index, 1);

  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );

  showPlayers();
}


function showPlayers() {
  let list = document.getElementById("playerList");

  if (!list) return;

  list.innerHTML = "";

  players.forEach(function(player, index){

    let li = document.createElement("li");

    li.innerHTML =
      player +
      ' <button onclick="removePlayer(' +
      index +
      ')">❌</button>';

    list.appendChild(li);

  });
}


function start() {
  alert(
    "🏸 空間羽航員 V5.6 Final\n目前球友：" +
    players.length +
    " 人"
  );
}


showPlayers();
