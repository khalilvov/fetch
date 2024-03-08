// console.log("Before");

// setTimeout(() => {
//     console.log("current setTimeout");
// }, 1000);

// setInterval(() => {
//     console.log("current setinterval");
// }, 1000);

// console.log("End/After");

const RequestGet = async (path) => {
    return await fetch(path, {
        method: "GET"
    }).then(response => response.json())
}

const RequestPost = async (path, data) => {
    return await fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
}

const RequestDelete = async (path) => {
    return await fetch(path, {
        method: "DELETE"
    }).then(response => response.json())
}

const RequestPatch = async (path, data) => {
    return await fetch(path, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
}

const RequestPut = async (path, data) => {
    return await fetch(path, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
}

const APIUrl = `https://jsonplaceholder.typicode.com`;

const InitFunc = () => {
    const container = document.querySelector("#table tbody");

    const userID = document.querySelector("#user-id")

    const buttonDelete = document.querySelector("#delete")

    const buttonPost = document.querySelector("#post");

    const userName = document.querySelector("#user-name");

    const userEmail = document.querySelector("#user-email");

    const userBody = document.querySelector("#user-comment")

    const user = {
        name: undefined,
        body: null,
        email: null
    }
    
    container.innerHTML = "Loading...";

    RequestGet(APIUrl + "/users").then(data => {
        container.innerHTML = ""

        data.forEach((user, index) => {
            index += 1;

            container.insertAdjacentHTML("beforeend", `
                <tr>
                    <th scope="row">${index}</th>
                    <td>${user.name} @${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <ul>
                            <li>${user.company.name}</li>
                            <li>${user.company.catchPhrase}</li>
                            <li>${user.company.bs}</li>
                        </ul>
                    </td>
                    <td>
                        <button class="btn btn-danger" data-user-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `)
        });
    })

    buttonDelete.addEventListener("click", () => {
        const value = userID.value;

        const id = value !== "" ? value : 0;

        RequestDelete(APIUrl + "/users/" + id).then(() => {
            alert("USER DELETED")

            userID.value = ""
        }).catch(error => {
            console.error(error);

            alert("USER IS NOT DELETED")
        })
    })


    userName.addEventListener("input", (e) => {
        user.name = e.target.value;
    })

    userEmail.addEventListener("input", (e) => {
        user.email = e.target.value;
    })

    userBody.addEventListener("input", (e) => {
        user.body = e.target.value;
    })

    buttonPost.addEventListener("click", () => {
        RequestPost(APIUrl + "/users", user).then(() => {
            alert("New User Created");
            userBody.value = ""
            userEmail.value = ""
            userName.value = ""
        }).catch(error => {
            console.error(error);

            alert("NEW USER IS NOT CREATED")
        })
    })
}

InitFunc()