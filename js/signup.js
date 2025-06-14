import { baseUrl } from './info.js';

document.querySelector('#frmSignup').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = this.elements.email.value.trim();
    const pwd = this.elements.password.value.trim();
    const repeatPwd = this.elements.repeatPassword.value.trim();

    if (pwd !== repeatPwd) {
        alert('The passwords do not match');        
    } else {
        
        // Calculate the new ID based on the highest existing one
        
        fetch(baseUrl + '/users')
        .then((response) => {
            return response.json();
        }).then((data) => {
            let newID;
            if (data.length === 0) {
                newID = 1;
            } else {
                newID = parseInt(data[data.length - 1].id) + 1;
            }

            insertUser(email, pwd, newID);
        });
    }

    function insertUser(email, pwd, id) {
        const user = {
            id: String(id),
            email,
            pwd
        };

        fetch(baseUrl + '/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => { 
            console.log(response); 
            alert('The sign up was successful');
        })
        .catch((error) => { 
            console.log(error); 
            alert('There was an error while trying to sign up');
        });
    }
});