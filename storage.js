// 🏸 羽球輪轉小幫手 V7.0 Stable
// 球團資料管理核心


let currentClub =
localStorage.getItem("currentClub") || "";


let clubs =
JSON.parse(
    localStorage.getItem("clubs")
)
|| [];





// ======================
// 儲存
// ======================

function saveClubs(){

    localStorage.setItem(
        "clubs",
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


    name=name.trim();


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
// 目前球團
// ======================

function getCurrentClub(){


    return clubs.find(

        c=>c.name===currentClub

    );

}





// ======================
// 載入球團資料
// ======================

function loadClubData(){


    let club =
    getCurrentClub();



    if(!club){

        return;

    }



    clubPlayers =
    club.players || [];



    todayPlayers =
    club.todayPlayers || [];



    rounds =
    club.rounds || [];



    settings =
    club.settings || {

        courts:3,

        players:4

    };



}





// ======================
// 儲存目前球團資料
// ======================

function saveClubData(){


    let club =
    getCurrentClub();



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
// 切換球團
// ======================

function switchClub(name){


    let club =
    clubs.find(
        c=>c.name===name
    );



    if(!club){

        return false;

    }



    currentClub=name;


    saveClubs();


    loadClubData();


    return true;

}





// ======================
// 刪除球團
// ======================

function deleteClub(name){


    if(
        !confirm(
            "確定刪除這個球團？"
        )
    ){

        return;

    }



    clubs =
    clubs.filter(
        c=>c.name!==name
    );



    if(
        currentClub===name
    ){

        currentClub="";

    }



    saveClubs();

}





// ======================
// 更新球團名稱顯示
// ======================

function updateClubName(){


    let box =
    document.getElementById(
        "currentClubName"
    );



    if(box){

        box.innerText =
        currentClub
        ?
        "🏸 "+currentClub
        :
        "";

    }

}
