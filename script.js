async function findUser() {

    const username = document.getElementById("username").value;
    const result = document.getElementById("result");

    result.innerHTML = "Testen...";

    try {

        const response = await fetch(
            "https://roblox-api.devisserrik.workers.dev/?username=" + username
        );

        const text = await response.text();

        result.innerHTML = `
            <h3>Response:</h3>
            <pre>${text}</pre>
        `;

    } catch (error) {

        result.innerHTML = `
            ❌ Fetch fout:<br>
            ${error}
        `;

        console.log(error);
    }
}
