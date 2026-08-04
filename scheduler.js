// 🏸 空間羽航員 V6.2 Stable
// 隨機公平排場核心


function createSchedule(players, courtCount, playerPerCourt) {


    let totalNeed =
    courtCount * playerPerCourt;



    // 複製避免直接改原資料
    let pool = [...players];



    // 依照休息時間 + 出場次數排序
    pool.sort((a,b)=>{


        let scoreA =
        a.restMinutes - (a.playCount * 5);


        let scoreB =
        b.restMinutes - (b.playCount * 5);



        return scoreB - scoreA;


    });



    // 取前面候選
    let candidates =
    pool.slice(
        0,
        Math.min(
            totalNeed + 6,
            pool.length
        )
    );



    // 隨機洗牌
    candidates =
    shuffle(candidates);



    // 最終上場
    let playing =
    candidates.slice(
        0,
        totalNeed
    );



    // 休息
    let resting =
    players.filter(
        p =>
        !playing.some(
            x=>x.name===p.name
        )
    );



    // 再洗一次上場順序
    playing =
    shuffle(playing);



    let courts=[];


    let index=0;



    for(
        let i=0;
        i<courtCount;
        i++
    ){


        let courtPlayers =
        playing.slice(
            index,
            index + playerPerCourt
        );


        index += playerPerCourt;



        let half =
        Math.floor(
            playerPerCourt/2
        );



        courts.push({

            name:
            `第${i+1}場`,


            teamA:
            shuffle(
                courtPlayers.slice(
                    0,
                    half
                )
            ),


            teamB:
            shuffle(
                courtPlayers.slice(
                    half
                )
            )


        });


    }



    return {

        courts,

        resting

    };


}





// =====================
// 隨機洗牌
// =====================

function shuffle(array){


    let result =
    [...array];



    for(
        let i=result.length-1;
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
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }



    return result;

}





// =====================
// 更新休息時間
// =====================

function updateRestTime(
    players,
    playingNames,
    minutes
){


    players.forEach(player=>{


        if(
            playingNames.includes(
                player.name
            )
        ){

            player.restMinutes=0;

            player.playCount++;

        }

        else{

            player.restMinutes += minutes;

        }


    });


}





// =====================
// 取得上場姓名
// =====================

function getPlayingNames(schedule){


    let result=[];



    schedule.courts.forEach(court=>{


        court.teamA.forEach(p=>{

            result.push(
                p.name
            );

        });



        court.teamB.forEach(p=>{

            result.push(
                p.name
            );

        });


    });



    return result;


}
