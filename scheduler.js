function createSchedule(
  players,
  courts,
  people,
  round,
  mode
){


let result=[];


if(players.length < people){

 return [
  "⚠️ 球友人數不足"
 ];

}



let total =
players.length;



// 輪轉位移
let start =
(round * people * courts)
% total;



let used=[];



for(
let c=1;
c<=courts;
c++
){


 let group=[];



 for(
 let i=0;
 i<people;
 i++
 ){


  let index =
  (start+i)%total;



  let player =
  players[index];



  group.push(player);



  used.push(player);



 }



 result.push(
 "🏟 第 "
 +c+
 " 場（"+
 modeName(mode)+
 "）："+
 group.join("、")
 );


 start += people;


}





let rest =
players.filter(
p=>!used.includes(p)
);



if(rest.length){

 result.push(
 "🪑 休息："+
 rest.join("、")
 );

}



return result;


}





function modeName(mode){


if(mode==="double"){

return "雙打";

}


if(mode==="rotate"){

return "輪替";

}


return "自由";

}
