function recordGames(result){


let stats =
loadData("stats") || {};



result.forEach(function(line){


players.forEach(function(name){


if(line.includes(name)){


if(!stats[name]){


stats[name]={
 play:0
};


}



stats[name].play++;


}



});



});



saveData(
"stats",
stats
);


}
