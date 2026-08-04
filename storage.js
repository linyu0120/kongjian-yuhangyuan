// 🏸 羽球輪轉小幫手 V8.0 Stable
// storage.js
// 球團資料隔離管理

let clubs =
JSON.parse(
    localStorage.getItem("badmintonClubs")
)
|| [];


let currentClub =
localStorage.getItem("currentClub")
|| "";




// ======================
// 儲存球團資料
// ======================

function saveClubs(){

    localStorage.setItem(
        "badmintonClubs",
        JSON.stringify(clubs)
    );


    localStorage.setItem(
        "currentClub",
        currentClub
    );

}



// ======================
// 建立球團
// ======================

function createClub(name){


    name =
    name.trim();



    if(!name){

        alert("請輸入球團名稱");

        return false;

    }



    if(
        clubs.some(
            c=>c.name===name
        )
    ){

        alert("已有此球團");

        return false;

    }



    clubs.push({

        name:name,


        players:[],


        todayPlayers:[],


        rounds:[],


        settings:{

            courts:3,

            players:4

        }


    });



    currentClub=name;


    saveClubs();


    return true;


}





// ======================
// 取得目前球團
// ======================

function getCurrentClub(){


    return clubs.find(

        c=>c.name===currentClub

    );


}





// ======================
// 切換球團
// ======================

function switchClub(name){


    let club =
    clubs.find(
        c=>c.name===name
    );



    if(!club)return;



    currentClub=name;


    saveClubs();


    loadClubData();


    renderAll();


}





// ======================
// 刪除球團
// ======================

function deleteClub(name){


    if(
        !confirm(
        "確定刪除球團？"
        )
    ){

        return;

    }



    clubs =
    clubs.filter(
        c=>c.name!==name
    );



    if(currentClub===name){

        currentClub="";

    }



    saveClubs();


}




// ======================
// 載入目前球團
// ======================

function loadClubData(){


    let club =
    getCurrentClub();



    if(!club){

        clubPlayers=[];

        todayPlayers=[];

        rounds=[];

        settings={
            courts:3,
            players:4
        };


        return;

    }




    clubPlayers =
    club.players || [];



    todayPlayers =
    club.todayPlayers || [];



    rounds =
    club.rounds || [];



    settings =
    club.settings ||
    {
        courts:3,
        players:4
    };


}



// ======================
// 更新球團資料
// ======================

function updateClubData(){


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
