// 🏸 羽球輪轉小幫手 V8.2 Stable Final
// app.js Part 1

let clubPlayers = [];
let todayPlayers = [];
let rounds = [];

let settings = {
    courts: 3,
    players: 4
};


// ======================
// 初始化
// ======================

window.onload = function(){

    loadClubData();


    if(!currentClub){

        let setup =
        document.getElementById(
            "clubSetup"
        );

        if(setup){
            setup.style.display="flex";
        }

    }


    renderAll();

};



// ======================
// 建立球團
// ======================

function createNewClub(){

    let input =
    document.getElementById(
        "clubNameInput"
    );


    let name =
    input.value.trim();


    if(!name)return;


    if(createClub(name)){


        document
        .getElementById(
            "clubSetup"
        )
        .style.display="none";


        loadClubData();


        renderAll();


        showClubName();

    }

}





function showClubName(){

    let box =
    document.getElementById(
        "currentClubName"
    );


    if(box){

        box.innerText =
        "目前球團：" + currentClub;

    }

}






// ======================
// 儲存資料
// ======================

function saveData(){

    let club =
    getCurrentClub();


    if(!club)return;


    club.players =
    clubPlayers;


    club.todayPlayers =
    todayPlayers;


    club.rounds =
    rounds;


    club.settings =
    settings;


    saveClubs();

}





// ======================
// 球友管理
// ======================

function addClubPlayer(){

    let input =
    document.getElementById(
        "newPlayerName"
    );


    let name =
    input.value.trim();


    if(!name)return;


    if(
        clubPlayers.some(
            p=>p.name===name
        )
    ){

        alert(
            "已有此球友"
        );

        return;

    }



    clubPlayers.push({

        name:name,

        restMinutes:0,

        playCount:0

    });


    input.value="";


    saveData();


    renderClubPlayers();

}





function renderClubPlayers(){

    let box =
    document.getElementById(
        "clubPlayerList"
    );


    if(!box)return;


    box.innerHTML="";



    clubPlayers.forEach(
    (p,i)=>{


        let div =
        document.createElement(
            "div"
        );


        div.className =
        "player-item";


        div.innerHTML = `

        <span>
        ${p.name}
        </span>


        <button onclick="addToToday(${i})">
        加入今日
        </button>


        <button onclick="deleteClubPlayer(${i})">
        刪除
        </button>

        `;


        box.appendChild(div);


    });


}





function deleteClubPlayer(i){

    clubPlayers.splice(
        i,
        1
    );


    saveData();


    renderClubPlayers();

}







// ======================
// 今日到場
// ======================

function addToToday(index){


    let player =
    clubPlayers[index];


    if(
        todayPlayers.some(
            p=>p.name===player.name
        )
    ){

        return;

    }



    todayPlayers.push({

        name:player.name,

        restMinutes:0,

        playCount:0,

        checked:true

    });



    saveData();


    renderTodayPlayers();

}





function removeToday(index){

    todayPlayers.splice(
        index,
        1
    );


    saveData();


    renderTodayPlayers();

}





function togglePlayer(index){


    todayPlayers[index].checked =
    !todayPlayers[index].checked;


    saveData();


    renderTodayPlayers();

}





function renderTodayPlayers(){

    let box =
    document.getElementById(
        "todayPlayerList"
    );


    if(!box)return;


    box.innerHTML="";



    todayPlayers.forEach(
    (p,i)=>{


        let div =
        document.createElement(
            "div"
        );


        div.className =
        "player-item";


        div.innerHTML = `


        <label>

        <input
        type="checkbox"
        ${p.checked!==false?"checked":""}
        onchange="togglePlayer(${i})">


        ${p.name}


        🏸${p.playCount}場


        🪑${p.restMinutes}分


        </label>


        <button onclick="removeToday(${i})">

        移除

        </button>


        `;


        box.appendChild(div);


    });


}



// ======================
// 下一輪排場
// ======================

function nextRound(){


    let activePlayers =
    todayPlayers
    .filter(
        p=>p.checked!==false
    );


    // 隨機洗牌
    activePlayers =
    shuffleArray(activePlayers);



    let need =
    settings.courts *
    settings.players;



    if(activePlayers.length < need){

        alert(
            "到場人數不足，需要 "
            + need +
            " 人"
        );

        return;

    }



    let result =
    createSchedule(
        activePlayers,
        settings.courts,
        settings.players
    );



    rounds.push({

        courts:
        result.courts,


        resting:
        result.resting

    });



    updateRestTime(

        activePlayers,

        getPlayingNames(result),

        5

    );



    saveData();


    renderRounds();


    renderStatistics();

}





// ======================
// 洗牌
// ======================

function shuffleArray(array){

    let arr =
    [...array];


    for(
        let i=arr.length-1;
        i>0;
        i--
    ){

        let j =
        Math.floor(
            Math.random()
            *(i+1)
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







// ======================
// 顯示排場
// ======================

function renderRounds(){


    let box =
    document.getElementById(
        "roundContainer"
    );


    if(!box)return;


    box.innerHTML="";



    rounds.forEach(
    (round,r)=>{


        let card =
        document.createElement(
            "div"
        );


        card.className =
        "round-card";



        let html = `

        <h3>
        第${r+1}輪
        </h3>

        `;



        round.courts.forEach(
        (court,c)=>{


            html += `

            <div class="court">


            <b>
            ${court.name}
            </b>



            <div class="team">


            ${
            renderPlayersButtons(
                court.teamA,
                r,
                c,
                "A"
            )
            }


            <span>
            VS
            </span>


            ${
            renderPlayersButtons(
                court.teamB,
                r,
                c,
                "B"
            )
            }


            </div>


            </div>


            `;


        });




        html += `

        <div class="rest-box">

        🪑休息：

        ${
        round.resting
        .map(
            p=>
            p.name+
            "("+
            p.restMinutes+
            "分)"
        )
        .join("、")
        }

        </div>

        `;



        card.innerHTML =
        html;


        box.appendChild(card);


    });



    let count =
    document.getElementById(
        "roundCount"
    );


    if(count){

        count.innerText =
        rounds.length;

    }


}






// ======================
// 產生球員按鈕
// ======================

function renderPlayersButtons(
    players,
    r,
    c,
    team
){


    return players
    .map(
    (p,i)=>{


        return `

        <button
        class="player-select-btn"
        onclick="
        changePlayer(
        ${r},
        ${c},
        '${team}',
        ${i},
        this
        )">

        ${p.name}

        </button>


        `;


    })
    .join("");

}






// ======================
// 點名字換人
// ======================

function changePlayer(
r,
c,
team,
index,
button
){


    let court =
    rounds[r]
    .courts[c];



    let select =
    document.createElement(
        "select"
    );


    select.className =
    "player-select";



    let playingNames =
    getPlayingNames(
        {
            courts:[
                court
            ]
        }
    );



    todayPlayers
    .filter(
        p=>
        p.checked!==false &&
        (
            p.name===
            button.innerText
            ||
            !playingNames.includes(
                p.name
            )
        )
    )
    .forEach(
    p=>{


        let option =
        document.createElement(
            "option"
        );


        option.value =
        p.name;


        option.textContent =
        p.name;



        if(
            p.name===
            button.innerText
        ){

            option.selected=true;

        }



        select.appendChild(option);


    });





    select.onchange=function(){


        let newPlayer =
        todayPlayers.find(
            p=>
            p.name===
            this.value
        );


        if(!newPlayer)return;



        let oldPlayer;



        if(team==="A"){

            oldPlayer =
            court.teamA[index];

            court.teamA[index]=
            newPlayer;

        }
        else{

            oldPlayer =
            court.teamB[index];

            court.teamB[index]=
            newPlayer;

        }




        if(oldPlayer){

            oldPlayer.playCount =
            Math.max(
            0,
            oldPlayer.playCount-1
            );

        }



        newPlayer.playCount++;



        newPlayer.restMinutes=0;



        saveData();


        renderRounds();


        renderStatistics();


    };





    button.parentElement
    .replaceChild(
        select,
        button
    );


    select.focus();


}

// ======================
// 統計
// ======================

function renderStatistics(){

    let box =
    document.getElementById(
        "statisticsBox"
    );


    if(!box)return;


    box.innerHTML="";


    todayPlayers.forEach(
    p=>{

        box.innerHTML += `

        <p>

        ${p.name}

        🏸 上場 ${p.playCount || 0} 場

        🪑 休息 ${p.restMinutes || 0} 分

        </p>

        `;

    });

}





// ======================
// 設定
// ======================

function openSettings(){

    document
    .getElementById(
        "settingModal"
    )
    .style.display="flex";


    document
    .getElementById(
        "courtSetting"
    )
    .value =
    settings.courts;


    document
    .getElementById(
        "playerPerCourt"
    )
    .value =
    settings.players;

}



function closeSettings(){

    document
    .getElementById(
        "settingModal"
    )
    .style.display="none";

}



function saveSettings(){

    settings={

        courts:
        Number(
        document
        .getElementById(
            "courtSetting"
        ).value),


        players:
        Number(
        document
        .getElementById(
            "playerPerCourt"
        ).value)

    };


    saveData();


    document
    .getElementById(
        "courtCount"
    )
    .innerText =
    settings.courts;


    closeSettings();

}





// ======================
// 搜尋
// ======================

function searchTodayPlayers(){

    renderTodayPlayers();

}



function searchClubPlayers(){

    renderClubPlayers();

}







// ======================
// 匯入球友名單
// ======================

function importPlayers(){


    let box =
    document.getElementById(
        "importPlayers"
    );


    let text =
    box.value.trim();



    if(!text)return;



    let names =
    text
    .split("\n")
    .map(
        n=>n.trim()
    )
    .filter(
        n=>n
    );



    names.forEach(
    name=>{


        if(
            !clubPlayers.some(
                p=>p.name===name
            )
        ){


            clubPlayers.push({

                name:name,

                restMinutes:0,

                playCount:0

            });


        }


    });



    box.value="";


    saveData();


    renderClubPlayers();


}








// ======================
// 全部加入今日
// ======================

function addAllToday(){


    clubPlayers.forEach(
    p=>{


        if(
            !todayPlayers.some(
                x=>x.name===p.name
            )
        ){


            todayPlayers.push({

                name:p.name,

                restMinutes:0,

                playCount:0,

                checked:true

            });


        }


    });



    saveData();


    renderTodayPlayers();


}








// ======================
// 球團管理
// ======================

function renderClubList(){


    let box =
    document.getElementById(
        "clubList"
    );


    if(!box)return;



    box.innerHTML="";



    clubs.forEach(
    c=>{


        let div =
        document.createElement(
            "div"
        );


        div.className =
        "player-item";



        div.innerHTML=`


        <span>
        ${c.name}
        </span>


        <button onclick="switchClub('${c.name}')">

        切換

        </button>



        <button onclick="deleteClub('${c.name}')">

        刪除

        </button>


        `;



        box.appendChild(div);


    });


}





function createNewClubFromList(){


    let name =
    document
    .getElementById(
        "newClubName"
    )
    .value
    .trim();



    if(!name)return;



    if(
        createClub(name)
    ){

        loadClubData();


        renderAll();

    }


}








// ======================
// 全部更新
// ======================

function renderAll(){


    loadClubData();



    renderClubPlayers();


    renderTodayPlayers();


    renderRounds();


    renderStatistics();



    showClubName();



    let count =
    todayPlayers.filter(
        p=>p.checked!==false
    ).length;



    let todayBox =
    document.getElementById(
        "todayCount"
    );


    if(todayBox){

        todayBox.innerText =
        count;

    }



    let courtBox =
    document.getElementById(
        "courtCount"
    );


    if(courtBox){

        courtBox.innerText =
        settings.courts;

    }


}
