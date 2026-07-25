async function findUser() {
    const result = document.getElementById("result");

    try {
        const response = await fetch("https://users.roblox.com/v1/users/1");

        const data = await response.json();

        result.innerHTML = `
        ✅ API werkt<br><br>
        Naam: ${data.name}<br>
        ID: ${data.id}
        `;

    } catch (error) {
        result.innerHTML = `
        ❌ API fout<br>
        ${error}
        `;
        console.log(error);
    }
}
