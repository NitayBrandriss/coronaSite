<<<<<<< HEAD
function generateMockData_DailyCases(numDays) {
  const data = [/*["time", "new_verified_patients", "average_last_7", "total", "day"]*/];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numDays + 1);
  let total = 0;
  let previousDayPatients = 60;

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);


    const dateString = formatDate(currentDate);
    const randomPercentage = (Math.random() * 0.6) + 0.701; // Random value between 0.7 and 1.3
    let newVerifiedPatients = Math.floor(previousDayPatients * randomPercentage);
    newVerifiedPatients = Math.min(newVerifiedPatients, 100); // Limit new_verified_patients to 1000
    newVerifiedPatients = Math.max(10, newVerifiedPatients);

    data.push([
      dateString,
      newVerifiedPatients,
      null,
      total + newVerifiedPatients,
    ]);

    total += newVerifiedPatients;
    previousDayPatients = newVerifiedPatients;
  }

  // Calculate average_last_7
  for (let i = 7; i < data.length; i++) {
    const sum = data
      .slice(i - 6, i + 1)
      .reduce((acc, curr) => acc + curr[1], 0);
    const average = Math.round(sum / Math.min(i, 7));

    data[i][2] = average;
  }
  return data;
}
function splitDataByTime(data) {
  const lastMonthData = data.slice(-30); // Last month's data (30 days)
  const last3MonthsData = data.slice(-90); // Last 3 months' data (90 days)
  const last6MonthsData = data.slice(-180); // Last 6 months' data (180 days)
  const lastYearData = data.slice(-365); // Last year's data (365 days)
  const allData = data

  return {
    lastMonth: lastMonthData,
    last3Months: last3MonthsData,
    last6Months: last6MonthsData,
    lastYear: lastYearData,
    allData: allData
  };
}
function getDataByPeriod_graph(groupName, splittedData) {
  const currPeriod = currValOfRadioGroup(groupName);
  switch (currPeriod) {
    case 'allPeriod':
      return splittedData.allData;
    case '12months':
      return splittedData.lastYear;
    case '6months':
      return splittedData.last6Months;
    case '3months':
      return splittedData.last3Months;
    case '1month':
      return splittedData.lastMonth;
  }
}
function getNewDaily_casesOption(dataSource = [], isDarkModeOn = false) {
  let splitlineColor = "#e1e1e1";
  let labelsColor ="#5c5a5a";
  let textColor = "#000000";
  let barColor = "#50cbfd";
  let lineColor = "#ff7d67";
  if (isDarkModeOn) {
    labelsColor = "#e3e2e1";
    textColor = "#ffffff";
    barColor = "#2cd2db";
    lineColor = "#fcc537";
  }
  let axisXrowData = [...sortTheDataByDimantion(dataSource, 0)];
  
  let newOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid'
        }
      },
      extraCssText: 'width: fit-content; background-color: var(--graph-hovering-layer);',
      formatter: (params) => {
        // ${Object.keys(params[0])} <br />
        return `
        <span class="params-color"><b>${getDayNameFromDate(params[0].axisValueLabel) + " " + params[0].axisValueLabel}</b> <br/>
              
              ${params[0].marker} <b>${params[0].value}</b> ${params[0].seriesName} <br />
              ${params[1].marker} <b>${params[1].value}</b> ${params[1].seriesName} <br />
              ${params[2].marker} <b>${params[2].value}</b> ${params[2].seriesName} <br />

               `
      },
    },
    grid: [{
      show: false,
      left: "55",
      right: "10",
      bottom: "50px",
      top: "10%"
    },
    ],
    xAxis:
      [{
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
    yAxis: [
      {
        type: 'value',
        name: 'מאומתים חדשים',
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
      },
      {
        type: 'value',
        id: 'total',
        axisLabel: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: `rgba(128, 128, 128, 0)`
          },
        },
      }
    ],
    series: [
      {
        name: ` מאומתים`,
        type: 'bar',
        yAxisIndex: 0,
        data: [...sortTheDataByDimantion(dataSource, 1)],
        color: `${barColor}`,
        barWidth: "50%"
      },
      {
        name: ' ממוצע נע',
        yAxisIndex: 0,
        type: 'line',
        data: [...sortTheDataByDimantion(dataSource, 2)],
        color: `${lineColor}`
      },
      {
        name: ' מאומתים מצטבר ',
        type: 'bar',
        barGap: "-100%",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' סה"כ מאומתים';
          }
        },
        data: [...sortTheDataByDimantion(dataSource, 3)],
        color: `rgba(128, 128, 128, 0)`,
      }
    ]
  };
  return newOption;
}
function sortTheDataByDimantion(data, dimantionNum) {
  let sortedData = []
  data.forEach(element => {
    sortedData.push(element[dimantionNum])
  });
  return sortedData;
}
function runDailyCasesGraph(splittedData) {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph')); // let myNewChart = echarts.init(document.getElementById('daily_new_verified_patients_card_body'));
  // Display the chart using the configuration items and data just specified.
  myNewChart.setOption(getNewDaily_casesOption(splittedData.lastMonth,isDarkModeOn));

  window.addEventListener('resize', function () {
    myNewChart.resize();
  });

  add_event_show_and_hide(`daily_cases_graph-reset-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  add_event_show_and_hide(`daily_cases_graph-submit-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  add_event_show_and_hide(`daily_cases_graph-filter-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  updateTimePeriod('time-span-daily_cases_graph-filter-btn', currValOfRadioGroup('daily_cases_graph-time'));

  const daily_cases_graphForm = document.getElementById('daily_cases_graph-form');
  const daily_cases_graph_filter_btn = document.getElementById(`daily_cases_graph-filter-btn`);

  daily_cases_graphForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData);
    myNewChart.setOption(getNewDaily_casesOption(data,isDarkModeOn));
    updateTimePeriod('time-span-daily_cases_graph-filter-btn', currValOfRadioGroup('daily_cases_graph-time'));
    currPeriod_daily_cases_graph = currValOfRadioGroup('daily_cases_graph-time');

    const graph_filter = document.getElementById(`daily_cases_graph-filter-dropdown`);
    graph_filter.classList.remove("show");
  });
  daily_cases_graphForm.addEventListener('reset', (event) => {
    myNewChart.setOption(getNewDaily_casesOption(splittedData.lastMonth,isDarkModeOn));
    updateTimePeriod('time-span-daily_cases_graph-filter-btn', '1month')
    currPeriod_daily_cases_graph = '1month';
    const graph_filter = document.getElementById(`daily_cases_graph-filter-dropdown`);
    graph_filter.classList.remove("show");
  });
  daily_cases_graph_filter_btn.addEventListener(`click`, (event) => {
    const groupArray = document.getElementsByName('daily_cases_graph-time');
    for (let index = 0; index < groupArray.length; index++) {
      if (groupArray[index].checked) {
        groupArray[index].checked = false;
      }
      if (groupArray[index].value === currPeriod_daily_cases_graph) {
        groupArray[index].checked = true;
      }
    }
  });



  let targetNode = document.getElementById('body')

  // watch for a specific class change
  let classWatcherDailyCases = new ClassWatcher(targetNode, 'dark-theme', workOnClassAdd_Daily_cases, workOnClassRemoval_Daily_cases)
}
function workOnClassAdd_Daily_cases() {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph'), 'dark');
  const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData_DailyCases);
  myNewChart.setOption(getNewDaily_casesOption(data, isDarkModeOn));
}
function workOnClassRemoval_Daily_cases() {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph'));
  const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData_DailyCases);
  myNewChart.setOption(getNewDaily_casesOption(data, isDarkModeOn));
}
class ClassWatcher {

  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
    this.targetNode = targetNode
    this.classToWatch = classToWatch
    this.classAddedCallback = classAddedCallback
    this.classRemovedCallback = classRemovedCallback
    this.observer = null
    this.lastClassState = targetNode.classList.contains(this.classToWatch)

    this.init()
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
    this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        let currentClassState = mutation.target.classList.contains(this.classToWatch)
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState
          if (currentClassState) {
            this.classAddedCallback()
          }
          else {
            this.classRemovedCallback()
          }
        }
      }
    }
  }
}
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
function getDayNameFromDate(dateString) {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed in JavaScript Date
  const year = parseInt(dateParts[2]);

  const dateObject = new Date(year, month, day);
  const dayIndex = dateObject.getDay();

  const dayNames = ["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", "יום ש'"];

  return dayNames[dayIndex];
}

const mockData_DailyCases = generateMockData_DailyCases(380);// Generate mock data for 400 days
const splittedData_DailyCases = splitDataByTime(mockData_DailyCases)

let currPeriod_daily_cases_graph = '1month';
=======
function generateMockData_DailyCases(numDays) {
  const data = [/*["time", "new_verified_patients", "average_last_7", "total", "day"]*/];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numDays + 1);
  let total = 0;
  let previousDayPatients = 60;

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);


    const dateString = formatDate(currentDate);
    const randomPercentage = (Math.random() * 0.6) + 0.701; // Random value between 0.7 and 1.3
    let newVerifiedPatients = Math.floor(previousDayPatients * randomPercentage);
    newVerifiedPatients = Math.min(newVerifiedPatients, 100); // Limit new_verified_patients to 1000
    newVerifiedPatients = Math.max(10, newVerifiedPatients);

    data.push([
      dateString,
      newVerifiedPatients,
      null,
      total + newVerifiedPatients,
    ]);

    total += newVerifiedPatients;
    previousDayPatients = newVerifiedPatients;
  }

  // Calculate average_last_7
  for (let i = 7; i < data.length; i++) {
    const sum = data
      .slice(i - 6, i + 1)
      .reduce((acc, curr) => acc + curr[1], 0);
    const average = Math.round(sum / Math.min(i, 7));

    data[i][2] = average;
  }
  return data;
}
function splitDataByTime(data) {
  const lastMonthData = data.slice(-30); // Last month's data (30 days)
  const last3MonthsData = data.slice(-90); // Last 3 months' data (90 days)
  const last6MonthsData = data.slice(-180); // Last 6 months' data (180 days)
  const lastYearData = data.slice(-365); // Last year's data (365 days)
  const allData = data

  return {
    lastMonth: lastMonthData,
    last3Months: last3MonthsData,
    last6Months: last6MonthsData,
    lastYear: lastYearData,
    allData: allData
  };
}
function getDataByPeriod_graph(groupName, splittedData) {
  const currPeriod = currValOfRadioGroup(groupName);
  switch (currPeriod) {
    case 'allPeriod':
      return splittedData.allData;
    case '12months':
      return splittedData.lastYear;
    case '6months':
      return splittedData.last6Months;
    case '3months':
      return splittedData.last3Months;
    case '1month':
      return splittedData.lastMonth;
  }
}
function getNewDaily_casesOption(dataSource = [], isDarkModeOn = false) {
  let splitlineColor = "#e1e1e1";
  let labelsColor ="#5c5a5a";
  let textColor = "#000000";
  let barColor = "#50cbfd";
  let lineColor = "#ff7d67";
  if (isDarkModeOn) {
    labelsColor = "#e3e2e1";
    textColor = "#ffffff";
    barColor = "#2cd2db";
    lineColor = "#fcc537";
  }
  let axisXrowData = [...sortTheDataByDimantion(dataSource, 0)];
  
  let newOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid'
        }
      },
      extraCssText: 'width: fit-content; background-color: var(--graph-hovering-layer);',
      formatter: (params) => {
        // ${Object.keys(params[0])} <br />
        return `
        <span class="params-color"><b>${getDayNameFromDate(params[0].axisValueLabel) + " " + params[0].axisValueLabel}</b> <br/>
              
              ${params[0].marker} <b>${params[0].value}</b> ${params[0].seriesName} <br />
              ${params[1].marker} <b>${params[1].value}</b> ${params[1].seriesName} <br />
              ${params[2].marker} <b>${params[2].value}</b> ${params[2].seriesName} <br />

               `
      },
    },
    grid: [{
      show: false,
      left: "55",
      right: "10",
      bottom: "50px",
      top: "10%"
    },
    ],
    xAxis:
      [{
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
    yAxis: [
      {
        type: 'value',
        name: 'מאומתים חדשים',
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
      },
      {
        type: 'value',
        id: 'total',
        axisLabel: {
          show: false,
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: `rgba(128, 128, 128, 0)`
          },
        },
      }
    ],
    series: [
      {
        name: ` מאומתים`,
        type: 'bar',
        yAxisIndex: 0,
        data: [...sortTheDataByDimantion(dataSource, 1)],
        color: `${barColor}`,
        barWidth: "50%"
      },
      {
        name: ' ממוצע נע',
        yAxisIndex: 0,
        type: 'line',
        data: [...sortTheDataByDimantion(dataSource, 2)],
        color: `${lineColor}`
      },
      {
        name: ' מאומתים מצטבר ',
        type: 'bar',
        barGap: "-100%",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' סה"כ מאומתים';
          }
        },
        data: [...sortTheDataByDimantion(dataSource, 3)],
        color: `rgba(128, 128, 128, 0)`,
      }
    ]
  };
  return newOption;
}
function sortTheDataByDimantion(data, dimantionNum) {
  let sortedData = []
  data.forEach(element => {
    sortedData.push(element[dimantionNum])
  });
  return sortedData;
}
function runDailyCasesGraph(splittedData) {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph')); // let myNewChart = echarts.init(document.getElementById('daily_new_verified_patients_card_body'));
  // Display the chart using the configuration items and data just specified.
  myNewChart.setOption(getNewDaily_casesOption(splittedData.lastMonth,isDarkModeOn));

  window.addEventListener('resize', function () {
    myNewChart.resize();
  });

  add_event_show_and_hide(`daily_cases_graph-reset-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  add_event_show_and_hide(`daily_cases_graph-submit-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  add_event_show_and_hide(`daily_cases_graph-filter-btn`, `daily_cases_graph-filter-dropdown`, `daily_cases_graph-filter-btn`);
  updateTimePeriod('time-span-daily_cases_graph-filter-btn', currValOfRadioGroup('daily_cases_graph-time'));

  const daily_cases_graphForm = document.getElementById('daily_cases_graph-form');
  const daily_cases_graph_filter_btn = document.getElementById(`daily_cases_graph-filter-btn`);

  daily_cases_graphForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData);
    myNewChart.setOption(getNewDaily_casesOption(data,isDarkModeOn));
    updateTimePeriod('time-span-daily_cases_graph-filter-btn', currValOfRadioGroup('daily_cases_graph-time'));
    currPeriod_daily_cases_graph = currValOfRadioGroup('daily_cases_graph-time');

    const graph_filter = document.getElementById(`daily_cases_graph-filter-dropdown`);
    graph_filter.classList.remove("show");
  });
  daily_cases_graphForm.addEventListener('reset', (event) => {
    myNewChart.setOption(getNewDaily_casesOption(splittedData.lastMonth,isDarkModeOn));
    updateTimePeriod('time-span-daily_cases_graph-filter-btn', '1month')
    currPeriod_daily_cases_graph = '1month';
    const graph_filter = document.getElementById(`daily_cases_graph-filter-dropdown`);
    graph_filter.classList.remove("show");
  });
  daily_cases_graph_filter_btn.addEventListener(`click`, (event) => {
    const groupArray = document.getElementsByName('daily_cases_graph-time');
    for (let index = 0; index < groupArray.length; index++) {
      if (groupArray[index].checked) {
        groupArray[index].checked = false;
      }
      if (groupArray[index].value === currPeriod_daily_cases_graph) {
        groupArray[index].checked = true;
      }
    }
  });



  let targetNode = document.getElementById('body')

  // watch for a specific class change
  let classWatcherDailyCases = new ClassWatcher(targetNode, 'dark-theme', workOnClassAdd_Daily_cases, workOnClassRemoval_Daily_cases)
}
function workOnClassAdd_Daily_cases() {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph'), 'dark');
  const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData_DailyCases);
  myNewChart.setOption(getNewDaily_casesOption(data, isDarkModeOn));
}
function workOnClassRemoval_Daily_cases() {
  let myNewChart = echarts.init(document.getElementById('daily_cases_graph'));
  const data = getDataByPeriod_graph('daily_cases_graph-time', splittedData_DailyCases);
  myNewChart.setOption(getNewDaily_casesOption(data, isDarkModeOn));
}
class ClassWatcher {

  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
    this.targetNode = targetNode
    this.classToWatch = classToWatch
    this.classAddedCallback = classAddedCallback
    this.classRemovedCallback = classRemovedCallback
    this.observer = null
    this.lastClassState = targetNode.classList.contains(this.classToWatch)

    this.init()
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
    this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        let currentClassState = mutation.target.classList.contains(this.classToWatch)
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState
          if (currentClassState) {
            this.classAddedCallback()
          }
          else {
            this.classRemovedCallback()
          }
        }
      }
    }
  }
}
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
function getDayNameFromDate(dateString) {
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed in JavaScript Date
  const year = parseInt(dateParts[2]);

  const dateObject = new Date(year, month, day);
  const dayIndex = dateObject.getDay();

  const dayNames = ["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", "יום ש'"];

  return dayNames[dayIndex];
}

const mockData_DailyCases = generateMockData_DailyCases(380);// Generate mock data for 400 days
const splittedData_DailyCases = splitDataByTime(mockData_DailyCases)

let currPeriod_daily_cases_graph = '1month';
>>>>>>> origin/main
runDailyCasesGraph(splittedData_DailyCases);