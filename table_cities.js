<<<<<<< HEAD
// Array of city names in Israel
const cityNames = [
    "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya",
    "Beer Sheva", "Bnei Brak", "Holon", "Ramat Gan", "Ashkelon", "Bat Yam", "Herzliya",
    "Kfar Saba", "Modi'in-Maccabim-Re'ut", "Hadera", "Ra'anana", "Lod", "Ramla", "Nahariya",
    "Beit Shemesh", "Kiryat Ata", "Givatayim", "Ramat HaSharon", "Rosh HaAyin", "Yavne",
    "Tiberias", "Qiryat Motzkin", "Dimona", "Acre"
];

// Function to generate a random number within a specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate mock data
function generateCitiesMockData(cityNames) {
    let citiesMockData = [];
    for (let i = 0; i < cityNames.length; i++) {
        const city = cityNames[i];
        const newPatients = parseFloat((Math.random() * 22).toFixed(1));
        const positiveChecksPercent = getRandomNumber(0, 50);
        const verifiedPatientsChange = getRandomNumber(0, 100);
        const activePatients = getRandomNumber(0, 1000);

        // Calculate the grade
        const sum = newPatients + positiveChecksPercent + verifiedPatientsChange + activePatients;
        const highestSum = 22 + 50 + 100 + 1000;
        const grade = parseFloat((sum / highestSum * 10).toFixed(1));

        const obj = {
            name: city,
            grade: grade,
            new_patients: newPatients,
            positive_checks_percent: positiveChecksPercent,
            verified_patients_change: verifiedPatientsChange,
            active_patients: activePatients
        };

        citiesMockData.push(obj);
    }
    // Print the generated mock data
    return citiesMockData;
}


function buildTableCities(data, tbodyId) {
    let table = document.getElementById(`${tbodyId}`)
    table.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        let colored_background = "purple";
        if (data[index].grade < 4.5) {
            colored_background = "green";
        } else if (data[index].grade < 6) {
            colored_background = "yellow";
        } else if (data[index].grade < 7.5) {
            colored_background = "orange";
        } else {
            colored_background = "red";
        }
        const row =
            `<tr>
        <td class="text-align-start display-bold">${data[index].name}</td>        
        <td><div class="grade-color ${colored_background}"> ${data[index].grade}</div></td>        
        <td>${data[index].new_patients}</td>        
        <td>${data[index].positive_checks_percent}</td>        
        <td>${data[index].verified_patients_change}</td>        
        <td>${data[index].active_patients}</td>        
        </tr>`

        table.innerHTML += row
    }
}
function add_sort_to_table_Cities(table_Id, rowData, tbody_Id) {
    const table = document.getElementById(`${table_Id}`);
    const table_headers = table.querySelectorAll("th");
    const table_headers_array = Array.from(table_headers)
    table_headers_array.forEach(element => {
        element.addEventListener('click', (event) => {
            removeSpacialArrowFromEnd(table_headers_array);
            let data = [...rowData];///
            if (curr_chosen_city.length > 0) {
               return
            }
            const data_arr = Array.from(data); 
            const target = event.target;
            let column = target.dataset.column;
            let order = target.dataset.order;
            let text = target.innerHTML;

            let new_data_arr = []
            if (order == 'natural') {
                target.dataset.order = "asc"
                text += `&#9662`
                new_data_arr = [...sortDataToAscOrder(data_arr, column)]

            } else if (order == 'asc') {
                target.dataset.order = "desc";
                text += `&#9652`
                new_data_arr = [...sortDataToDescOrder(data_arr, column)]
            }
            else if (order == 'desc') {
                target.dataset.order = "natural";
                new_data_arr = [...data_arr]
            }
            target.innerHTML = text;
            buildTableCities(new_data_arr, `${tbody_Id}`);
        });
    });
};
function buildSerchCheckboxes_cities(data, serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    serchbar.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const row =
            `<div class="checkbox-row">
         <label for="${data[index].name + `checkbox_cities_table`}" class="checkbox-label" id="${data[index].name + `lable_cities_table`}">
            <input type="checkbox" name="${data[index].name + `checkbox_cities_table`}" id="${data[index].name + `checkbox_cities_table`}" class="checkbox-box hidden">
         ${data[index].name}</label>
         </div>`;
        serchbar.innerHTML += row;
    }
}
function EditClickedCity(serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    const checkbox_array = serchbar.querySelectorAll('.checkbox-box');
    checkbox_array.forEach((element) => {
        element.addEventListener(`click`, (event) => {
            event.stopPropagation();
            let element_name = element.name.slice(0, -21);
            clicked_city = [`${element_name}`]
            const table_filter = document.getElementById('cities-table-filter');
            const serch_cities = document.getElementById('serch-cities');
            table_filter.classList.remove("show");
            serch_cities.value = `${element_name}`;
        })
    });
}
function clean_serch_cities(serchDivId, data, table_filter_id) {
    const serch_div = document.getElementById(`${serchDivId}`);
    serch_div.value = "";
    buildSerchCheckboxes_cities(data, `${table_filter_id}`);
    EditClickedCity(`${table_filter_id}`);
}

function run_cities_table() {
    citiesMockData = [...generateCitiesMockData(cityNames)].reverse();
    
    buildTableCities(citiesMockData, `cities-table-body`);
    add_sort_to_table_Cities("cities-table", citiesMockData, `cities-table-body`);
    buildSerchCheckboxes_cities(citiesMockData, "cities-table-filter");
    EditClickedCity("cities-table-filter");
    add_event_show_and_hide(`cities-reset-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`cities-submit-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`cities-filter-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`serch-cities`, `cities-table-filter`);

    const CitiesForm = document.getElementById('cities-form');
    const cities_serch = document.getElementById('serch-cities');
    const cities_filter_btn = document.getElementById(`cities-filter-btn`);
    cities_serch.addEventListener("keyup", (event) => {
        let value = event.target.value;
        let data = filterDataByValue(value, citiesMockData);
        buildSerchCheckboxes_cities(data, "cities-table-filter")
        EditClickedCity("cities-table-filter");
    })
    CitiesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        curr_chosen_city = [...clicked_city];
        const filter_btn = document.getElementById("chosen-city-filter-btn");
        let NumOfChosenOnes = curr_chosen_city.length;
        if (NumOfChosenOnes === 0) {
            buildTableCities(citiesMockData, `cities-table-body`);
            filter_btn.innerText = "כלל היישובים"
        }
        else {
            let filtered_data = getDataFilteredByNamesArray(citiesMockData, curr_chosen_city)
            buildTableCities(filtered_data, `cities-table-body`);
            filter_btn.innerText = `${curr_chosen_city[0]}`
        }
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
    CitiesForm.addEventListener('reset', (event) => {
        const filter_btn = document.getElementById("chosen-city-filter-btn");
        clicked_city = [];
        curr_chosen_city = [];
        filter_btn.innerText = "כלל היישובים"
        buildTableCities(citiesMockData, `cities-table-body`);
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
    cities_filter_btn.addEventListener(`click`, (event) => {
        clean_serch_cities("serch-cities", citiesMockData, `cities-table-filter`)
        clicked_city = [...curr_chosen_city];
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
}

let clicked_city = [];
let curr_chosen_city = [];
let citiesMockData = [];

=======
// Array of city names in Israel
const cityNames = [
    "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya",
    "Beer Sheva", "Bnei Brak", "Holon", "Ramat Gan", "Ashkelon", "Bat Yam", "Herzliya",
    "Kfar Saba", "Modi'in-Maccabim-Re'ut", "Hadera", "Ra'anana", "Lod", "Ramla", "Nahariya",
    "Beit Shemesh", "Kiryat Ata", "Givatayim", "Ramat HaSharon", "Rosh HaAyin", "Yavne",
    "Tiberias", "Qiryat Motzkin", "Dimona", "Acre"
];

// Function to generate a random number within a specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate mock data
function generateCitiesMockData(cityNames) {
    let citiesMockData = [];
    for (let i = 0; i < cityNames.length; i++) {
        const city = cityNames[i];
        const newPatients = parseFloat((Math.random() * 22).toFixed(1));
        const positiveChecksPercent = getRandomNumber(0, 50);
        const verifiedPatientsChange = getRandomNumber(0, 100);
        const activePatients = getRandomNumber(0, 1000);

        // Calculate the grade
        const sum = newPatients + positiveChecksPercent + verifiedPatientsChange + activePatients;
        const highestSum = 22 + 50 + 100 + 1000;
        const grade = parseFloat((sum / highestSum * 10).toFixed(1));

        const obj = {
            name: city,
            grade: grade,
            new_patients: newPatients,
            positive_checks_percent: positiveChecksPercent,
            verified_patients_change: verifiedPatientsChange,
            active_patients: activePatients
        };

        citiesMockData.push(obj);
    }
    // Print the generated mock data
    return citiesMockData;
}


function buildTableCities(data, tbodyId) {
    let table = document.getElementById(`${tbodyId}`)
    table.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        let colored_background = "purple";
        if (data[index].grade < 4.5) {
            colored_background = "green";
        } else if (data[index].grade < 6) {
            colored_background = "yellow";
        } else if (data[index].grade < 7.5) {
            colored_background = "orange";
        } else {
            colored_background = "red";
        }
        const row =
            `<tr>
        <td class="text-align-start display-bold">${data[index].name}</td>        
        <td><div class="grade-color ${colored_background}"> ${data[index].grade}</div></td>        
        <td>${data[index].new_patients}</td>        
        <td>${data[index].positive_checks_percent}</td>        
        <td>${data[index].verified_patients_change}</td>        
        <td>${data[index].active_patients}</td>        
        </tr>`

        table.innerHTML += row
    }
}
function add_sort_to_table_Cities(table_Id, rowData, tbody_Id) {
    const table = document.getElementById(`${table_Id}`);
    const table_headers = table.querySelectorAll("th");
    const table_headers_array = Array.from(table_headers)
    table_headers_array.forEach(element => {
        element.addEventListener('click', (event) => {
            removeSpacialArrowFromEnd(table_headers_array);
            let data = [...rowData];///
            if (curr_chosen_city.length > 0) {
               return
            }
            const data_arr = Array.from(data); 
            const target = event.target;
            let column = target.dataset.column;
            let order = target.dataset.order;
            let text = target.innerHTML;

            let new_data_arr = []
            if (order == 'natural') {
                target.dataset.order = "asc"
                text += `&#9662`
                new_data_arr = [...sortDataToAscOrder(data_arr, column)]

            } else if (order == 'asc') {
                target.dataset.order = "desc";
                text += `&#9652`
                new_data_arr = [...sortDataToDescOrder(data_arr, column)]
            }
            else if (order == 'desc') {
                target.dataset.order = "natural";
                new_data_arr = [...data_arr]
            }
            target.innerHTML = text;
            buildTableCities(new_data_arr, `${tbody_Id}`);
        });
    });
};
function buildSerchCheckboxes_cities(data, serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    serchbar.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const row =
            `<div class="checkbox-row">
         <label for="${data[index].name + `checkbox_cities_table`}" class="checkbox-label" id="${data[index].name + `lable_cities_table`}">
            <input type="checkbox" name="${data[index].name + `checkbox_cities_table`}" id="${data[index].name + `checkbox_cities_table`}" class="checkbox-box hidden">
         ${data[index].name}</label>
         </div>`;
        serchbar.innerHTML += row;
    }
}
function EditClickedCity(serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    const checkbox_array = serchbar.querySelectorAll('.checkbox-box');
    checkbox_array.forEach((element) => {
        element.addEventListener(`click`, (event) => {
            event.stopPropagation();
            let element_name = element.name.slice(0, -21);
            clicked_city = [`${element_name}`]
            const table_filter = document.getElementById('cities-table-filter');
            const serch_cities = document.getElementById('serch-cities');
            table_filter.classList.remove("show");
            serch_cities.value = `${element_name}`;
        })
    });
}
function clean_serch_cities(serchDivId, data, table_filter_id) {
    const serch_div = document.getElementById(`${serchDivId}`);
    serch_div.value = "";
    buildSerchCheckboxes_cities(data, `${table_filter_id}`);
    EditClickedCity(`${table_filter_id}`);
}

function run_cities_table() {
    citiesMockData = [...generateCitiesMockData(cityNames)];
    buildTableCities(citiesMockData, `cities-table-body`);
    add_sort_to_table_Cities("cities-table", citiesMockData, `cities-table-body`);
    buildSerchCheckboxes_cities(citiesMockData, "cities-table-filter");
    EditClickedCity("cities-table-filter");
    add_event_show_and_hide(`cities-reset-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`cities-submit-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`cities-filter-btn`, `cities-filter-dropdown`, `cities-filter-btn`);
    add_event_show_and_hide(`serch-cities`, `cities-table-filter`);

    const CitiesForm = document.getElementById('cities-form');
    const cities_serch = document.getElementById('serch-cities');
    const cities_filter_btn = document.getElementById(`cities-filter-btn`);
    cities_serch.addEventListener("keyup", (event) => {
        let value = event.target.value;
        let data = filterDataByValue(value, citiesMockData);
        buildSerchCheckboxes_cities(data, "cities-table-filter")
        EditClickedCity("cities-table-filter");
    })
    CitiesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        curr_chosen_city = [...clicked_city];
        const filter_btn = document.getElementById("chosen-city-filter-btn");
        let NumOfChosenOnes = curr_chosen_city.length;
        if (NumOfChosenOnes === 0) {
            buildTableCities(citiesMockData, `cities-table-body`);
            filter_btn.innerText = "כלל היישובים"
        }
        else {
            let filtered_data = getDataFilteredByNamesArray(citiesMockData, curr_chosen_city)
            buildTableCities(filtered_data, `cities-table-body`);
            filter_btn.innerText = `${curr_chosen_city[0]}`
        }
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
    CitiesForm.addEventListener('reset', (event) => {
        const filter_btn = document.getElementById("chosen-city-filter-btn");
        clicked_city = [];
        curr_chosen_city = [];
        filter_btn.innerText = "כלל היישובים"
        buildTableCities(citiesMockData, `cities-table-body`);
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
    cities_filter_btn.addEventListener(`click`, (event) => {
        clean_serch_cities("serch-cities", citiesMockData, `cities-table-filter`)
        clicked_city = [...curr_chosen_city];
        const table_filter = document.getElementById(`cities-table-filter`);
        table_filter.classList.remove("show");
    })
}

let clicked_city = [];
let curr_chosen_city = [];
let citiesMockData = [];

>>>>>>> origin/main
run_cities_table()