// 🏸 羽球輪轉小幫手 V9.1 Stable
// app.js Part 1


let clubPlayers = [];

let todayPlayers = [];

let rounds = [];


let settings = {

    courts:3,

    players:4

};





// ======================
// 初始化
// ======================


window.onload=function(){


    loadStorage();


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


    let menu =
    document.getElementById(
        "sideMenu"
    );


    let overlay =
    document.getElementById(
        "overlay"
    );



    if(menu){

        menu.classList.toggle(
            "open"
        );

    }



    if(overlay){

        overlay.classList.toggle(
            "show"
        );

    }


}








// ======================
// 頁面切換
// ======================


function hidePages(){


    document
    .querySelectorAll(
        "main section"
    )
    .forEach(

        s=>
        s.classList.add(
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



        div.innerHTML=`


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


    if(
        !confirm(
        "確定刪除此球友？"
        )
    ){

        return;

    }



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
            p=>
            p.name===player.name
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



        div.innerHTML=`


        <label>


        <input
        type="checkbox"
        ${
        p.checked!==false
        ?
        "checked"
        :
        ""
        }
        onchange="togglePlayer(${i})"
        >



        ${p.name}



        🏸${p.playCount||0}場



        🪑${p.restMinutes||0}分



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

    todayPlayers.filter(

        p=>

        p.checked!==false

    );





    let need =

    settings.courts *

    settings.players;






    if(
        activePlayers.length < need
    ){


        alert(

        "到場人數不足，需要 "

        +

        need

        +

        " 人"

        );


        return;


    }






    activePlayers =
    shuffleArray(
        activePlayers
    );






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
            createPlayerButtons(
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
            createPlayerButtons(
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

            p.name

            +

            "("

            +

            p.restMinutes

            +

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


function createPlayerButtons(

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

        onclick="changePlayer(

        ${r},

        ${c},

        '${team}',

        ${i},

        this

        )"

        >

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

    rounds[r].courts[c];



    let oldPlayer;



    if(team==="A"){


        oldPlayer =
        court.teamA[index];


    }
    else{


        oldPlayer =
        court.teamB[index];


    }






    let select =

    document.createElement(
        "select"
    );



    select.className =
    "player-select";





    todayPlayers

    .filter(

    p=>

    p.checked!==false

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

        p=>

        p.name===this.value

        );




        if(!newPlayer)return;




        // 防止同場重複
        let duplicate =

        (

        court.teamA.some(

        p=>

        p.name===newPlayer.name

        )

        ||

        court.teamB.some(

        p=>

        p.name===newPlayer.name

        )

        );




        if(
            duplicate &&
            newPlayer.name!==oldPlayer.name
        ){


            alert(
                "此球友已在此場"
            );


            renderRounds();

            return;

        }






        // 扣除舊球員場次

        if(oldPlayer){


            oldPlayer.playCount =

            Math.max(

                0,

                (oldPlayer.playCount||0)-1

            );


        }






        // 加入新球員

        if(team==="A"){


            court.teamA[index]=
            newPlayer;


        }
        else{


            court.teamB[index]=
            newPlayer;


        }




        newPlayer.playCount =
        (newPlayer.playCount||0)+1;



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

        🏸 上場 ${p.playCount||0} 場


        🪑 休息 ${p.restMinutes||0} 分


        </p>


        `;


    });


}









// ======================
// 設定
// ======================


function openSettings(){


    let modal =

    document.getElementById(
        "settingModal"
    );



    if(modal){

        modal.style.display="flex";

    }




    document.getElementById(
        "courtSetting"
    ).value =

    settings.courts;



    document.getElementById(
        "playerPerCourt"
    ).value =

    settings.players;



}







function closeSettings(){


    let modal =

    document.getElementById(
        "settingModal"
    );



    if(modal){

        modal.style.display="none";

    }


}







function saveSettings(){


    settings={


        courts:

        Number(

        document.getElementById(
            "courtSetting"
        ).value

        ),



        players:

        Number(

        document.getElementById(
            "playerPerCourt"
        ).value

        )


    };



    saveData();



    document.getElementById(
        "courtCount"
    ).innerText =

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

    n=>

    n.trim()

    )

    .filter(

    n=>

    n

    );






    names.forEach(

    name=>{


        if(

        !clubPlayers.some(

        p=>

        p.name===name

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
// 全部加入今日
// ======================


function addAllToday(){


    clubPlayers.forEach(

    p=>{


        if(

        !todayPlayers.some(

        x=>

        x.name===p.name

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


    let input =

    document.getElementById(
        "newClubName"
    );



    let name =

    input.value.trim();



    if(!name)return;




    if(createClub(name)){


        input.value="";


        loadClubData();


        renderAll();


    }


}









// ======================
// 全部刷新
// ======================


function renderAll(){


    loadClubData();



    renderClubPlayers();


    renderTodayPlayers();


    renderRounds();


    renderStatistics();



    showClubName();





    let today =

    document.getElementById(
        "todayCount"
    );



    if(today){


        today.innerText =

        todayPlayers.filter(

        p=>

        p.checked!==false

        )

        .length;


    }





    let court =

    document.getElementById(
        "courtCount"
    );



    if(court){


        court.innerText =

        settings.courts;


    }


}

