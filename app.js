// 🏸 羽球輪轉小幫手 V8.2 Stable
// app.js Part 1


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


    let name =
    document
    .getElementById("clubNameInput")
    .value
    .trim();



    if(!name)return;



    if(createClub(name)){


        document
        .getElementById("clubSetup")
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
        "目前球團："+currentClub;

    }

}






// ======================
// 選單
// ======================

function toggleMenu(){


    document
    .getElementById("sideMenu")
    .classList.toggle("open");


    document
    .getElementById("overlay")
    .classList.toggle("show");


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
        s=>s.classList.add("hidden")
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






// ======================
// 儲存
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
// 球友新增
// ======================

function addClubPlayer(){


    let input =
    document
    .getElementById(
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
    document
    .getElementById(
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
    document
    .getElementById(
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
        ${p.checked!==false?"checked":""}
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


    renderAll();


}


// ======================
// 下一輪排場
// ======================

function nextRound(){


    let activePlayers =
    todayPlayers
    .filter(
        p=>p.checked!==false
    )
    .sort(
        ()=>Math.random()-0.5
    );



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
    (round,index)=>{


        let card =
        document.createElement(
            "div"
        );


        card.className =
        "round-card";



        let html = `

        <h3>
        第${index+1}輪
        </h3>

        `;



        round.courts.forEach(
        (court,c)=>{


            html += `

            <div class="court">

            <b>
            ${court.name}
            </b>


            <p>


            ${court.teamA.map(
            (p,i)=>

            `
            <button
            class="player-select-btn"
            onclick="changePlayer(${index},${c},'A',${i},this)">

            ${p.name}

            </button>

            `
            ).join("")}



            VS



            ${court.teamB.map(
            (p,i)=>

            `
            <button
            class="player-select-btn"
            onclick="changePlayer(${index},${c},'B',${i},this)">

            ${p.name}

            </button>

            `
            ).join("")}


            </p>


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



    document
    .getElementById(
        "roundCount"
    )
    .innerText =
    rounds.length;


}






// ======================
// 點名字換人
// ======================

function changePlayer(r,c,team,index,btn){


    let court =
    rounds[r].courts[c];



    let oldPlayer =
    team==="A"
    ?
    court.teamA[index]
    :
    court.teamB[index];



    let select =
    document.createElement(
        "select"
    );


    select.className =
    "player-select";



    todayPlayers
    .filter(
        p=>p.checked!==false
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
            p.name===oldPlayer.name
        ){

            option.selected=true;

        }



        select.appendChild(option);


    });





    select.onchange=function(){


        let newPlayer =
        todayPlayers.find(
            p=>p.name===this.value
        );



        if(!newPlayer)return;



        if(team==="A"){

            court.teamA[index]=newPlayer;

        }
        else{

            court.teamB[index]=newPlayer;

        }



        newPlayer.playCount++;

        newPlayer.restMinutes=0;



        saveData();


        renderRounds();


        renderStatistics();


    };





    btn.parentElement.replaceChild(
        select,
        btn
    );


    select.focus();


}






// ======================
// 清除排場
// ======================

function clearRounds(){


    if(
        !confirm(
        "確定清除今日排場？"
        )
    ){

        return;

    }



    rounds=[];


    saveData();


    renderRounds();


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

        🏸上場 ${p.playCount} 場

        🪑休息 ${p.restMinutes} 分

        </p>

        `;


    });


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
    )
    .length;



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
