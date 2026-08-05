// 🏸 羽球輪轉小幫手 V9.2 Final Ultimate
// scheduler.js



// ======================
// 建立排場
// ======================


function createSchedule(

    players,

    courts,

    perCourt

){



    let list=[...players];





    // 依休息時間排序
    // 休息越久越優先


    list.sort(

    (a,b)=>{


        let restA =
        a.restMinutes || 0;


        let restB =
        b.restMinutes || 0;



        return restB-restA;


    });



    // 同休息時間打散

    let grouped =
    shuffleArray(list);





    grouped.sort(

    (a,b)=>{


        return (

        (b.restMinutes||0)

        -

        (a.restMinutes||0)

        );


    });







    let need =

    courts *

    perCourt;







    let playing =

    grouped.slice(

        0,

        need

    );






    let resting =

    grouped.slice(

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



        index += perCourt;






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
// 更新休息統計
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
// 計算休息排序
// ======================


function getRestOrder(players){



    return [...players]

    .sort(

    (a,b)=>{


        return (

        (b.restMinutes||0)

        -

        (a.restMinutes||0)

        );


    });



}








// ======================
// 洗牌
// ======================


function shuffleArray(array){



    let arr=[...array];



    for(

        let i=

        arr.length-1;

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

        arr[i],

        arr[j]

        ]

        =

        [

        arr[j],

        arr[i]

        ];



    }




    return arr;



}
