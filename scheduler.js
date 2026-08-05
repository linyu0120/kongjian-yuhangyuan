// 🏸 羽球輪轉小幫手 V9.2 Fair Rotation
// scheduler.js



// ======================
// 建立排場
// ======================


function createSchedule(
    players,
    courts,
    perCourt
){



    let list =
    [...players];



    let need =
    courts *
    perCourt;





    /*
      公平排序

      1. 休息時間多的人優先
      2. 上場少的人優先
      3. 同條件隨機
    */


    list.sort(
    (a,b)=>{


        let restDiff =

        (b.restMinutes||0)

        -

        (a.restMinutes||0);



        if(restDiff!==0){

            return restDiff;

        }



        let playDiff =

        (a.playCount||0)

        -

        (b.playCount||0);



        if(playDiff!==0){

            return playDiff;

        }



        return Math.random()-0.5;


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






    let courtsData=[];



    let index=0;




    for(
        let c=1;
        c<=courts;
        c++
    ){


        let group =

        playing.slice(
            index,
            index+perCourt
        );



        index += perCourt;




        let half =

        Math.ceil(
            group.length/2
        );




        courtsData.push({



            name:

            "第"+c+"場",




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



        courts:

        courtsData,



        resting:

        resting



    };


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
// 換人後重新整理
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









// ======================
// 洗牌
// ======================


function shuffleArray(arr){


    let array =
    [...arr];



    for(
        let i=array.length-1;
        i>0;
        i--
    ){


        let j =

        Math.floor(

            Math.random()

            *

            (i+1)

        );



        [
        array[i],
        array[j]

        ]

        =

        [

        array[j],
        array[i]

        ];



    }



    return array;


}
