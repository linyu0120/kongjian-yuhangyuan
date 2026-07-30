function createSchedule(players,courts,people){

 let result=[];

 if(players.length < people){

   return [
    "人數不足，無法排場"
   ];

 }


 let index=0;


 for(let c=1;c<=courts;c++){

   let group=[];

   for(let i=0;i<people;i++){

     if(index >= players.length){
       index=0;
     }

     group.push(players[index]);

     index++;

   }


   result.push(
    "🏟 第 "+c+" 場："+group.join("、")
   );

 }


 return result;

}
