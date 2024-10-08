const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

// function sendHttpRequest(method, url, data) {
//   // const promise = new Promise((resolve, reject) => {
//   // const xhr = new XMLHttpRequest();
//   // xhr.open(method, url);
//   // xhr.onload = function () {
//   //   if (xhr.status >= 200 && xhr.status < 300) {
//   //     resolve(xhr.response);
//   //   } else {
//   //     reject(new Error("Something went wrong!"));
//   //   }
//   // };
//   // xhr.onerror = function () {
//   //   reject(new Error("Failed to send request"));
//   // };
//   // xhr.send(JSON.stringify(data));
//   // });
//   // return promise;
//   return fetch(url, {
//     method: method,
//     body: data,
//     //  JSON.stringify(data),
//     // headers: {
//     //   "Content-type": "application/json",
//     // },
//   })
//     .then((response) => {
//       if (response.status >= 200 && response.status < 300) {
//         return response.json();
//       } else {
//         return response.json().then((errData) => {
//           console.log(errData);
//           throw new Error("something went wrong. server side.");
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       throw new Error("something went wrong!");
//     });
// }

async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log("response", response);
    const listOfPosts = response.data;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;

      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
    console.log(error.response);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  // const post = {
  //   title,
  //   body: content,
  //   userId,
  // };

  const fd = new FormData(form);
  // fd.append("title", title);
  // fd.append("body", content);
  fd.append("userId", userId);

  // sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
  axios.post("https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredcontent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredcontent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});
