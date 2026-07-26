async function findUser() {

    const username = document.getElementById("username").value.trim();
    const result = document.getElementById("result");

    if (!username) {
        result.innerHTML = "Please enter a username.";
        return;
    }

    result.innerHTML = "Loading profile...";

    try {

        const res = await fetch(
            "https://roblox-api.devisserrik.workers.dev/?username=" + encodeURIComponent(username)
        );

        const data = await res.json();

        if (data.error || !data.profile) {
            result.innerHTML = "❌ User not found";
            return;
        }

        const user = data.profile;

        result.innerHTML = `
            <img class="avatar" src="${data.avatar}" alt="Avatar">

            <h2>${user.displayName}</h2>

            <p><b>Username:</b> @${user.name}</p>
            <p><b>User ID:</b> ${user.id}</p>
            <p><b>Verified:</b> ${user.hasVerifiedBadge ? "✅ Yes" : "❌ No"}</p>
            <p><b>Banned:</b> ${user.isBanned ? "Yes" : "No"}</p>
            <p><b>Created:</b> ${new Date(user.created).toLocaleDateString()}</p>

            <p>
                <a href="https://www.roblox.com/users/${user.id}/profile" target="_blank">
                    Open Roblox Profile
                </a>
            </p>

            <button id="copyBtn" onclick="copyID(${user.id})">
                Copy User ID
            </button>
        `;

    } catch (error) {
        console.error(error);
        result.innerHTML = "❌ Error loading profile";
    }
}

function copyID(id) {

    navigator.clipboard.writeText(String(id));

    const btn = document.getElementById("copyBtn");

    btn.textContent = "Copied!";

    setTimeout(() => {
        btn.textContent = "Copy User ID";
    }, 2000);
}
