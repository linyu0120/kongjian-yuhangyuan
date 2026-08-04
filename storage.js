// 🏸 羽球輪轉小幫手 V7.0 Stable
// 資料管理核心


let currentClub =
localStorage.getItem("currentClub") || "";



let clubs =
JSON.parse(
    localStorage.getItem("clubs")
)
||
[];





// ======================
// 儲存全部資料
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


    if(!name.trim()){

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


    if(!club){

        return;

    }


    currentClub=name;


    saveClubs();


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



    if(currentClub===name){

        currentClub="";

    }



    saveClubs();


}
