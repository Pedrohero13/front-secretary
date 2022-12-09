


export const authenticationService = {
    loginUser,
    verifiqueToken,
    
};

async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/api/secretary/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((data) => data.json())
      .then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      })
     
   }

   async function verifiqueToken(token) {
    return fetch('http://127.0.0.1:8000/api/secretary/verify/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    })
      .then(data => data.json())
   }  

