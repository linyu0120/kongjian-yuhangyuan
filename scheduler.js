 // 🏸 羽球輪轉小幫手 V8.0 Stable
// scheduler.js
// 排場核心


function createSchedule(
    players,
    courtCount,
    playerPerCourt
){


    let need =
    courtCount * playerPerCourt;



    let list =
    [...players];



    // 隨機打散

    list.sort(
        ()=>Math.random()-0.5
    );



    // 優先讓休息久的人上場

    list.sort((a,b)=>{

        if(
            b.restMinutes !== a.restMinutes
        ){

            return b.restMinutes-a.restMinutes;

        }


        return a.playCount-b.playCount;

    });



    let playing =
    list.slice(
        0,
        need
    );



    let resting =
    list.slice(
        need
    );



    let courts=[];


    let index=0;



    for(
        let i=0;
        i<courtCount;
        i++
    ){


        let group =
        playing.slice(
            index,
            index+playerPerCourt
        );


        index+=playerPerCourt;



        let half =
        Math.floor(
            group.length/2
        );



        courts.push({

            name:
            `第${i+1}場`,


            teamA:
            group.slice(
                0,
                half
            ),


            teamB:
            group.slice(
                half
            )


        });


    }




    return {

        courts,

        resting

    };


}







// ======================
// 更新休息時間
// ======================


function updateRestTime(
    players,
    playingNames
){



    players.forEach(
    player=>{


        if(
            playingNames.includes(
                player.name
            )
        ){


            player.playCount++;


            player.restMinutes=0;



        }
        else{


            player.restMinutes +=5;



            if(
                player.restMinutes>30
            ){

                player.restMinutes=30;

            }


        }


    });


}







// ======================
// 取得上場名單
// ======================


function getPlayingNames(
    schedule
){


    let result=[];



    schedule.courts.forEach(
    court=>{


        court.teamA.forEach(
            p=>result.push(p.name)
        );


        court.teamB.forEach(
            p=>result.push(p.name)
        );


    });



    return result;


}





// ======================
// 隨機換人
// ======================


function replaceCourtPlayers(
    court,
    newPlayers
){


    let half =
    Math.floor(
        newPlayers.length/2
    );



    court.teamA =
    newPlayers.slice(
        0,
        half
    );



    court.teamB =
    newPlayers.slice(
        half
    );


}
