// 🏸 羽球輪轉小幫手 V8.2 Stable
// storage.js


let clubs = [];

let currentClub = "";





// ======================
// 初始化讀取
// ======================

function loadClubData(){


    let data =
    localStorage.getItem(
        "badmintonClubs"
    );



    if(data){

        clubs =
        JSON.parse(data);

    }
    else{

        clubs=[];

    }



    currentClub =
    localStorage.getItem(
        "currentClub"
    );



    if(currentClub){


        let club =
        getCurrentClub();



        if(club){


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


    }


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
// 建立球團
// ======================

function createClub(name){


    if(!name){

        return false;

    }



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



    let club = {


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



    currentClub =
    name;



    saveClubs();



    localStorage.setItem(

        "currentClub",

        currentClub

    );



    return true;


}








// ======================
// 儲存全部球團
// ======================

function saveClubs(){


    localStorage.setItem(

        "badmintonClubs",

        JSON.stringify(
            clubs
        )

    );



    localStorage.setItem(

        "currentClub",

        currentClub

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



    currentClub =
    name;



    loadClubData();



    saveClubs();



    renderAll();


}









// ======================
// 刪除球團
// ======================

function deleteClub(name){


    if(
        !confirm(
            "確定刪除 "
            +name+
            " ?"
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

        currentClub =
        clubs.length
        ?
        clubs[0].name
        :
        "";


    }



    saveClubs();



    loadClubData();



    renderAll();


}
