// 🏸 空間羽航員 V6.1 Stable

let clubPlayers =
JSON.parse(localStorage.getItem("clubPlayers")) || [];


let todayPlayers =
JSON.parse(localStorage.getItem("todayPlayers")) || [];


let rounds =
JSON.parse(localStorage.getItem("rounds")) || [];


let settings =
JSON.parse(localStorage.getItem("settings")) ||
{
    courts:3,
    players:4
};





// ======================
// 初始化
// ======================

window.onload=function(){

    renderAll();

};





function saveData(){

    localStorage.setItem(
        "clubPlayers",
        JSON.stringify(clubPlayers)
    );


    localStorage.setItem(
        "todayPlayers",
        JSON.stringify(todayPlayers)
    );


    localStorage.setItem(
        "rounds",
        JSON.stringify(rounds)
    );


    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

}






// ======================
// 側邊選單
// ======================


function toggleMenu(){

    let menu =
    document.getElementById("sideMenu");


    let overlay =
    document.getElementById("overlay");



    menu.classList.toggle("open");

    overlay.classList.toggle("show");

}





// ======================
// 頁面切換
// ======================


function hidePages(){

    document
    .querySelectorAll("main section")
    .forEach(s=>{

        s.classList.add("hidden");

    });

}




function showHome(){

    hidePages();

    document
    .getElementById("schedulePage")
    .classList.remove("hidden");

    toggleMenu();

}



function showTodayPlayers(){

    hidePages();

    document
    .getElementById("todayPlayersPage")
    .classList.remove("hidden");


    renderTodayPlayers();

    toggleMenu();

}




function showClubPlayers(){

    hidePages();

    document
    .getElementById("clubPlayersPage")
    .classList.remove("hidden");


    renderClubPlayers();

    toggleMenu();

}




function showStatistics(){

    hidePages();

    document
    .getElementById("statisticsPage")
    .classList.remove("hidden");


    renderStatistics();

    toggleMenu();

}






// ======================
// 社團名單
// ======================


function addClubPlayer(){


    let input =
    document.getElementById("newPlayerName");


    let name =
    input.value.trim();



    if(!name) return;



    if(
        clubPlayers.some(
            p=>p.name===name
        )
    ){

        alert("已有此球友");

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
    document.getElementById("clubPlayerList");


    box.innerHTML="";



    clubPlayers.forEach((p,i)=>{


        let div =
        document.createElement("div");


        div.className="player-item";


        div.innerHTML=`

        <span>${p.name}</span>

        <button onclick="deleteClubPlayer(${i})">
        刪除
        </button>

        `;


        box.appendChild(div);


    });

}




function deleteClubPlayer(index){

    clubPlayers.splice(index,1);

    saveData();

    renderClubPlayers();

}


// ======================
// 批次匯入名單
// ======================

function importPlayers(){

    let textarea =
    document.getElementById("importPlayers");


    let text =
    textarea.value.trim();



    if(!text){

        alert("請貼上名單");

        return;

    }



    let names =
    text
    .split("\n")
    .map(n=>n.trim())
    .filter(n=>n);



    let addCount = 0;



    names.forEach(name=>{


        let exists =
        clubPlayers.some(
            p=>p.name===name
        );



        if(!exists){

            clubPlayers.push({

                name:name,

                restMinutes:0,

                playCount:0

            });


            addCount++;

        }


    });



    saveData();


    renderClubPlayers();


    textarea.value="";


    alert(
        "成功匯入 " 
        + addCount 
        + " 位球友"
    );

}




// ======================
// 今日活動
// ======================


function addTodayPlayer(){


    let name =
    prompt("輸入球友姓名");


    if(!name)return;



    todayPlayers.push({

        name:name,

        restMinutes:0,

        playCount:0

    });


    saveData();

    renderTodayPlayers();

}




function renderTodayPlayers(){


    let box =
    document.getElementById("todayPlayerList");


    box.innerHTML="";



    todayPlayers.forEach((p,i)=>{


        let div =
        document.createElement("div");


        div.className="player-item";


        div.innerHTML=`

        <span>
        ${p.name}
        🪑${p.restMinutes}分
        </span>


        <button onclick="removeToday(${i})">
        離開
        </button>

        `;


        box.appendChild(div);


    });



}





function removeToday(index){

    todayPlayers.splice(index,1);

    saveData();

    renderTodayPlayers();

}








// ======================
// 排場
// ======================


function nextRound(){


    if(todayPlayers.length===0){

        alert("請先加入球友");

        return;

    }



    let result =
    createSchedule(

        todayPlayers,

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



    let playing =
    getPlayingNames(result);



    updateRestTime(
        todayPlayers,
        playing,
        15
    );



    saveData();


    renderRounds();


}





function renderRounds(){


    let box =
    document.getElementById("roundContainer");


    box.innerHTML="";


    rounds.forEach((round,i)=>{


        let card =
        document.createElement("div");


        card.className="round-card";


        let html=`

        <div class="round-title">
        第${i+1}輪
        ${round.time}
        </div>

        `;



        round.courts.forEach(c=>{


            html+=`

            <div class="court">

            <b>${c.name}</b>

            <br>

            ${c.teamA.map(p=>p.name).join("、")}

            VS

            ${c.teamB.map(p=>p.name).join("、")}


            </div>

            `;


        });



        html+=`

        <div class="rest-box">

        🪑休息：

        ${
            round.resting
            .map(p=>p.name)
            .join("、")
        }

        </div>

        `;



        card.innerHTML=html;


        box.appendChild(card);


    });



    document
    .getElementById("roundCount")
    .innerText =
    rounds.length;


}


// ======================
// 設定
// ======================


function openSettings(){

    let modal =
    document.getElementById("settingModal");


    let court =
    document.getElementById("courtSetting");


    let player =
    document.getElementById("playerPerCourt");



    if(court){

        court.value =
        settings.courts;

    }


    if(player){

        player.value =
        settings.players;

    }



    if(modal){

        modal.style.display="flex";

    }


}




function closeSettings(){

    let modal =
    document.getElementById("settingModal");


    if(modal){

        modal.style.display="none";

    }

}




function saveSettings(){


    let court =
    document.getElementById("courtSetting");


    let player =
    document.getElementById("playerPerCourt");



    let courts =
    Number(court.value);


    let players =
    Number(player.value);



    if(courts<=0 || players<=0){

        alert("設定錯誤");

        return;

    }



    settings={

        courts:courts,

        players:players

    };



    saveData();



    document
    .getElementById("courtCount")
    .innerText =
    settings.courts;



    closeSettings();


}



// ======================
// 統計
// ======================


function renderStatistics(){


    let box =
    document.getElementById("statisticsBox");


    box.innerHTML="";


    todayPlayers.forEach(p=>{


        box.innerHTML +=`

        <p>
        ${p.name}
        🏸${p.playCount}場
        🪑${p.restMinutes}分
        </p>

        `;


    });

}


function renderAll(){

    renderClubPlayers();

    renderTodayPlayers();

    renderRounds();


    document
    .getElementById("todayCount")
    .innerText =
    todayPlayers.length;


    document
    .getElementById("courtCount")
    .innerText =
    settings.courts;


}

function searchTodayPlayers(){

    renderTodayPlayers();

}


function searchClubPlayers(){

    renderClubPlayers();


}



alert("app.js 已載入");
