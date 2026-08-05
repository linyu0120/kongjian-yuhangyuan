// 🏸 羽球輪轉小幫手 V9.4 Final Ultimate
// scheduler.js



// ======================
// 建立公平排場
// ======================


function createSchedule(

    players,

    courts,

    perCourt

){


    let list=[...players];



    /*
      排序優先：

      1. 休息分鐘最多
      2. 上場次數最少
      3. 隨機打散
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



        return (

        (a.playCount||0)

        -

        (b.playCount||0)

        );



    });




    // 同條件增加隨機性

    let topShuffle=

    shuffleArray(list);



    topShuffle.sort(

    (a,b)=>{


        let rest =

        (b.restMinutes||0)

        -

        (a.restMinutes||0);



        if(rest!==0){

            return rest;

        }



        return (

        (a.playCount||0)

        -

        (b.playCount||0)

        );


    });








    let need =

    courts *

    perCourt;






    let playing =

    topShuffle.slice(

        0,

        need

    );







    let resting =

    topShuffle.slice(

        need

    );








    let courtList=[];



    let index=0;






    for(

        let i=1;

        i<=courts;

        i++

    ){



        let group =

        playing.slice(

            index,

            index+perCourt

        );



        index+=perCourt;






        let half =

        Math.ceil(

            group.length/2

        );






        courtList.push({


            name:

            "第"+i+"場",



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
// 洗牌
// ======================


function shuffleArray(arr){



    let array=[...arr];



    for(

        let i=array.length-1;

        i>0;

        i--

    ){



        let j=

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
