let players = JSON.parse(localStorage.getItem("players")) || [];


function savePlayers(){
  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );
}


function addPlayer(){

  let input = document.getElementById("playerName");
  let name = input.value.trim();

  if(name === ""){
    alert("請輸入姓名");
    return;
  }

  players.push(name);

  savePlayers();

  input.value="";

  showPlayers();
}


function removePlayer(index){

  players.splice(index,1);

  savePlayers();

  showPlayers();

}


function showPlayers(){

  let list=document.getElementById("playerList");

  list.innerHTML="";

  players.forEach((p,i)=>{

    let li=document.createElement("li");

    li.innerHTML =
    p+" <button onclick='removePlayer("+i+")'>❌</button>";

    list.appendChild(li);

  });

}


function start(){

 let courts=
 Number(document.getElementById("courtCount").value);

 let people=
 Number(document.getElementById("peopleCount").value);


 let result=createSchedule(
   players,
   courts,
   people
 );


 document.getElementById("result").innerHTML=
 result.join("<br>");

}


showPlayers();
