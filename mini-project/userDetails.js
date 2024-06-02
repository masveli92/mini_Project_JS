let url = new URL (location.href);
let id = url.searchParams.get('id');

let container = document.createElement('div');
container.classList.add('userInfoDiv');

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(value => value.json())
    .then(user => {
        function explorer (obj) {
            let ul = document.createElement('ul');
            ul.classList.add('infoUl');
            container.appendChild(ul);
            for (const objKey in obj) {
                if (typeof obj[objKey] !== 'object') {
                    let li = document.createElement('li');
                    li.innerText = `${objKey}: ${(obj[objKey])}`;
                    li.classList.add('infoList');
                    ul.appendChild(li);
                } else {
                    explorer(obj[objKey]);
                }
            }
        }
        explorer (user);

        let button = document.createElement('button');
        button.classList.add('postButton');
        button.innerText = `posts of ${user.name} `;
        button.addEventListener('click', function(event) {

        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(value => value.json())
            .then(posts => {
                let postBox = document.createElement('div');
                postBox.classList.add('postBox');
                container.appendChild(postBox)
                for (const post of posts) {
                    let postDiv = document.createElement('div');
                    postDiv.classList.add('postDiv');
                    postDiv.innerText = `${post.title} `;
                    postBox.appendChild(postDiv);

                    let a = document.createElement('a');
                    a.href = `postDetails.html?id=${post.id}`;
                    a.innerText = 'go to post info';
                    a.classList.add ('postLink');
                    postDiv.appendChild(a);
                }
            });
        },  {once: true});

        container.appendChild(button);


    });

document.body.appendChild(container);
