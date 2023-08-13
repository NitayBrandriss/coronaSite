function generateMockData_hospitalizations(numDays) {
    const dateArray = [];
    const currentDate = new Date();

    let prevSevereCases = getRandomNumber(20, 50);
    let prevModerateCases = getRandomNumber(10, 20);
    let prevMildCases = getRandomNumber(30, 100);

    for (let i = 0; i < numDays; i++) {
        const time = formatDate(currentDate);

        const severeCases = ((Math.random() * 0.6) + 0.715) * prevSevereCases;
        prevSevereCases = severeCases;

        const moderateCases = ((Math.random() * 0.6) + 0.705) * prevModerateCases;
        prevModerateCases = moderateCases;

        const mildCases = ((Math.random() * 0.6) + 0.705) * prevMildCases;
        prevMildCases = mildCases;

        dateArray.unshift([time, Math.round(severeCases), Math.round(moderateCases), Math.round(mildCases)]);

        currentDate.setDate(currentDate.getDate() - 1);
    }

    return dateArray;
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function witchCheckboxesAreOn(checkboxes_container_id) {
    const container = document.getElementById(`${checkboxes_container_id}`);
    const chekedCheckboxes = container.querySelectorAll('input[type="checkbox"]:checked')
    const checkedValues = [];
    chekedCheckboxes.forEach(checkbox => {
        checkedValues.push(checkbox.value);
    });
    return checkedValues
}
function updateFiletBtnText() {
    const chosenCases = witchCheckboxesAreOn("hospitalizations-graph-checkbox-container");

    const filter_btm_text_severe = document.getElementById('hospitalizations-filter-btn-text-severe');
    const filter_btm_text_moderate = document.getElementById('hospitalizations-filter-btn-text-moderate');
    const filter_btm_text_mild = document.getElementById('hospitalizations-filter-btn-text-mild');

    filter_btm_text_severe.innerText = ""
    filter_btm_text_moderate.innerText = ""
    filter_btm_text_mild.innerText = ""

    if (chosenCases.includes("severe")) {
        filter_btm_text_severe.innerText = "קשה, "
    }
    if (chosenCases.includes("moderate")) {
        filter_btm_text_moderate.innerText = "בינוני, "
    }
    if (chosenCases.includes("mild")) {
        filter_btm_text_mild.innerText = "קל, "
    }
}
function modifyDataByCheckedBoxes_hospitalizationGraph() {
    const data = JSON.parse(JSON.stringify(getDataByPeriod_graph('hospitalizations_graph-time', splittedData_hospitalizations)));
    let chosenCases = witchCheckboxesAreOn("hospitalizations-graph-checkbox-container");
    data.forEach(day => {
        if (!chosenCases.includes("severe")) {
            day[1] = null;
        }
        if (!chosenCases.includes("moderate")) {
            day[2] = null;
        }
        if (!chosenCases.includes("mild")) {
            day[3] = null;
        }
    });
    return data;
}
function workOnClassAdd_Hospitalizations() {
    let myNewChart = echarts.init(document.getElementById('Hospitalizations-graph'), 'dark');
    const data = modifyDataByCheckedBoxes_hospitalizationGraph();
    myNewChart.setOption(getNew_Hospitalizations_Option(data, isDarkModeOn));
}
function workOnClassRemoval_Hospitalizations() {
    let myNewChart = echarts.init(document.getElementById('Hospitalizations-graph'));
    const data = modifyDataByCheckedBoxes_hospitalizationGraph();
    myNewChart.setOption(getNew_Hospitalizations_Option(data, isDarkModeOn));
}
function runHospitalizationsGraph(splittedData) {
    let myNewChart = echarts.init(document.getElementById('Hospitalizations-graph'));
    myNewChart.setOption(getNew_Hospitalizations_Option(splittedData.lastMonth, isDarkModeOn));

    window.addEventListener('resize', function () {
        myNewChart.resize();
    });

    add_event_show_and_hide(`hospitalizations-reset-btn`, `hospitalizations-filter-dropdown`, `hospitalizations-filter-btn`);
    add_event_show_and_hide(`hospitalizations-submit-btn`, `hospitalizations-filter-dropdown`, `hospitalizations-filter-btn`);
    add_event_show_and_hide(`hospitalizations-filter-btn`, `hospitalizations-filter-dropdown`, `hospitalizations-filter-btn`);
    updateTimePeriod('hospitalizations-filter-btn-time', currValOfRadioGroup('hospitalizations_graph-time'));
    updateFiletBtnText();

    const Hospitalizations_graphForm = document.getElementById('Hospitalizations-form');
    // const daily_cases_graph_filter_btn = document.getElementById(`daily_cases_graph-filter-btn`);

    Hospitalizations_graphForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = modifyDataByCheckedBoxes_hospitalizationGraph();
        myNewChart.setOption(getNew_Hospitalizations_Option(data, isDarkModeOn));
        updateTimePeriod('hospitalizations-filter-btn-time', currValOfRadioGroup('hospitalizations_graph-time'));
        updateFiletBtnText();
        currPeriod_daily_cases_graph = currValOfRadioGroup('hospitalizations_graph-time');

        const graph_filter = document.getElementById(`hospitalizations-filter-dropdown`);
        graph_filter.classList.remove("show");
    });
    Hospitalizations_graphForm.addEventListener('reset', (event) => {
        // myNewChart.setOption(getNewDaily_casesOption(splittedData.lastMonth, isDarkModeOn));
        // updateTimePeriod('time-span-daily_cases_graph-filter-btn', '1month')
        // currPeriod_daily_cases_graph = '1month';
        const graph_filter = document.getElementById(`daily_cases_graph-filter-dropdown`);
        graph_filter.classList.remove("show");
    });
    // daily_cases_graph_filter_btn.addEventListener(`click`, (event) => {
    //     // const groupArray = document.getElementsByName('daily_cases_graph-time');
    //     // for (let index = 0; index < groupArray.length; index++) {
    //     //     if (groupArray[index].checked) {
    //     //         groupArray[index].checked = false;
    //     //     }
    //     //     if (groupArray[index].value === currPeriod_daily_cases_graph) {
    //     //         groupArray[index].checked = true;
    //     //     }
    //     // }
    // });



    let targetNode = document.getElementById('body')

    // watch for a specific class change
    let classWatcherDailyCases = new ClassWatcher(targetNode, 'dark-theme', workOnClassAdd_Hospitalizations, workOnClassRemoval_Hospitalizations)
}
function getNew_Hospitalizations_Option(dataSource = [], isDarkModeOn = false) {
    let splitlineColor = "#e1e1e1";
    let labelsColor = "#5c5a5a";
    let textColor = "#000000";
    let severeCasesColor = "#50cbfd";
    let moderateCasesColor = "#b6ca51";
    let mildCasesColor = "#007f7f";
    if (isDarkModeOn) {
        labelsColor = "#e3e2e1";
        textColor = "#ffffff";
        severeCasesColor = "#2cd2db";
        moderateCasesColor = "#fd8264";
        mildCasesColor = "#9be985";
    }
    let axisXrowData = [...sortTheDataByDimantion(dataSource, 0)];
    
    let newOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'solid'
                },
            },
            formatter: (params) => {
                return `
            <span class="params-color"><b>${getDayNameFromDate(params[0].axisValueLabel) + " " + params[0].axisValueLabel}</b> <br/>
                  ${params[0].marker} <b>${params[0].value}</b> ${params[0].seriesName} <br />
                  ${params[1].marker} <b>${params[1].value}</b> ${params[1].seriesName} <br />
                  ${params[2].marker} <b>${params[2].value}</b> ${params[2].seriesName} <br />
                   `
            },
        },
        grid: {
            show: false,
            left: "55",
            right: "10",
            bottom: "50px",
            top: "10%"
        },
        xAxis: [{
            type: 'category',
            name: 'תאריך',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                color: `${textColor}`,
                fontSize: 14,
                fontWeight: "100",
                fontFamily: "Open Sans"
            },
            color: `${textColor}`,
            min: 0,
            position: "bottom",
            data: [...axisXrowData],
            axisPointer: {
                show: 'false',
                // type: 'shadow'
            },
            axisLabel: {
                color: `${labelsColor}`,
                fontSize: 11,
                margin: 15,
                formatter: function (value, index) {
                    return value.slice(0, 5);
                }
            },
            axisTick: {
                length: 11,
                lineStyle: {
                    color: `${splitlineColor}` //`${textColor}`,
                },
                alignWithLabel: true,
            },
            axisLine: {
                lineStyle: {
                    color: `${splitlineColor}` //`${textColor}`,
                },
            },
        }],
        yAxis: [{
            type: 'value',
            name: 'מספר מאושפזים',
            nameTextStyle: {
                color: `${textColor}`,
                fontSize: 14,
                fontWeight: "lighter",
                fontFamily: "Open Sans"
            },
            nameLocation: 'middle',
            nameGap: 30,
            position: "left",
            axisLabel: {
                formatter: '{value}',
                color: `${labelsColor}`,
                fontSize: 11,
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: `${splitlineColor}`
                },
            }
        }],
        series: [
            {
                name: ' קשה ',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [...sortTheDataByDimantion(dataSource, 1)],
                color: `${severeCasesColor}`
            },
            {
                name: ' בינוני ',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [...sortTheDataByDimantion(dataSource, 2)],
                color: `${moderateCasesColor}`

            },
            {
                name: ' קל ',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [...sortTheDataByDimantion(dataSource, 3)],
                color: `${mildCasesColor}`
            }
        ]
    };
    return newOption;
}


const mockData_hospitalizations = generateMockData_hospitalizations(400);
const splittedData_hospitalizations = splitDataByTime(mockData_hospitalizations);
let currPeriod_hospitalizations_graph = '1month';
runHospitalizationsGraph(splittedData_hospitalizations);
