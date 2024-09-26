// import * as general_functions from "./general_functions";

// Function to generate a random number_of_enteries within a specified range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to generate mock data
function generateMockData(random_num_min, random_num_max, period_data) {
    const countries = [
        "France", "Germany", "Honduras", "India", "Japan",
        "Australia", "Brazil", "Canada", "Denmark", "Egypt",
        "Kenya", "Lebanon", "Mexico", "Netherlands", "Oman",
        "Portugal", "Qatar", "Russia", "Spain", "Thailand",
        "United States", "Vietnam", "Wales", "Yemen", "Zimbabwe",
        "Argentina", "Belgium", "China", "Dominican Republic", "England",
        "Angola", "Bahamas", "Cambodia", "Djibouti", "Ecuador"
    ];

    const mockData = [];
    for (let i = 0; i < 35; i++) {
        const country = countries[i];
        const number_of_enteries = Math.floor(getRandomNumber(random_num_min, random_num_max));
        const infected_citizens = Math.floor(getRandomNumber(0, number_of_enteries * 0.31));
        const infected_foreigners = Math.floor(getRandomNumber(0, number_of_enteries * 0.14));
        const infected_precent = Math.floor(((infected_citizens + infected_foreigners) / number_of_enteries) * 100);
        const colorNumber = infected_precent;
        let color;
        if (colorNumber <= 15) {
            color = "yellow";
        } else if (colorNumber <= 30) {
            color = "orange";
        } else {
            color = "red";
        }
        const period = period_data
        const obj = {
            country: country,
            color: color,
            number_of_enteries: number_of_enteries,
            infected_citizens: infected_citizens,
            infected_foreigners: infected_foreigners,
            infected_precent: infected_precent,
            period: period
        };

        mockData.push(obj);
    }

    return mockData;
}
function generateDiffPeriodsMockData(Data, new_period) {
    let expendedMockData = [];
    Data.forEach(element => {
        const country = element.country;
        const number_of_enteries = Math.floor(getRandomNumber(element.number_of_enteries * 0.2, element.number_of_enteries * 0.8));
        const infected_citizens = Math.floor(getRandomNumber(0, number_of_enteries * 0.31));
        const infected_foreigners = Math.floor(getRandomNumber(0, number_of_enteries * 0.14));
        const infected_precent = Math.floor(((infected_citizens + infected_foreigners) / number_of_enteries) * 100);
        const colorNumber = infected_precent;
        let color;
        if (colorNumber <= 15) {
            color = "yellow";
        } else if (colorNumber <= 30) {
            color = "orange";
        } else {
            color = "red";
        }
        const period = new_period
        const obj = {
            country: country,
            color: color,
            number_of_enteries: number_of_enteries,
            infected_citizens: infected_citizens,
            infected_foreigners: infected_foreigners,
            infected_precent: infected_precent,
            period: period
        };
        expendedMockData.push(obj);
    });
    return expendedMockData;
}
// Generate mock data
const mockDataAllPeriod = generateMockData(10000, 500000, "entire_period");
const mockData12Months = generateDiffPeriodsMockData(mockDataAllPeriod, "12months")
const mockData6Months = generateDiffPeriodsMockData(mockData12Months, "6months")
const mockData3Months = generateDiffPeriodsMockData(mockData6Months, "3months")
const mockData1Month = generateDiffPeriodsMockData(mockData3Months, "month")

function ShowAndHide(SectionName) {
    const x = document.getElementById(`${SectionName}`);
    x.classList.toggle('show');
}
function add_event_show_and_hide(clicked_elemnt_id, target_element_id, elemnt_toggle_active_id = clicked_elemnt_id, isCascading = true) {
    let element = document.getElementById(`${clicked_elemnt_id}`);
    element.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!isCascading && event.target !== element) {//to prevent propagation from the first element
            return
        }
        ShowAndHide(target_element_id);

        if (elemnt_toggle_active_id != clicked_elemnt_id) {
            const elemnt_toggle_active = document.getElementById(`${elemnt_toggle_active_id}`);
            elemnt_toggle_active.classList.toggle('active');
            return;
        }
        element.classList.toggle('active');
    })
}
function buildTableCountries(data, tbodyId) {
    let table = document.getElementById(`${tbodyId}`)
    table.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        let colored_rect = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="15">
                                <rect x="0" y="0" rx="2" ry="2" width="18" height="15" fill = ${data[index].color} />
                            </svg>`
        const row =
            `<tr>
                <td class="text-align-start display-bold">${data[index].country}</td>        
                <td>${colored_rect}</td>        
                <td>${data[index].number_of_enteries}</td>        
                <td>${data[index].infected_citizens}</td>        
                <td>${data[index].infected_foreigners}</td>        
                <td>${data[index].infected_precent}%</td>        
            </tr>`

        table.innerHTML += row
    }
}
function add_sort_to_table_countries(table_Id, radioGroupName, tbody_Id) {
    const table = document.getElementById(`${table_Id}`);
    const table_headers = table.querySelectorAll("th");
    const table_headers_array = Array.from(table_headers)
    table_headers_array.forEach(element => {
        element.addEventListener('click', (event) => {
            const rowData = getDataArrayByPeriod(radioGroupName);
            let data;
            if (names_checked_countries_array.length == 0) {
                data = rowData;
            }
            else {
                data = getDataFilteredByNamesArray(rowData, names_checked_countries_array)
            }
            removeSpacialArrowFromEnd(table_headers_array);
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
            buildTableCountries(new_data_arr, `${tbody_Id}`);
        });
    });
};
function isLastCharLetterOrSymbol(str) {
    const lastChar = str.charAt(str.length - 1);
    const regex = /[a-zA-Z\u0590-\u05FF\%]/; // Regular expression pattern

    return regex.test(lastChar);
}
function removeSpacialArrowFromEnd(array) {
    array.forEach((el) => {
        let htmltext = el.innerHTML;
        if (!isLastCharLetterOrSymbol(htmltext)) {
            htmltext = htmltext.substring(0, htmltext.length - 1);
        }
        el.innerHTML = htmltext;
    });
}
function sortDataToAscOrder(data_arr, tableColumn) {
    let new_data_arr = []
    if (tableColumn === `color`) {
        const colorOrder = {
            yellow: 1,
            orange: 2,
            red: 3
        };
        new_data_arr = [...data_arr.sort((a, b) => colorOrder[a[tableColumn]] > colorOrder[b[tableColumn]] ? 1 : -1)]
    }
    else {
        new_data_arr = [...data_arr.sort((a, b) => a[tableColumn] > b[tableColumn] ? 1 : -1)]
    }

    return new_data_arr;
}
function sortDataToDescOrder(data_arr, tableColumn) {
    let new_data_arr = []
    if (tableColumn === `color`) {
        const colorOrder = {
            yellow: 1,
            orange: 2,
            red: 3
        };
        new_data_arr = [...data_arr.sort((a, b) => colorOrder[a[tableColumn]] < colorOrder[b[tableColumn]] ? 1 : -1)]
    }
    else {
        new_data_arr = [...data_arr.sort((a, b) => a[tableColumn] < b[tableColumn] ? 1 : -1)]
    }

    return new_data_arr;
}
function buildSerchCheckboxes_countries(data, serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    serchbar.firstElementChild.innerHTML = ``;
    serchbar.lastElementChild.innerHTML = ``;
    for (let index = 0; index < data.length; index++) {
        const row =
            `<div class="checkbox-row">
         <label for="${data[index].country + `checkbox_countries_table`}" class="checkbox-label" id="${data[index].country + `lable_countries_table`}">
            <input type="checkbox" name="${data[index].country + `checkbox_countries_table`}" id="${data[index].country + `checkbox_countries_table`}" class="checkbox-box">
         ${data[index].country}</label>
         </div>`;
        let foundObj = names_checked_countries_array.find(name => name === data[index].country);
        if (foundObj) {
            serchbar.firstElementChild.innerHTML += row;
        }
        else {
            serchbar.lastElementChild.innerHTML += row;
        }
    }
    data.forEach(element => {
        let foundObj = names_checked_countries_array.find(obj => obj === element.country);
        const box = document.getElementById(element.country + `checkbox_countries_table`);
        if (foundObj) {
            box.checked = true;
        }
        else {
            box.checked = false;
        }
    });
}
function getDataArrayByPeriod(groupName) {
    const currPeriod = currValOfRadioGroup(groupName);
    switch (currPeriod) {
        case 'allPeriod':
            return mockDataAllPeriod;
        case '12months':
            return mockData12Months;
        case '6months':
            return mockData6Months;
        case '3months':
            return mockData3Months;
        case '1month':
            return mockData1Month;
    }
}
function currValOfRadioGroup(groupName) {
    const groupArray = document.getElementsByName(groupName);
    for (let index = 0; index < groupArray.length; index++) {
        if (groupArray[index].checked) {
            return groupArray[index].value;
        }
    }
}
function getDataFilteredByNamesArray(data, NamesArray) {
    let filteredDataArray = []
    data.forEach(el => {
        const countryObj = NamesArray.find(obj => obj === getFirstFieldValue(el))
        if (countryObj) {
            filteredDataArray.push(el);
        }
    })
    return filteredDataArray;
}
// function filterDataByValue_countries(value, data) {
//     let filteredData = [];
//     for (let index = 0; index < data.length; index++) {
//         value = value.toLowerCase();
//         let name = getFirstFieldValue(data[index]).toLowerCase();
//         if (name.includes(value)) {
//             filteredData.push(data[index])
//         }
//     }
//     return filteredData;
// }
function EditClickedNamesArray_countries(serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    const checkbox_array = serchbar.querySelectorAll('.checkbox-box');
    checkbox_array.forEach((element) => {
        element.addEventListener(`click`, (event) => {
            event.stopPropagation();
            let element_name = element.name.slice(0, -24);
            toggleArrayItem_countries(element_name);
        })
    });
}
function toggleArrayItem_countries(item) {
    const index = names_clicked_countries_array.indexOf(item);
    if (index > -1) {
        names_clicked_countries_array.splice(index, 1);
    } else {
        names_clicked_countries_array.push(item);
    }
}
function updateTimePeriod(btnId, periodValue) {
    const button = document.getElementById(`${btnId}`);
    translatedValue = translatePeriodValueToHebrew(periodValue);
    button.innerHTML = `${translatedValue}`;
}
function translatePeriodValueToHebrew(periodValue) {
    switch (periodValue) {
        case 'allPeriod':
            return "עד עכשיו"
        case '12months':
        case 'lastYear':
            return 'שנה'
        case '6months':
        case 'last6Months':
            return '6 חודשים'
        case '3months':
        case 'last3Months':
            return '3 חודשים'
        case '1month':
        case 'lastMonth':
            return 'חודש אחרון'
    }
}
function clean_serch_new(serchDivId, data, table_filter_id) {
    const serch_div = document.getElementById(`${serchDivId}`);
    serch_div.value = "";
    buildSerchCheckboxes_countries(data, `${table_filter_id}`);
    EditClickedNamesArray_countries(`${table_filter_id}`);
}
function run_countries_table() {
    buildTableCountries(mockData3Months, `countries-table-body`);
    add_sort_to_table_countries("countries-table", "countriesTable-time", `countries-table-body`);
    buildSerchCheckboxes_countries(mockDataAllPeriod, "countries-table-filter")
    EditClickedNamesArray_countries("countries-table-filter")
    add_event_show_and_hide(`countries-reset-btn`, `countries-and-time-filter-dropdown`, `countries-filter-btn`);
    add_event_show_and_hide(`countries-submit-btn`, `countries-and-time-filter-dropdown`, `countries-filter-btn`);
    add_event_show_and_hide(`countries-filter-btn`, `countries-and-time-filter-dropdown`, `countries-filter-btn`);
    add_event_show_and_hide(`serch-countries`, `countries-table-filter`)
    updateNumOfChosenOnes(`num-of-chosens-countries`, mockData3Months.length);
    updateNumOfChosenOnes(`num-of-countries-filter-btn`, mockData3Months.length);
    updateTimePeriod('time-span-countries-filter-btn', currValOfRadioGroup('countriesTable-time'))

    const CountriesForm = document.getElementById('countries-and-time-form');
    const countries_serch = document.getElementById('serch-countries');
    const countries_filter_btn = document.getElementById(`countries-filter-btn`);

    countries_serch.addEventListener("keyup", (event) => {
        let value = event.target.value;
        // let data = filterDataByValue_countries(value, mockDataAllPeriod);
        let data = filterDataByValue(value, mockDataAllPeriod);
        buildSerchCheckboxes_countries(data, "countries-table-filter")
        // EditClickedArray(`hospitals-bed-table-filter`, data);
        EditClickedNamesArray_countries("countries-table-filter");
    })
    CountriesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // if (event.target !== CountriesForm) {//to prevent propagation from the first element
        //     return
        // }
        const data = getDataArrayByPeriod('countriesTable-time')
        names_checked_countries_array = [...names_clicked_countries_array];
        let NumOfChosenOnes = names_checked_countries_array.length;
        if (NumOfChosenOnes === 0) {
            NumOfChosenOnes = data.length;
            buildTableCountries(data, `countries-table-body`);
        }
        else {
            let filtered_data = getDataFilteredByNamesArray(data, names_checked_countries_array)
            buildTableCountries(filtered_data, `countries-table-body`);
        }
        updateNumOfChosenOnes(`num-of-chosens-countries`, NumOfChosenOnes);
        updateNumOfChosenOnes(`num-of-countries-filter-btn`, NumOfChosenOnes);
        updateTimePeriod('time-span-countries-filter-btn', currValOfRadioGroup('countriesTable-time'))
        currPeriod = currValOfRadioGroup('countriesTable-time');

        const table_filter = document.getElementById(`countries-table-filter`);
        table_filter.classList.remove("show");
    })
    CountriesForm.addEventListener('reset', (event) => {
        names_clicked_countries_array = [];
        names_checked_countries_array = [];
        NumOfChosenOnes = mockData3Months.length;
        buildTableCountries(mockData3Months, `countries-table-body`);
        updateNumOfChosenOnes(`num-of-chosens-countries`, NumOfChosenOnes);
        updateNumOfChosenOnes(`num-of-countries-filter-btn`, NumOfChosenOnes);
        updateTimePeriod('time-span-countries-filter-btn', '3months')
        const table_filter = document.getElementById(`countries-table-filter`);
        table_filter.classList.remove("show");
    })
    countries_filter_btn.addEventListener(`click`, (event) => {
        names_checked_countries_array.forEach(element => {
            const box = document.getElementById(element + `checkbox_countries_table`);
            if (box) {
                box.checked = true;
            }
        })
        names_clicked_countries_array.forEach(element => {
            const box = document.getElementById(element + `checkbox_countries_table`);
            foundObj = names_clicked_countries_array.find(obj => obj === element);
            if (!foundObj) {
                box.checked = false;
            }
        })
        clean_serch_new("serch-countries", getDataArrayByPeriod('countriesTable-time'), `countries-table-filter`)
        names_clicked_countries_array = [...names_checked_countries_array];
        const groupArray = document.getElementsByName('countriesTable-time');
        for (let index = 0; index < groupArray.length; index++) {
            if (groupArray[index].checked) {
                groupArray[index].checked = false;
            }
            if (groupArray[index].value === currPeriod) {
                groupArray[index].checked = true;
            }
        }
        const table_filter = document.getElementById(`countries-table-filter`);
        table_filter.classList.remove("show");
    })
}


let names_clicked_countries_array = [];
let names_checked_countries_array = [];
let currPeriod = '3months';
run_countries_table()