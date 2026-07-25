async function findUser(){

const username=document.getElementById("username").value;
const result=document.getElementById("result");

result.innerHTML="Loading profile...";


try{

const res=await fetch(
"https://roblox-api.devisserrik.workers.dev/?username="+username
);

const data=await res.json();


if(data.error){
result.innerHTML="User not found";
return;
}


const user=data.profile;


result.innerHTML=`

<img class="avatar" src="${data.avatar}">

<h2>${user.displayName}</h2>

<p>@${user.name}</p>

<hr>

<p>🆔 User ID: ${user.id}</p>

<p>✔️ Verified:
${user.hasVerifiedBadge ? "Yes":"No"}
</p>

<p>📅 Created:
${new Date(user.created).toLocaleDateString()}
</p>

<p>👥 Friends:
${data.friends}
</p>


<a target="_blank"
href="https://www.roblox.com/users/${user.id}/profile">
Open Roblox Profile
</a>


<br><br>

<button onclick="copyID('${user.id}')">
Copy User ID
</button>


<h3>Groups</h3>

${data.groups.slice(0,10).map(g=>`

<p>
${g.group.name}
-
${g.role.name}
</p>

`).join("")}

`;

}

catch(e){

console.log(e);
result.innerHTML="Error loading profile";

}

}


function copyID(id){

navigator.clipboard.writeText(id);

alert("Copied User ID: "+id);

}
