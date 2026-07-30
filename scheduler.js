function createSchedule(
  players,
  courts,
  people,
  round,
  mode
){

  let result = [];


  if(players.length < people){

    return [
      "⚠️ 球友人數不足，無法排場"
    ];

  }



  let total = players.length;



  // 輪轉起點
  let start =
  (round * people) % total;



  let used = [];



  for(
    let c = 1;
    c <= courts;
    c++
  ){


    let group = [];



    for(
      let i = 0;
      i < people;
      i++
    ){


      let index =
      (start + i + ((c-1)*people))
      % total;



      let name =
      players[index];



      group.push(name);


      used.push(name);


    }



    result.push({

      court:c,

      players:group,

      text:
      "🏟 第 "
      +c+
      " 場（"
      +getModeName(mode)+
      "）："
      +group.join("、")

    });


  }



  let rest =
  players.filter(
    function(p){

      return !used.includes(p);

    }
  );



  if(rest.length){

    result.push({

      court:0,

      players:rest,

      text:
      "🪑 休息："
      +rest.join("、")

    });

  }



  return result;


}





function getModeName(mode){


switch(mode){


case "double":

return "雙打";


case "rotate":

return "輪替";


default:

return "自由";


}



}
