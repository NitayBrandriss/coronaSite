// import {ShowAndHide,add_event_show_and_hide} from "./general_functions";


const hospitals = [
    {
        name: 'Ariel',
        number1: 42,
        number2: 87
    },
    {
        name: 'Bruno',
        number1: 15,
        number2: 68
    },
    {
        name: 'Citsiliya',
        number1: 73,
        number2: 22
    },
    {
        name: 'Denver',
        number1: 5,
        number2: 91
    },
    {
        name: 'Euro',
        number1: 30,
        number2: 50
    },
    {
        name: 'Finland',
        number1: 88,
        number2: 12
    },
    {
        name: 'Georgia',
        number1: 61,
        number2: 77
    },
    {
        name: 'Hiveland',
        number1: 10,
        number2: 42
    },
    {
        name: 'Hospital I',
        number1: 95,
        number2: 8
    },
    {
        name: 'Hospital J',
        number1: 17,
        number2: 36
    },
    {
        name: 'Hospital K',
        number1: 25,
        number2: 70
    },
    {
        name: 'Hospital L',
        number1: 88,
        number2: 42
    },
    {
        name: 'Hospital M',
        number1: 10,
        number2: 99
    },
    {
        name: 'Hospital N',
        number1: 56,
        number2: 32
    },
    {
        name: 'Hospital O',
        number1: 41,
        number2: 55
    },
    {
        name: 'Hospital P',
        number1: 70,
        number2: 11
    },
    {
        name: 'Hospital Q',
        number1: 95,
        number2: 38
    },
    {
        name: 'Hospital R',
        number1: 15,
        number2: 85
    },
    {
        name: 'Hospital S',
        number1: 60,
        number2: 20
    },
    {
        name: 'Hospital T',
        number1: 80,
        number2: 5
    }
];
let HospitalsBedsCheckedArray = [];
let HospitalsBedsClickedArray = [];
function getFirstFieldValue(obj) {
    const keys = Object.keys(obj);
    const firstKey = keys[0];
    return obj[firstKey];
}
function ShowAndHide(SectionName) {
    const x = document.getElementById(`${SectionName}`);
    x.classList.toggle('show');
}
function add_event_show_and_hide(clicked_elemnt_id, target_element_id, elemnt_toggle_active_id = clicked_elemnt_id, isCascading = true) {
    let element = document.getElementById(clicked_elemnt_id);
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
function buildTable(data, tbodyId) {
    let table = document.getElementById(`${tbodyId}`)
    table.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        const row =
            `<tr>
                <td class="text-align-start display-bold">${data[index].name}</td>        
                <td class="display-bold">${data[index].number1}</td>        
                <td class="display-bold">${data[index].number2}</td>        
            </tr>`
        table.innerHTML += row
    }
}
function add_sort_to_table(table_Id, data, tbody_Id) {

    const bed_capacity_table = document.getElementById(`${table_Id}`);
    const bed_capacity_table_headers = bed_capacity_table.querySelectorAll("th");
    let bed_capacity_table_headers_array = Array.from(bed_capacity_table_headers)
    bed_capacity_table_headers_array.forEach(element => {
        element.addEventListener('click', (event) => {
            data = HospitalsBedsCheckedArray;
            if (data == 0) {
                data = hospitals;
            }
            const data_arr = Array.from(data);
            const target = event.target;
            let column = target.dataset.column;
            bed_capacity_table_headers_array.forEach(el => {
                let htmltext = el.innerHTML;
                if (!isLastCharLetterOrSymbol(htmltext))
                    htmltext = htmltext.substring(0, htmltext.length - 1);
                el.innerHTML = htmltext;
            });
            let order = target.dataset.order;
            let text = target.innerHTML;

            let new_data_arr = []
            if (order == 'natural') {
                target.dataset.order = "asc"
                new_data_arr = [...data_arr.sort((a, b) => a[column] > b[column] ? 1 : -1)]
                text += ` &#9662`

            } else if (order == 'asc') {
                target.dataset.order = "desc";
                new_data_arr = [...data_arr.sort((a, b) => a[column] < b[column] ? 1 : -1)]
                text += ` &#9652`
            }
            else if (order == 'desc') {
                target.dataset.order = "natural";
                new_data_arr = [...data_arr]
            }
            target.innerHTML = text;
            buildTable(new_data_arr, `${tbody_Id}`);
        });
    });
};
function isLastCharLetterOrSymbol(str) {
    const lastChar = str.charAt(str.length - 1);
    const regex = /[a-zA-Z\u0590-\u05FF\%]/; // Regular expression pattern

    return regex.test(lastChar);
}
function buildSerchCheckboxes(data, serchDivId) {
    const serchbar = document.getElementById(`${serchDivId}`);
    serchbar.firstElementChild.innerHTML = ``;
    serchbar.lastElementChild.innerHTML = ``;
    for (let index = 0; index < data.length; index++) {
        const row =
            `<div class="checkbox-row">
         <label for="${data[index].name + `checkbox`}" class="checkbox-label" id="${data[index].name + `lable`}">
            <input type="checkbox" name="${data[index].name + `checkbox`}" id="${data[index].name + `checkbox`}" class="checkbox-box">
         ${data[index].name}</label>
         </div>`;
        let foundObj = HospitalsBedsCheckedArray.find(obj => obj.name === data[index].name);
        if (foundObj) {
            serchbar.firstElementChild.innerHTML += row;
        }
        else {
            serchbar.lastElementChild.innerHTML += row;
        }
    }
    data.forEach(element => {
        let foundObj = HospitalsBedsClickedArray.find(obj => obj.name === element.name);
        const box = document.getElementById(element.name + `checkbox`);
        if (foundObj) {
            box.checked = true;
        }
        else {
            box.checked = false;
        }
    });
}
function EditClickedArray(serchDivId, data) {
    const serchbar = document.getElementById(`${serchDivId}`);
    const checkbox_array = serchbar.querySelectorAll('.checkbox-box');
    checkbox_array.forEach((element) => {
        element.addEventListener(`click`, (event) => {
            event.stopPropagation();
            const element_name = element.name.slice(0, -8)
            const obj_from_data = data.find(obj => obj.name === element_name);
            toggleArrayItem(obj_from_data);
        })
    });
}
function toggleArrayItem(item) {
    const index = HospitalsBedsClickedArray.indexOf(item);
    if (index > -1) {
        HospitalsBedsClickedArray.splice(index, 1);
    } else {
        HospitalsBedsClickedArray.push(item);
    }
}

function filterDataByValue(value, data) {
    let filteredData = [];
    for (let index = 0; index < data.length; index++) {
        value = value.toLowerCase();
        let name = getFirstFieldValue(data[index]).toLowerCase();
        if (name.includes(value)) {
            filteredData.push(data[index])
        }
    }
    return filteredData;
}
function updateNumOfChosenOnes(placeId, newNum) {
    const place = document.getElementById(`${placeId}`);
    place.innerText = newNum;
}

function clean_serch_hospital() {
    const serch_hospital = document.getElementById(`serch-hospital`);
    serch_hospital.value = "";
    //let value = "";//let data = filterDataByValue(value, hospitals);
    let data = hospitals;
    buildSerchCheckboxes(data, `hospitals-bed-table-filter`);
    EditClickedArray(`hospitals-bed-table-filter`, data);
}
function clean_serch(serchDivId, data, table_filter_id) {
    const serch_div = document.getElementById(`${serchDivId}`);
    serch_div.value = "";
    buildSerchCheckboxes(data, `${table_filter_id}`);
    EditClickedArray(`${table_filter_id}`, data);
}


const hospital_serch = document.getElementById('serch-hospital');
const HospitalsBedsForm = document.getElementById('hospitals-beds-form');
const hospitals_Beds_Filter_Btn = document.getElementById('hospitals-beds-filter-btn');

hospital_serch.addEventListener("keyup", (event) => {
    let value = event.target.value;
    let data = filterDataByValue(value, hospitals);
    buildSerchCheckboxes(data, `hospitals-bed-table-filter`);
    EditClickedArray(`hospitals-bed-table-filter`, data);
})
HospitalsBedsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target !== HospitalsBedsForm) {//to prevent propagation from the first element
        return
    }
    HospitalsBedsCheckedArray = [...HospitalsBedsClickedArray];
    let NumOfChosenOnes = HospitalsBedsCheckedArray.length;
    if (NumOfChosenOnes === 0) {
        NumOfChosenOnes = hospitals.length;
        buildTable(hospitals, `hospital-table`);
    }
    else {
        buildTable(HospitalsBedsCheckedArray, `hospital-table`);
    }
    updateNumOfChosenOnes(`num-of-chosens-hospitals`, NumOfChosenOnes);
    updateNumOfChosenOnes(`num-of-chosens-hospitals-filter-btn`, NumOfChosenOnes);
    const hospitals_bed_table_filter = document.getElementById(`hospitals-bed-table-filter`);
    hospitals_bed_table_filter.classList.remove("show");
})
HospitalsBedsForm.addEventListener('reset', (event) => {
    HospitalsBedsCheckedArray = [];
    HospitalsBedsClickedArray = [];
    NumOfChosenOnes = hospitals.length;
    updateNumOfChosenOnes(`num-of-chosens-hospitals`, NumOfChosenOnes);
    updateNumOfChosenOnes(`num-of-chosens-hospitals-filter-btn`, NumOfChosenOnes);
    buildTable(hospitals, `hospital-table`);
    const hospitals_bed_table_filter = document.getElementById(`hospitals-bed-table-filter`);
    hospitals_bed_table_filter.classList.remove("show");
})
hospitals_Beds_Filter_Btn.addEventListener(`click`, (event) => {
    HospitalsBedsCheckedArray.forEach(element => {
        const box = document.getElementById(element.name + `checkbox`);
        if (box) {
            box.checked = true;
        }
    })
    HospitalsBedsClickedArray.forEach(element => {
        const box = document.getElementById(element.name + `checkbox`);
        foundObj = HospitalsBedsCheckedArray.find(obj => obj.name === element.name);
        if (!foundObj) {
            box.checked = false;
        }
    })
    clean_serch_hospital()
    HospitalsBedsClickedArray = [...HospitalsBedsCheckedArray];
    const hospitals_bed_table_filter = document.getElementById(`hospitals-bed-table-filter`);
    hospitals_bed_table_filter.classList.remove("show");
})

buildTable(hospitals, `hospital-table`);
add_sort_to_table("bed-capacity-table", HospitalsBedsClickedArray, `hospital-table`);
buildSerchCheckboxes(hospitals, `hospitals-bed-table-filter`);
EditClickedArray(`hospitals-bed-table-filter`, hospitals)
updateNumOfChosenOnes(`num-of-chosens-hospitals`, hospitals.length);
updateNumOfChosenOnes(`num-of-chosens-hospitals-filter-btn`, hospitals.length);
add_event_show_and_hide(`serch-hospital`, `hospitals-bed-table-filter`)
add_event_show_and_hide(`hospitals-beds-reset-btn`, `hospitals-beds-filter-dropdown`, `hospitals-beds-filter-btn`);
add_event_show_and_hide(`hospitals-beds-submit-btn`, `hospitals-beds-filter-dropdown`, `hospitals-beds-filter-btn`);
add_event_show_and_hide(`hospitals-beds-filter-btn`, `hospitals-beds-filter-dropdown`, `hospitals-beds-filter-btn`);




