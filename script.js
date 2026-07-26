function login(){

    const code =
    document.getElementById("code").value;


    if(code === "123456"){

        document.getElementById("login").style.display="none";

        document.getElementById("panel").style.display="block";

    }

    else {

        document.getElementById("error").innerHTML =
        "Wrong code";

    }

}
