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



  players.forEach(
  function(name,index){



    let li =
    document.createElement("li");



    li.innerHTML =
    name+
    " <button onclick='removePlayer("
    +index+
    ")'>❌</button>";



    list.appendChild(li);



  });


}




function startGame(){


  if(players.length===0){

    alert("請先新增球友");

    return;

  }


  round=0;


  makeRound();


}




function nextRound(){


  round++;


  makeRound();


}





function makeRound(){


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



 let data =
 createSchedule(
   players,
   courts,
   people,
   round,
   mode
 );



 let text="";


 data.forEach(
 function(item){


  text +=
  item.text+
  "<br>";


 });



 document.getElementById("result")
 .innerHTML=text;



 recordGames(data);


 updateStats();


}





function updateStats(){


 let box =
 document.getElementById("stats");


 box.innerHTML =
 getStatsText();


}





function clearToday(){


 localStorage.removeItem("stats");


 round=0;


 document.getElementById("result")
 .innerHTML =
 "已清除今日紀錄";


 updateStats();


}





showPlayers();

updateStats();
