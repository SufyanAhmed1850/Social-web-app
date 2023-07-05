let loginUser = JSON.parse(localStorage.getItem("loginUser"));
if (!loginUser) {
    window.location.replace("./index.html");
}

const renderPostsFromLocal = () => {
    let getPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (getPosts.length === 0) {
        return;
    }
    let postSection = document.querySelector(".post-section");
    getPosts.forEach((post) => {
        postSection.innerHTML += `<div id="${post.id}" class="post">
        <h1>${post.postTitle}</h1>
        <p>${post.postDesc}</p>
        <div class="post-btn-wrapper">
            <button class="edit-btn" onclick="editPost(this)">EDIT</button>
            <button class="delete-btn" onclick="deletePost(this)">DELETE</button>
        </div>
    </div>`;
    });
};
renderPostsFromLocal();

const createPost = () => {
    let newPostTitle = document.getElementById("newPostTitle");
    let newPostDesc = document.getElementById("newPostDesc");
    if (
        newPostTitle.value.trim() === "" ||
        newPostDesc.value.trim() === ""
    ) {
        return;
    }

    let getPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let idCounter;
    if (getPosts.length > 0) {
        idCounter = getPosts[0].id + 1;
    } else {
        idCounter = 0;
    }
    let postSection = document.querySelector(".post-section");
    postHTML = `<div id="${idCounter}" class="post">
        <h1>${newPostTitle.value}</h1>
        <p>${newPostDesc.value}</p>
        <div class="post-btn-wrapper">
            <button class="edit-btn" onclick="editPost(this)">EDIT</button>
            <button class="delete-btn" onclick="deletePost(this)">DELETE</button>
        </div>
    </div>`;
    postObj = {
        postedBy: loginUser.userName,
        id: idCounter,
        postTitle: newPostTitle.value,
        postDesc: newPostDesc.value,
    };
    idCounter += 1;
    getPosts.unshift(postObj);
    localStorage.setItem("posts", JSON.stringify(getPosts));
    postSection.innerHTML = postHTML + postSection.innerHTML;
    newPostTitle.value = "";
    newPostDesc.value = "";
};

let createPostSection = document.querySelector(".create-post-section");
createPostSection.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        createPost();
    }
});

const deletePost = (deleteBtn) => {
    let getPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let deleteElemId = deleteBtn.parentNode.parentNode.id;
    let indexOfPost = getPosts.findIndex((post) => {
        if (post.id == deleteElemId) {
            return true;
        }
    });
    getPosts.splice(indexOfPost, 1);
    localStorage.setItem("posts", JSON.stringify(getPosts));
    deleteBtn.parentNode.parentNode.remove();
};

const editPost = (editBtn) => {
    let postElem = editBtn.parentNode.parentNode;
    let postTitleElem = postElem.querySelector("h1");
    let postDescElem = postElem.querySelector("p");
    if (editBtn.innerHTML === "EDIT") {
        editBtn.innerHTML = "DONE";
        postTitleElem.setAttribute("contenteditable", "true");
        postDescElem.setAttribute("contenteditable", "true");
    } else {
        let postTitleElem = postElem.querySelector("h1");
        let postDescElem = postElem.querySelector("p");
        let id = editBtn.parentNode.parentNode.id;
        let postIndex;
        var getPosts = JSON.parse(localStorage.getItem("posts"));
        var post = getPosts.find((localPost, localPostIndex) => {
            if (localPost.id == id) {
                postIndex = localPostIndex;
                return true;
            }
        });
        let editedPost = {
            postedBy: post.postedBy,
            id: post.id,
            postTitle: postTitleElem.innerHTML,
            postDesc: postDescElem.innerHTML,
        };
        getPosts.splice(postIndex, 1, editedPost);
        localStorage.setItem("posts", JSON.stringify(getPosts));
        editBtn.innerHTML = "EDIT";
        postTitleElem.removeAttribute("contenteditable", "true");
        postDescElem.removeAttribute("contenteditable", "true");
    }
};

const logOut = () => {
    localStorage.removeItem("loginUser");
    window.location.replace("./index.html");
};
