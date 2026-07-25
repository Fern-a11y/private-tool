async function findUser(){

const username = document.getElementById("username").value;
const result = document.getElementById("result");

result.innerHTML = "Loading...";

try {

const userReq = await fetch(
"https://users.roblox.com/v1/usernames/users",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
usernames:[username],
excludeBannedUsers:false
})
}
);

const userData = await userReq.json();

if(!userData.data || userData.data.length === 0){
result.innerHTML="❌ User bestaat niet";
return;
}

const user = userData.data[0];


const avatarReq = await fetch(
`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png`
);

const avatarData = await avatarReq.json();


const infoReq = await fetch(
`https://users.roblox.com/v1/users/${user.id}`
);

const info = await infoReq.json();


result.innerHTML=`

<img class="avatar" src="${avatarData.data[0].imageUrl}">

<h2>${info.displayName}</h2>

<div class="info">

<p>👤 Username: ${info.name}</p>

<p>🆔 User ID: ${info.id}</p>

<p>📅 Account gemaakt:
${new Date(info.created).toLocaleDateString()}
</p>

<button onclick="copyID('${info.id}')">
Copy User ID
</button>

</div>

`;

}

catch(error){

console.log(error);
result.innerHTML="❌ Error loading user";

}

}


function copyID(id){

navigator.clipboard.writeText(id);

alert("User ID gekopieerd: "+id);

}
