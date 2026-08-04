// 🏸 羽球輪轉小幫手 V8.1 Stable
// scheduler.js


// ======================
// 建立排場
// ======================


function createSchedule(
    players,
    courts,
    playersPerCourt
){


    let list =
    [...players];



    // 隨機打亂

    list.sort(
        ()=>Math.random()-0.5
    );




    let result = {


        courts:[],


        resting:[]

    };




    let need =
    courts *
    playersPerCourt;



    let playing =
    list.slice(
        0,
        need
    );



    let resting =
    list.slice(
        need
    );





    // 建立球場


    for(
        let i=0;
        i<courts;
        i++
    ){


        let start =
        i *
        playersPerCourt;



        let group =
        playing.slice(
            start,
            start+
            playersPerCourt
        );



        let half =
        Math.ceil(
            group.length/2
        );



        result.courts.push({

            name:
            "第"+
            (i+1)+
            "場",


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





    result.resting =
    resting;



    return result;


}







// ======================
// 取得上場名字
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
// 更新休息時間
// ======================


function updateRestTime(
    players,
    playingNames,
    minutes
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
            (p.restMinutes||0)
            +
            minutes;


        }



    });



}








// ======================
// 換場球員
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
