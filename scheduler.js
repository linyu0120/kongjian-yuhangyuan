// 🏸 羽球輪轉小幫手 V9.1 Stable
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



    // 公平排序
    // 休息最多優先

    list.sort(

    (a,b)=>{


        let restA =
        a.restMinutes||0;


        let restB =
        b.restMinutes||0;



        if(restA!==restB){

            return restB-restA;

        }



        // 同休息時間隨機

        return Math.random()-0.5;


    });


    



    let need =
    courts *
    perCourt;



    let playing=[];

    let resting=[];




    // 取出上場名單

    playing =
    list.slice(
        0,
        need
    );



    resting =
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





        // 確保人數不足保護

        if(
            group.length <
            perCourt
        ){

            continue;

        }






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





    return{


        courts:

        courtList,


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

            if(
                !names.includes(
                    p.name
                )
            ){

                names.push(
                    p.name
                );

            }

        });



        court.teamB.forEach(

        p=>{


            if(
                !names.includes(
                    p.name
                )
            ){

                names.push(
                    p.name
                );

            }


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
// 替換球場球員
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
