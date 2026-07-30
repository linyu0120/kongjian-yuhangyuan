function createSchedule(players, courts, people, round){

  let result = [];


  if(players.length < people){

    return [
      "⚠️ 人數不足，無法排場"
    ];

  }


  let total =
  players.length;


  let index =
  (round * people * courts)
  % total;



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

      group.push(
        players[index % total]
      );


      index++;

    }



    result.push(

      "🏟 第 "
      + c
      + " 場："
      + group.join("、")

    );


  }


  let used =
  courts * people;


  let rest =
  [];


  for(
    let i = 0;
    i < total;
    i++
  ){

    if(
      !result.join("").includes(players[i])
    ){

      rest.push(players[i]);

    }

  }



  if(rest.length > 0){

    result.push(
      "🪑 休息："
      + rest.join("、")
    );

  }



  return result;

}
