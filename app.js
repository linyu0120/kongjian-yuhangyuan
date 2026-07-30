let players = JSON.parse(localStorage.getItem("players")) || [];

let currentRound = 0;



function savePlayers(){

  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );

}



function addPlayer(){

  let input =
  document.getElementById("playerName");


  let name =
  input.value.trim();


  if(name === ""){

    alert("請輸入球友姓名");

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


 let list =
 document.getElementById("playerList");


 list.innerHTML="";


 players.forEach(function(player,index){


   let li =
   document.createElement("li");


   li.innerHTML =
   player +
   " <button onclick='removePlayer("+
   index+
   ")'>❌</button>";


   list.appendChild(li);


 });


}




function startSchedule(){


 if(players.length===0){

   alert("請先加入球友");

   return;

 }


 currentRound=0;


 let courts =
 Number(
 document.getElementById("courtCount").value
 );


 let people =
 Number(
 document.getElementById("peopleCount").value
 );


 let result =
 createSchedule(
 players,
 courts,
 people,
 currentRound
 );


 showResult(result);


}





function nextRound(){


 currentRound++;


 let courts =
 Number(
 document.getElementById("courtCount").value
 );


 let people =
 Number(
 document.getElementById("peopleCount").value
 );


 let result =
 createSchedule(
 players,
 courts,
 people,
 currentRound
 );


 showResult(result);


}





function showResult(data){


 let box =
 document.getElementById("result");


 box.innerHTML =
 data.join("<br>");

}





showPlayers();
