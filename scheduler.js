 // 🏸 羽球輪轉小幫手 V8.1 Stable
// scheduler.js



// ======================
// 建立排場
// ======================


function createSchedule(
    players,
    courts,
    perCourt
){


    let sorted =
    [...players]
    .sort(
        (a,b)=>
        a.playCount-b.playCount
    );



    let need =
    courts * perCourt;



    let selected =
    sorted.slice(
        0,
        need
    );



    let resting =
    sorted.slice(
        need
    );





    let courtList=[];



    let index=0;



    for(
        let i=0;
        i<courts;
        i++
    ){


        let team =

        selected.slice(
            index,
            index+perCourt
        );


        index+=perCourt;



        let half =
        Math.ceil(
            team.length/2
        );



        courtList.push({

            name:
            "第"+(i+1)+"場",


            teamA:
            team.slice(
                0,
                half
            ),


            teamB:
            team.slice(
                half
            )


        });


    }



    return {

        courts:
        courtList,


        resting:
        resting

    };


}







// ======================
// 取得上場名單
// ======================


function getPlayingNames(result){


    let names=[];



    result.courts.forEach(
    court=>{


        court.teamA.forEach(
        p=>{

            names.push(
                p.name
            );

        });



        court.teamB.forEach(
        p=>{

            names.push(
                p.name
            );

        });



    });



    return names;


}








// ======================
// 更新休息與上場統計
// ======================


function updateRestTime(
    players,
    playingNames,
    minutes=5
){



    players.forEach(
    p=>{


        if(
            playingNames.includes(
                p.name
            )
        ){


            p.playCount =
            (p.playCount||0)+1;



            p.restMinutes=0;


        }
        else{


            p.restMinutes =
            Math.min(
                30,
                (p.restMinutes||0)
                +minutes
            );


        }


    });


}







// ======================
// 換人更新
// ======================


function replaceCourtPlayers(
    court,
    players
){



    let half =
    Math.ceil(
        players.length/2
    );



    court.teamA =
    players.slice(
        0,
        half
    );


    court.teamB =
    players.slice(
        half
    );



}
