// 🏸 羽球輪轉小幫手 V9.2 Final Ultimate
// storage.js


let clubs = [];

let currentClub = "";




// ======================
// 載入所有資料
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



            if(!Array.isArray(clubs)){

                clubs=[];

            }


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



}







// ======================
// 儲存所有資料
// ======================


function saveClubs(){



    localStorage.setItem(

        "badmintonClubs",

        JSON.stringify(clubs)

    );




    localStorage.setItem(

        "currentClub",

        currentClub || ""

    );



}







// ======================
// 載入目前球團
// ======================


function loadClubData(){



    loadStorage();





    if(!currentClub){


        return false;


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


        return false;


    }







    club.players ||= [];

    club.todayPlayers ||= [];

    club.rounds ||= [];

    club.settings ||= {

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




    return true;



}







// ======================
// 建立球團
// ======================


function createClub(name){



    name =
    name.trim();




    if(!name){

        return false;

    }






    let exist =

    clubs.some(

        c=>

        c.name===name

    );





    if(exist){


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






    clubs.push(club);




    currentClub=name;




    saveClubs();




    loadClubData();




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





    if(!club){

        return;

    }




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
        "確定刪除此球團？"
    )

    ){

        return;

    }






    clubs =

    clubs.filter(

        c=>

        c.name!==name

    );







    if(currentClub===name){



        currentClub="";


    }






    saveClubs();



    renderClubList();



}







// ======================
// 檢查是否已有球團
// ======================


function checkClub(){



    loadStorage();





    if(!currentClub){

        return false;

    }






    let found =

    clubs.some(

        c=>

        c.name===currentClub

    );






    if(found){


        loadClubData();


        return true;


    }





    currentClub="";


    localStorage.removeItem(
        "currentClub"
    );



    return false;



}
