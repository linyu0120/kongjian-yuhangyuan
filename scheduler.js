// 🏸 羽球輪轉小幫手 V9 Final Ultimate
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



    // 先依休息時間排序
    list.sort(
    (a,b)=>{

        return (
            (b.restMinutes||0)
            -
            (a.restMinutes||0)
        );

    });



    // 同休息時間再隨機
    list =
    shuffleArray(list);





    let need =
    courts *
    perCourt;



    let playing =
    list.slice(
        0,
        need
    );



    let resting =
    list.slice(
        need
    );





    let courtList=[];



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



        courtList.push({


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
        courtList,


        resting:
        resting


    };


}







// ======================
// 取得目前上場名字
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
// 取代場上球員
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
