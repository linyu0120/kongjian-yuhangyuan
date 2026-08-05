// 🏸 羽球輪轉小幫手 V9.1 Stable
// storage.js


let clubs=[];

let currentClub="";




// ======================
// 載入資料
// ======================

function loadStorage(){


    let data =
    localStorage.getItem(
        "badmintonClubs"
    );


    if(data){

        try{

            clubs =
            JSON.parse(data);

        }
        catch(e){

            clubs=[];

        }

    }



    currentClub =
    localStorage.getItem(
        "currentClub"
    )
    ||
    "";



    // 自動恢復第一個球團

    if(
        !currentClub &&
        clubs.length>0
    ){

        currentClub =
        clubs[0].name;


        localStorage.setItem(
            "currentClub",
            currentClub
        );

    }


}







// ======================
// 儲存全部
// ======================

function saveClubs(){


    localStorage.setItem(

        "badmintonClubs",

        JSON.stringify(clubs)

    );



    if(currentClub){


        localStorage.setItem(

            "currentClub",

            currentClub

        );


    }


}







// ======================
// 載入目前球團
// ======================

function loadClubData(){


    loadStorage();



    if(!currentClub){

        return;

    }



    let club =
    clubs.find(
        c=>
        c.name===currentClub
    );



    if(!club){

        currentClub="";


        localStorage.removeItem(
            "currentClub"
        );


        return;

    }



    clubPlayers =
    club.players
    ||
    [];



    todayPlayers =
    club.todayPlayers
    ||
    [];



    rounds =
    club.rounds
    ||
    [];



    settings =
    club.settings
    ||
    {

        courts:3,

        players:4

    };



}








// ======================
// 建立球團
// ======================

function createClub(name){


    name =
    name.trim();



    if(!name)
    return false;



    if(
        clubs.some(
            c=>c.name===name
        )
    ){

        alert(
            "已有此球團"
        );

        return false;

    }





    let club={


        name:name,


        players:[],


        todayPlayers:[],


        rounds:[],


        settings:{

            courts:3,

            players:4

        }


    };




    clubs.push(
        club
    );



    currentClub=name;



    saveClubs();



    localStorage.setItem(
        "currentClub",
        name
    );



    return true;


}








// ======================
// 取得目前球團
// ======================

function getCurrentClub(){


    return clubs.find(

        c=>
        c.name===currentClub

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



    if(!club)
    return;



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
    )
    return;



    clubs =
    clubs.filter(
        c=>c.name!==name
    );



    if(
        currentClub===name
    ){

        currentClub =
        clubs.length
        ?
        clubs[0].name
        :
        "";

    }



    saveClubs();


    loadClubData();


    renderClubList();


}
