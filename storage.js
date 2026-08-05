// 🏸 羽球輪轉小幫手 V9.1 Stable
// storage.js


let clubs = [];

let currentClub = "";




// ======================
// 載入儲存資料
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



            if(
                !Array.isArray(clubs)
            ){

                clubs=[];

            }


        }
        catch(e){


            clubs=[];


        }


    }
    else{


        clubs=[];


    }




    currentClub =
    localStorage.getItem(
        "currentClub"
    )
    ||
    "";



}







// ======================
// 儲存全部資料
// ======================


function saveClubs(){


    localStorage.setItem(

        "badmintonClubs",

        JSON.stringify(clubs)

    );



    // 永久記住目前球團
    localStorage.setItem(

        "currentClub",

        currentClub

    );


}









// ======================
// 載入目前球團
// ======================


function loadClubData(){


    loadStorage();



    if(
        !currentClub
    ){

        return;

    }




    let club =

    clubs.find(

        c=>

        c.name===currentClub

    );




    // 找不到球團時清除
    if(
        !club
    ){


        currentClub="";


        localStorage.removeItem(
            "currentClub"
        );


        return;


    }






    club.players =
    club.players
    ||
    [];



    club.todayPlayers =
    club.todayPlayers
    ||
    [];



    club.rounds =
    club.rounds
    ||
    [];



    club.settings =
    club.settings
    ||
    {

        courts:3,

        players:4

    };





    clubPlayers =
    club.players;



    todayPlayers =
    club.todayPlayers;



    rounds =
    club.rounds;



    settings =
    club.settings;



}









// ======================
// 建立球團
// ======================


function createClub(name){



    name =
    name.trim();




    if(
        !name
    ){

        return false;

    }




    if(

        clubs.some(

            c=>

            c.name===name

        )

    ){


        alert(
            "已有此球團"
        );


        return false;


    }







    let newClub = {



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

        newClub

    );





    currentClub =

    name;






    saveClubs();






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

        c=>

        c.name===name

    );




    if(
        !club
    ){

        return;

    }





    currentClub =

    name;





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

        c=>

        c.name!==name

    );







    if(

        currentClub===name

    ){


        currentClub="";


        localStorage.removeItem(

            "currentClub"

        );


    }






    saveClubs();





    renderClubList();



}
