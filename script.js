async function findUser() {

    const username = document.getElementById("username").value;
    const result = document.getElementById("result");

    result.innerHTML = "Loading...";

    try {

        const userReq = await fetch(
            "https://roblox-api.devisserrik.workers.dev/?username=" + username
        );

        const userData = await userReq.json();

        if (!userData.data || userData.data.length === 0) {
            result.innerHTML = "❌ User bestaat niet";
            return;
        }

        const user = userData.data[0];

        result.innerHTML = `
            <h2>${user.displayName}</h2>

            <div class="info">
                <p>👤 Username: ${user.name}</p>
                <p>🆔 User ID: ${user.id}</p>
                <p>✔️ Verified: ${user.hasVerifiedBadge ? "Ja" : "Nee"}</p>

                <button onclick="copyID('${user.id}')">
                    Copy User ID
                </button>
            </div>
        `;

    } catch(error) {

        console.log(error);
        result.innerHTML = "❌ Error loading user";

    }
}


function copyID(id) {

    navigator.clipboard.writeText(id);

    alert("User ID gekopieerd: " + id);

}

        console.log(error);
    }
}
