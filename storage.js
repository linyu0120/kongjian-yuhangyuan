// 🏸 羽球輪轉小幫手 V9.1 Stable
// storage.js Final


let clubs = [];

let currentClub = "";





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
// 儲存資料
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
// 讀取目前球團
// ======================


function loadClubData(){



    loadStorage();




    // 沒有球團

    if(!currentClub){


        return false;


    }






    let club =

    clubs.find(

        c=>

        c.name===currentClub

    );






    // 找不到球團

    if(!club){



        currentClub="";



        localStorage.removeItem(

            "currentClub"

        );



        return false;



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





    return true;



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

        c=>

        c.name===name

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







    clubs.push(club);




    currentClub=name;




    saveClubs();





    // 同步清空目前資料


    clubPlayers=[];


    todayPlayers=[];


    rounds=[];


    settings={


        courts:3,


        players:4


    };




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

        c=>

        c.name!==name

    );








    if(currentClub===name){


        currentClub="";


        localStorage.removeItem(

            "currentClub"

        );


    }





    saveClubs();




    renderClubList();



}








// ======================
// 第一次啟動檢查
// ======================


function checkClub(){



    loadStorage();



    if(

    currentClub &&

    clubs.some(

        c=>

        c.name===currentClub

    )

    ){



        loadClubData();



        return true;



    }



    return false;



}
