// 🏸 空間羽航員 V6.1 Stable
// 排場核心

function createSchedule(players, courtCount, playerPerCourt) {

    let totalNeed = courtCount * playerPerCourt;

    let sortedPlayers = [...players];


    // 依照休息時間排序
    sortedPlayers.sort((a,b)=>{

        if(b.restMinutes !== a.restMinutes){

            return b.restMinutes - a.restMinutes;

        }


        return a.playCount - b.playCount;

    });



    let playing = sortedPlayers.slice(0,totalNeed);

    let resting = sortedPlayers.slice(totalNeed);



    let courts = [];

    let index = 0;



    for(let i=0;i<courtCount;i++){


        let courtPlayers =
            playing.slice(
                index,
                index + playerPerCourt
            );


        index += playerPerCourt;



        let half =
            Math.floor(
                playerPerCourt / 2
            );


        courts.push({

            name:
            `第${i+1}場`,

            teamA:
            courtPlayers.slice(0,half),

            teamB:
            courtPlayers.slice(half)

        });


    }



    return {

        courts,

        resting

    };

}






// 更新休息時間

function updateRestTime(players, playingNames, minutes){


    players.forEach(player=>{


        if(
            playingNames.includes(player.name)
        ){

            player.restMinutes = 0;

            player.playCount++;

        }

        else {


            player.restMinutes += minutes;


        }


    });


}






// 取得目前上場姓名

function getPlayingNames(schedule){


    let result=[];


    schedule.courts.forEach(court=>{


        court.teamA.forEach(p=>{

            result.push(p.name);

        });


        court.teamB.forEach(p=>{

            result.push(p.name);

        });


    });


    return result;


}
