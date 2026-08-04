 // 🏸 羽球輪轉小幫手 V8.0 Stable
// app.js - Part 1


let clubPlayers=[];

let todayPlayers=[];

let rounds=[];


let settings={
    courts:3,
    players:4
};





// ======================
// 初始化
// ======================


window.onload=function(){


    loadClubData();


    if(!currentClub){

        document
        .getElementById("clubSetup")
        .style.display="flex";

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



    if(
        createClub(name)
    ){


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

        box.innerHTML =
        "目前球團：" +
        currentClub;

    }


}






// ======================
// 選單
// ======================


function toggleMenu(){


    document
    .getElementById(
        "sideMenu"
    )
    .classList.toggle(
        "open"
    );


    document
    .getElementById(
        "overlay"
    )
    .classList.toggle(
        "show"
    );


}





// ======================
// 頁面
// ======================


function hidePages(){


    document
    .querySelectorAll(
        "main section"
    )
    .forEach(
        s=>s.classList.add(
            "hidden"
        )
    );


}




function showHome(){

    hidePages();


    document
    .getElementById(
        "schedulePage"
    )
    .classList.remove(
        "hidden"
    );


    toggleMenu();

}





function showTodayPlayers(){

    hidePages();


    document
    .getElementById(
        "todayPlayersPage"
    )
    .classList.remove(
        "hidden"
    );


    renderTodayPlayers();


    toggleMenu();


}





function showClubPlayers(){

    hidePages();


    document
    .getElementById(
        "clubPlayersPage"
    )
    .classList.remove(
        "hidden"
    );


    renderClubPlayers();


    toggleMenu();


}





function showStatistics(){

    hidePages();


    document
    .getElementById(
        "statisticsPage"
    )
    .classList.remove(
        "hidden"
    );


    renderStatistics();


    toggleMenu();


}





function showClubManager(){


    hidePages();


    document
    .getElementById(
        "clubManagerPage"
    )
    .classList.remove(
        "hidden"
    );


    renderClubList();


    toggleMenu();


}





// ======================
// 儲存
// ======================

function saveData(){

    let club = getCurrentClub();


    if(!club){

        return;

    }


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
// 球友新增
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


        div.className=
        "player-item";



        div.innerHTML=`

        <span>
        ${p.name}
        </span>

        <button onclick="addToToday(${i})">
        加入
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


    let p =
    clubPlayers[index];



    if(
        todayPlayers.some(
            x=>x.name===p.name
        )
    ){

        return;

    }



    todayPlayers.push({

        name:p.name,

        restMinutes:0,

        playCount:0,

        checked:true


    });



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


        div.className=
        "player-item";



        div.innerHTML=`

        <label>

        <input
        type="checkbox"
        ${p.checked?"checked":""}
        onchange="togglePlayer(${i})">

        ${p.name}

        🪑${p.restMinutes}分

        🏸${p.playCount}場

        </label>


        <button onclick="removeToday(${i})">

        移除

        </button>


        `;



        box.appendChild(div);



    });


}





function togglePlayer(i){


    todayPlayers[i].checked =
    !todayPlayers[i].checked;


    saveData();

}





function confirmTodayPlayers(){


    saveData();


    alert(
        "已更新到場名單"
    );


}





function removeToday(i){


    todayPlayers.splice(
        i,
        1
    );


    saveData();


    renderTodayPlayers();


}





// ======================
// 排場
// ======================


function nextRound(){



    let activePlayers =
    todayPlayers.filter(
        p=>p.checked!==false
    );



    if(
        activePlayers.length<
        settings.courts*
        settings.players
    ){

        alert(
        "到場人數不足"
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

        time:
        new Date()
        .toLocaleTimeString(),


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


}





function renderRounds(){


    let box =
    document.getElementById(
        "roundContainer"
    );


    if(!box)return;



    box.innerHTML="";



    rounds.forEach(
    (round,index)=>{


        let card =
        document.createElement(
            "div"
        );


        card.className=
        "round-card";



        let html=`

        <h3>
        第${index+1}輪
        </h3>


        `;



        round.courts.forEach(
        (court,cIndex)=>{


            html+=`

            <div class="court">


            <b>
            ${court.name}
            </b>


            <p>

            ${court.teamA.map(
                p=>p.name
            ).join("、")}

            VS

            ${court.teamB.map(
                p=>p.name
            ).join("、")}


            </p>


            <button onclick="editCourt(${index},${cIndex})">

            換人

            </button>


            </div>


            `;



        });




        html+=`

        <div class="rest-box">

        🪑休息：

${round.resting.map(
p=>p.name+"("+p.restMinutes+"分)"
).join("、")}

        </div>

        `;



        card.innerHTML=
        html;


        box.appendChild(
            card
        );



    });



    document
    .getElementById(
        "roundCount"
    )
    .innerText =
    rounds.length;



}






function editCourt(r,c){

    let names =
    prompt(
    "輸入新上場名單，用逗號分隔"
    );


    if(!names)return;


    let players =
    names
    .split(",")
    .map(
        n=>n.trim()
    )
    .filter(
        n=>n
    );


    let newPlayers =
    players.map(
        name=>{

            let old =
            todayPlayers.find(
                p=>p.name===name
            );


            if(old){

                return old;

            }


            return {

                name:name,

                restMinutes:0,

                playCount:0,

                checked:true

            };

        }
    );



    replaceCourtPlayers(
        rounds[r].courts[c],
        newPlayers
    );



    newPlayers.forEach(
    p=>{

        p.playCount++;

        p.restMinutes=0;

    });



    todayPlayers.forEach(
    p=>{

        if(
            !getPlayingNames(
                {
                    courts:
                    rounds[r].courts
                }
            )
            .includes(p.name)
        ){

            if(p.restMinutes<30){

                p.restMinutes+=5;

            }

        }

    });



    saveData();

    renderRounds();

    renderStatistics();

}






// ======================
// 清除排場
// ======================


function clearRounds(){


    if(
        !confirm(
        "清除今日排場？"
        )
    ){

        return;

    }



    rounds=[];


    saveData();


    renderRounds();



}




// ======================
// 設定
// ======================


function openSettings(){


    let modal =
    document.getElementById(
        "settingModal"
    );


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



    modal.style.display="flex";


}




function closeSettings(){


    document
    .getElementById(
        "settingModal"
    )
    .style.display="none";


}





function saveSettings(){


    let courts =
    Number(
    document.getElementById(
        "courtSetting"
    ).value
    );



    let players =
    Number(
    document.getElementById(
        "playerPerCourt"
    ).value
    );



    settings={

        courts:courts,

        players:players

    };



    saveData();



    document
    .getElementById(
        "courtCount"
    )
    .innerText =
    courts;



    closeSettings();


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


        box.innerHTML+=`

        <p>

        ${p.name}

        🏸${p.playCount}場

        🪑${p.restMinutes}分

        </p>

        `;


    });


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



        div.className=
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


    let input =
    document.getElementById(
        "newClubName"
    );



    let name =
    input.value.trim();



    if(
        createClub(name)
    ){


        input.value="";


        loadClubData();


        showClubName();


        renderAll();


    }



}







// ======================
// 匯入名單
// ======================


function importPlayers(){


    let textarea =
    document.getElementById(
        "importPlayers"
    );


    let text =
    textarea.value.trim();



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



    textarea.value="";


    saveData();


    renderClubPlayers();


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
// 全部更新
// ======================


function renderAll(){


    loadClubData();



    renderClubPlayers();


    renderTodayPlayers();


    renderRounds();



    renderStatistics();



    showClubName();

document
.getElementById(
    "todayCount"
)
.innerText =
todayPlayers.filter(
    p=>p.checked!==false
).length;

  

    document
    .getElementById(
        "courtCount"
    )
    .innerText =
    settings.courts;


}
