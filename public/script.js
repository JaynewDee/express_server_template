const writeBtn = document.getElementById('write-posts-btn');
const readBtn = document.getElementById('read-posts-btn');
const resultsContainer = document.querySelector('.results-container');

async function writeJsonFromFetch() {
    try {
        const res = await fetch('api/posts/write');
        console.log(res)
    } catch (err) {
        console.error(err)
    }
}

async function getAllPosts() {
    try {
        return await fetch('api/posts/read');
    } catch (err) {
        console.error(err)
    }
}

function displayResults(resultsData) {
    resultsData.forEach(({
        id,
        userId,
        title,
        body
    }) => {
        const recordContainer = document.createElement('div');
        const idEl = document.createElement('p');
        const userIdEl = document.createElement('p');
        const titleEl = document.createElement('h3');
        const bodyEl = document.createElement('p');

        idEl.textContent = `Post Id: ${id}`;
        userIdEl.textContent = `User Id: ${userId}`;
        titleEl.textContent = `Title: ${title.toUpperCase()}`;
        bodyEl.textContent = `Body: ${body}`;

        recordContainer.append(idEl, userIdEl, titleEl, bodyEl);
        resultsContainer.appendChild(recordContainer);
    })
}

writeBtn.addEventListener('click', async () => {
    try {
        await writeJsonFromFetch();
        console.log("Data written to db/posts.json");
    } catch (err) {
        console.error(err);
    }
});

readBtn.addEventListener('click', async () => {
    try {
        const postsData = await getAllPosts();
        const parsed = await postsData.json();

        displayResults(parsed);
    } catch (err) {
        console.error(err);
        console.log("Error reading local json file");
    }

})