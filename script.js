async function findUser(){

const username = document.getElementById("username").value;
const result = document.getElementById("result");

result.innerHTML = "Loading profile...";

try {

const res = await fetch(
"https://roblox-api.devisserrik.workers.dev/?username=" + username
);

const data = await res.json();


if(!data.data || data.data.length === 0){
    result.innerHTML = "❌ User not found";
    return;
}


const user = data.data[0];


result.innerHTML = `

<h2>${user.displayName}</h2>

<p>👤 Username: ${user.name}</p>

<p>🆔 User ID: ${user.id}</p>

<p>✔️ Verified:
${user.hasVerifiedBadge ? "Yes" : "No"}
</p>

<br>

<a target="_blank" href="https://www.roblox.com/users/${user.id}/profile">
Open Roblox Profile
</a>

<br><br>

<button onclick="copyID('${user.id}')">
Copy User ID
</button>

`;

} catch(error){

console.log(error);
result.innerHTML = "❌ Error loading user";

}

}


function copyID(id){

navigator.clipboard.writeText(id);

alert("Copied User ID: " + id);

}
