loadingParents = new Promise((resolve,reject)=>{
    let parentElements = `    <main>
    <section>
        <h1>Rest Countries Bootstrap Card</h1>
        <div class="container-fluid" id="country-data">

        </div>
    </section>
</main>`
    document.body.innerHTML = parentElements;
    resolve();
})


loadCountries = new Promise((resolve,reject)=>{
    let url = 'https://restcountries.eu/rest/v2/all';
    let countryData = document.getElementById('country-data');
    fetch(url)
        .then(res => res.json())
        .then(data => {getRestCountries(data);resolve();})
        .catch(err => {console.log("Error:", err);reject();});
    
    function getRestCountries(param) {
        let tags = '';
        let count = 1;
        let divRow = document.createElement('div');
        for (let i = 0; i < param.length; i++) {
            
            divRow.setAttribute('class', 'row');
            let divCol = document.createElement('div');
            divCol.setAttribute('class', 'col col-sm-12 col-md-4 col-lg-3 col-xl-3 mt-3');
            tags = `
                <div class="card card-custom-css">
                    <div class="card-header">
                       ${count}). ${param[i].name}
                    </div>
                    <img src="${param[i].flag}" id="${param[i].alpha2Code}" class="card-img-top cust-card-img" alt="${param[i].name}">
                    <div class="card-body card-body-custom-css">
                        <p class="card-text">
                            Capital: <span class="badge badge-success"> ${param[i].capital} </span><br>
                            Country Codes: <span class="badge "> ${param[i].alpha2Code}, ${param[i].alpha3Code}</span><br>
                            Region: <span class="badge "> ${param[i].region}</span>
                        </p>
                    </div>
                </div>
                `;
            count++;
            divCol.innerHTML = tags;
            divRow.appendChild(divCol);
            countryData.appendChild(divRow);
        }
    }
})

loadingParents
.then(loadCountries)
.catch(error=>console.log('error',error));

