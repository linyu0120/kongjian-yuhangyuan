function recordGames(groups){


let stats =
loadData("stats") || {};



groups.forEach(function(group){


group.players.forEach(function(name){



if(!stats[name]){


stats[name]={

 play:0

};


}



stats[name].play++;



});



});



saveData(
"stats",
stats
);


}





function getStatsText(){


let stats =
loadData("stats") || {};



let text="";



Object.keys(stats).forEach(
function(name){


text +=
name+
"：出場 "+
stats[name].play+
" 次<br>";



});



return text || "尚無資料";


}
