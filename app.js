let players =
loadData("players") || [];


let round = 0;



function savePlayers(){

 saveData(
   "players",
   players
 );

}




function addPlayer(){


 let input =
 document.getElementById("playerName");


 let name =
 input.value.trim();



 if(name===""){

  alert("請輸入球友姓名");

  return;

 }



 if(players.includes(name)){

  alert("此球友已存在");

  return;

 }



 players.push(name);



 savePlayers();


 input.value="";


 showPlayers();


 updateStats();


}




function removePlayer(i){


 players.splice(i,1);


 savePlayers();


 showPlayers();


}





function showPlayers(){


 let list =
 document.getElementById("playerList");


 list.innerHTML="";


 players.forEach(
 function(p,i){


 let li =
 document.createElement("li");



 li.innerHTML =
 p+
 " <button onclick='removePlayer("+i+")'>❌</button>";



 list.appendChild(li);



 });


}






function startGame(){


 if(players.length===0){

  alert("請先加入球友");

  return;

 }


 round=0;


 createRound();


}




function nextRound(){


 round++;


 createRound();


}





function createRound(){



 let courts =
 Number(
 document.getElementById("courtCount").value
 );



 let people =
 Number(
 document.getElementById("peopleCount").value
 );



 let mode =
 document.getElementById("mode").value;




 let result =
 createSchedule(
 players,
 courts,
 people,
 round,
 mode
 );



 document.getElementById("result")
 .innerHTML =
 result.join("<br>");



 recordGames(result);



 updateStats();



}





function clearToday(){


 localStorage.removeItem("stats");


 document.getElementById("result")
 .innerHTML="已清除今日資料";


 updateStats();


}




function updateStats(){


 let box =
 document.getElementById("stats");


 let stats =
 loadData("stats") || {};



 let text="";


 Object.keys(stats)
 .forEach(function(name){


 text +=
 name+
 "：出場 "+
 stats[name].play+
 " 次<br>";



 });



 box.innerHTML =
 text || "尚無資料";


}



showPlayers();

updateStats();
