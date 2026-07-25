async function findUser(){

const username = document.getElementById("username").value;
const result = document.getElementById("result");

result.innerHTML = "Loading...";

try {

const res = await fetch(
"https://roblox-api.devisserrik.workers.dev/?username=" + username
);

const user = await res.json();


if(user.error){
    result.innerHTML="❌ User not found";
    return;
}


result.innerHTML = `

<img class="avatar" src="${user.avatar}">

<h2>${user.displayName}</h2>

<p>@${user.name}</p>

<hr>

<p>🆔 ID: ${user.id}</p>

<p>✔️ Verified:
${user.hasVerifiedBadge ? "Yes" : "No"}
</p>

<p>🚫 Banned:
${user.isBanned ? "Yes" : "No"}
</p>

<p>📅 Created:
${new Date(user.created).toLocaleDateString()}
</p>

<br>

<a class="profile" target="_blank"
href="https://www.roblox.com/users/${user.id}/profile">
Open Roblox Profile
</a>

<br><br>

<button id="copyBtn" onclick="copyID('${user.id}')">
Copy User ID
</button>

`;

} catch(error){

console.log(error);
result.innerHTML="❌ Error loading user";

}

}


function copyID(id){

navigator.clipboard.writeText(id);

const btn = document.getElementById("copyBtn");

btn.innerText="Copied!";

setTimeout(()=>{
    btn.innerText="Copy User ID";
},2000);

}
