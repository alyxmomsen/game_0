/* 
(function () {

    const button = document.querySelector('.get-wether');

    button.addEventListener('click' , (e) => {
        
        async function postData(url = "", data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: "GET", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                // "Content-Type": "application/json",
                "X-Yandex-API-Key":"7f31175a-5960-4935-85e6-92d9ab842f73" ,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //   body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }
          
          postData("https://api.weather.yandex.ru/v2/informers?lat=19&lon=19", { answer: 42 }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
          });


    });


    return 0 ;

})() ; */
