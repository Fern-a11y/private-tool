function login(){

    const password =
    document.getElementById("password").value;


    if(password === "123456"){

        document.getElementById("login").style.display="none";

        document.getElementById("app").style.display="block";


        localStorage.setItem(
            "profileFinderLogin",
            "true"
        );

    }

    else {

        document.getElementById("loginError").innerHTML =
        "❌ Wrong code";

    }

}



window.onload = function(){

    if(
        localStorage.getItem("profileFinderLogin")
        === "true"
    ){

        document.getElementById("login").style.display="none";

        document.getElementById("app").style.display="block";

    }

};





async function findUser(){

    const username =
    document.getElementById("username").value.trim();


    const result =
    document.getElementById("result");


    if(!username){

        result.innerHTML =
        "Please enter a username";

        return;

    }


    result.innerHTML =
    "Loading profile...";


    try {


        const response = await fetch(

        "https://roblox-api.devisserrik.workers.dev/?username="
        + encodeURIComponent(username)

        );


        const data =
        await response.json();



        if(data.error || !data.profile){

            result.innerHTML =
            "❌ User not found";

            return;

        }



        const user =
        data.profile;



        result.innerHTML = `


        <div class="card">


            <img class="avatar"
            src="${data.avatar}">


            <h2>
            ${user.displayName}
            </h2>


            <p>
            👤 Username: @${user.name}
            </p>


            <p>
            🆔 User ID: ${user.id}
            </p>


            <p>
            ✔️ Verified:
            ${user.hasVerifiedBadge ? "Yes" : "No"}
            </p>


            <p>
            🚫 Banned:
            ${user.isBanned ? "Yes" : "No"}
            </p>


            <p>
            📅 Created:
            ${new Date(user.created).toLocaleDateString()}
            </p>



            <br>


            <a target="_blank"
            href="https://www.roblox.com/users/${user.id}/profile">
            Open Roblox Profile
            </a>



            <br><br>



            <button id="copyBtn"
            onclick="copyID(${user.id})">

            Copy User ID

            </button>



        </div>


        `;



    }


    catch(error){

        console.log(error);

        result.innerHTML =
        "❌ Error loading profile";

    }


}





function copyID(id){


    navigator.clipboard.writeText(
        String(id)
    );



    const button =
    document.getElementById("copyBtn");



    button.innerText =
    "Copied!";



    setTimeout(()=>{


        button.innerText =
        "Copy User ID";


    },2000);



}
