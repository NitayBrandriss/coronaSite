<<<<<<< HEAD
function generateMockData_breakdown() {
  const periods = ['lastMonth', 'last3Months', 'last6Months', 'lastYear', 'allPeriod'];
  const situations = ['positive', 'dead', 'brethe', 'severe', 'hospitalized'];
  const ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

  const mockData = {
    lastMonth: [],
    last3Months: [],
    last6Months: [],
    lastYear: [],
    allPeriod: []
  };

  periods.forEach(period => {
    const periodData = [];
    situations.forEach(() => {
      const situationData = [];
      ageGroups.forEach(() => {
        const ageGroupData = [(getRandomNumber_1dec(0, 30) / 1).toFixed(1), (getRandomNumber_1dec(-30, 0) / 1).toFixed(1)];
        ageGroupData.forEach((element, index) => {
          if (element * 1 === Math.floor(element * 1))
            ageGroupData[index] = (element * 1).toFixed(0);
        });
        situationData.push(ageGroupData);
      });
      periodData.push(situationData);
    });
    mockData[period] = periodData;
  });

  return mockData;
}
function getRandomNumber_1dec(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function sortTheDataByCategory(groupName, dataSource) {
  const currCategory = currValOfRadioGroup(groupName);
  switch (currCategory) {
    case 'confirmedCases':
      return dataSource[0];
    case 'deaths':
      return dataSource[1];
    case 'ventilated':
      return dataSource[2];
    case 'severeIllness':
      return dataSource[3];
    case 'hospitalizations':
      return dataSource[4];
  }
}
function workOnClassAdd_breakdown() {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'));
  const currPeriod = currValOfRadioGroup('breakdown_chart-time');
  const allDataPeriod = JSON.parse(JSON.stringify(mockData_breakdown[`${currPeriod}`]));
  myNewChart.setOption(getNew_breakdown_chart_option(allDataPeriod, isDarkModeOn));

}
function workOnClassRemoval_breakdown() {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'), 'dark');
  const currPeriod = currValOfRadioGroup('breakdown_chart-time');
  const allDataPeriod = JSON.parse(JSON.stringify(mockData_breakdown[`${currPeriod}`]));
  myNewChart.setOption(getNew_breakdown_chart_option(allDataPeriod, isDarkModeOn));

}
function updateFilterCategorytext(btnId, value) {
  const button = document.getElementById(`${btnId}`);
  translatedValue = translateCategoryValueToHebrew(value);
  button.innerHTML = `${translatedValue + ", "}`;
  // button.innerHTML = `${newText }`;
}
function translateCategoryValueToHebrew(value) {
  switch (value) {
    case 'confirmedCases':
      return "מאומתים"
    case 'deaths':
      return 'נפטרים'
    case 'ventilated':
      return 'מונשמים'
    case 'severeIllness':
      return 'מצב קשה'
    case 'hospitalizations':
      return 'מאושפזים'
  }
}

function getNew_breakdown_chart_option(dataSource = [], isDarkModeOn = false) {

  let splitlineColor = "#e1e1e1";
  let labelsColor = "#5c5a5a";
  let textColor = "#000000";
  let menColor = "#50cbfd";
  let womenColor = "#b6ca51";
  if (isDarkModeOn) {
    labelsColor = "#e3e2e1";
    textColor = "#ffffff";
    menColor = "#2cd2db";
    womenColor = "#fd8264";
  }
  let axisXrowData = [...sortTheDataByCategory("breakdown_chart-category", dataSource)];
  let axisXrowDataMapMale = axisXrowData.map(([male]) => male);
  let axisXrowDataFemale = axisXrowData.map(([kfakd, female]) => female);

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid'
        }
      },
      formatter: (params) => {
        return `
      <span class="params-color"><b>${params[0].axisValueLabel}</b> <br/>
            ${params[0].marker} <b>${params[0].value}</b> ${params[0].seriesName} <br />
            ${params[1].marker} <b>${Math.abs(params[1].value)}</b> ${params[1].seriesName} <br />
             `
      },
    },
    grid: {
      show: false,
      left: "80px",
      right: "10",
      bottom: "50px",
      top: "0%"
    },
    xAxis: [{
      type: 'value',
      name: '% סה"כ',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: `${textColor}`,
        fontSize: 14,
        fontWeight: "100",
        fontFamily: "Open Sans"
      },
      color: `${textColor}`,
      min: -40,
      max: 40,
      interval: 10,
      position: "bottom",

      axisLabel: {
        color: `${labelsColor}`,
        fontSize: 11,
        margin: 15,
        formatter: function (value, index) {
          return Math.abs(value);
        }
      },
      axisTick: {
        show: true,
        length: 6,
        lineStyle: {
          color: `${splitlineColor}`
        },
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: `${splitlineColor}`
        },
      },
    }],
    yAxis: [
      {
        type: 'category',
        name: 'קבוצת גיל',
        nameTextStyle: {
          color: `${textColor}`,
          fontSize: 14,
          fontWeight: "lighter",
          fontFamily: "Open Sans"
        },
        nameLocation: 'middle',
        nameGap: 50,
        axisTick: {
          show: false
        },
        axisLabel: {
          color: `${labelsColor}`,
          fontSize: 11,
          margin: 15,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: `${splitlineColor}`
          },
        },
        data: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+']
      }
    ],
    series: [
      {
        name: 'גברים',
        type: 'bar',
        stack: 'Total',
        barWidth: '50%',
        label: {
          show: true,
          position: 'right',
          formatter: function (value, index) {
            return `${value.value}` + "%";
          },
          color: `${textColor}`
        },
        color: `${menColor}`,
        data: [...axisXrowDataMapMale]
      },
      {
        name: 'נשים',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left',
          formatter: function (value, index) {
            return `${Math.abs(value.value)}` + "%";
          },
          color: `${textColor}`
        },
        color: `${womenColor}`,
        data: [...axisXrowDataFemale]
      }
    ]
  };
  return option;
};
function runBreakdownChart(splittedData) {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'));
  myNewChart.setOption(getNew_breakdown_chart_option(splittedData.lastMonth, isDarkModeOn));

  window.addEventListener('resize', function () {
    myNewChart.resize();
  });

  add_event_show_and_hide(`breakdown-reset-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  add_event_show_and_hide(`breakdown-submit-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  add_event_show_and_hide(`breakdown-filter-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  updateTimePeriod('breakdown-filter-btn-time', currValOfRadioGroup('breakdown_chart-time'));
  updateFilterCategorytext("breakdown-filter-btn-text-currParameter", currValOfRadioGroup("breakdown_chart-category"));

  const breakdown_chartForm = document.getElementById('breakdown-form');

  breakdown_chartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = splittedData[currValOfRadioGroup('breakdown_chart-time')];
    myNewChart.setOption(getNew_breakdown_chart_option(data, isDarkModeOn));
    updateTimePeriod('breakdown-filter-btn-time', currValOfRadioGroup('breakdown_chart-time'));
    updateFilterCategorytext("breakdown-filter-btn-text-currParameter", currValOfRadioGroup("breakdown_chart-category"));
    currPeriod_breakdown_chart = currValOfRadioGroup('breakdown_chart-time');

    const chart_filter = document.getElementById(`breakdown-filter-dropdown`);
    chart_filter.classList.remove("show");
  });
  breakdown_chartForm.addEventListener('reset', (event) => {
    const chart_filter = document.getElementById(`breakdown-filter-dropdown`);
    chart_filter.classList.remove("show");
  });




  let targetNode = document.getElementById('body')

  // watch for a specific class change
  let classWatcherDailyCases = new ClassWatcher(targetNode, 'dark-theme', workOnClassAdd_breakdown, workOnClassRemoval_breakdown)
}

const mockData_breakdown = generateMockData_breakdown();
let currPeriod_breakdown_chart = 'lastMonth';
=======
function generateMockData_breakdown() {
  const periods = ['lastMonth', 'last3Months', 'last6Months', 'lastYear', 'allPeriod'];
  const situations = ['positive', 'dead', 'brethe', 'severe', 'hospitalized'];
  const ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'];

  const mockData = {
    lastMonth: [],
    last3Months: [],
    last6Months: [],
    lastYear: [],
    allPeriod: []
  };

  periods.forEach(period => {
    const periodData = [];
    situations.forEach(() => {
      const situationData = [];
      ageGroups.forEach(() => {
        const ageGroupData = [(getRandomNumber_1dec(0, 30) / 1).toFixed(1), (getRandomNumber_1dec(-30, 0) / 1).toFixed(1)];
        ageGroupData.forEach((element, index) => {
          if (element * 1 === Math.floor(element * 1))
            ageGroupData[index] = (element * 1).toFixed(0);
        });
        situationData.push(ageGroupData);
      });
      periodData.push(situationData);
    });
    mockData[period] = periodData;
  });

  return mockData;
}
function getRandomNumber_1dec(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function sortTheDataByCategory(groupName, dataSource) {
  const currCategory = currValOfRadioGroup(groupName);
  switch (currCategory) {
    case 'confirmedCases':
      return dataSource[0];
    case 'deaths':
      return dataSource[1];
    case 'ventilated':
      return dataSource[2];
    case 'severeIllness':
      return dataSource[3];
    case 'hospitalizations':
      return dataSource[4];
  }
}
function workOnClassAdd_breakdown() {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'));
  const currPeriod = currValOfRadioGroup('breakdown_chart-time');
  const allDataPeriod = JSON.parse(JSON.stringify(mockData_breakdown[`${currPeriod}`]));
  myNewChart.setOption(getNew_breakdown_chart_option(allDataPeriod, isDarkModeOn));

}
function workOnClassRemoval_breakdown() {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'), 'dark');
  const currPeriod = currValOfRadioGroup('breakdown_chart-time');
  const allDataPeriod = JSON.parse(JSON.stringify(mockData_breakdown[`${currPeriod}`]));
  myNewChart.setOption(getNew_breakdown_chart_option(allDataPeriod, isDarkModeOn));

}
function updateFilterCategorytext(btnId, value) {
  const button = document.getElementById(`${btnId}`);
  translatedValue = translateCategoryValueToHebrew(value);
  button.innerHTML = `${translatedValue + ", "}`;
  // button.innerHTML = `${newText }`;
}
function translateCategoryValueToHebrew(value) {
  switch (value) {
    case 'confirmedCases':
      return "מאומתים"
    case 'deaths':
      return 'נפטרים'
    case 'ventilated':
      return 'מונשמים'
    case 'severeIllness':
      return 'מצב קשה'
    case 'hospitalizations':
      return 'מאושפזים'
  }
}

function getNew_breakdown_chart_option(dataSource = [], isDarkModeOn = false) {

  let splitlineColor = "#e1e1e1";
  let labelsColor = "#5c5a5a";
  let textColor = "#000000";
  let menColor = "#50cbfd";
  let womenColor = "#b6ca51";
  if (isDarkModeOn) {
    labelsColor = "#e3e2e1";
    textColor = "#ffffff";
    menColor = "#2cd2db";
    womenColor = "#fd8264";
  }
  let axisXrowData = [...sortTheDataByCategory("breakdown_chart-category", dataSource)];
  let axisXrowDataMapMale = axisXrowData.map(([male]) => male);
  let axisXrowDataFemale = axisXrowData.map(([kfakd, female]) => female);

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          type: 'solid'
        }
      },
      formatter: (params) => {
        return `
      <span class="params-color"><b>${params[0].axisValueLabel}</b> <br/>
            ${params[0].marker} <b>${params[0].value}</b> ${params[0].seriesName} <br />
            ${params[1].marker} <b>${Math.abs(params[1].value)}</b> ${params[1].seriesName} <br />
             `
      },
    },
    grid: {
      show: false,
      left: "80px",
      right: "10",
      bottom: "50px",
      top: "0%"
    },
    xAxis: [{
      type: 'value',
      name: '% סה"כ',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: `${textColor}`,
        fontSize: 14,
        fontWeight: "100",
        fontFamily: "Open Sans"
      },
      color: `${textColor}`,
      min: -40,
      max: 40,
      interval: 10,
      position: "bottom",

      axisLabel: {
        color: `${labelsColor}`,
        fontSize: 11,
        margin: 15,
        formatter: function (value, index) {
          return Math.abs(value);
        }
      },
      axisTick: {
        show: true,
        length: 6,
        lineStyle: {
          color: `${splitlineColor}`
        },
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: `${splitlineColor}`
        },
      },
    }],
    yAxis: [
      {
        type: 'category',
        name: 'קבוצת גיל',
        nameTextStyle: {
          color: `${textColor}`,
          fontSize: 14,
          fontWeight: "lighter",
          fontFamily: "Open Sans"
        },
        nameLocation: 'middle',
        nameGap: 50,
        axisTick: {
          show: false
        },
        axisLabel: {
          color: `${labelsColor}`,
          fontSize: 11,
          margin: 15,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: `${splitlineColor}`
          },
        },
        data: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+']
      }
    ],
    series: [
      {
        name: 'גברים',
        type: 'bar',
        stack: 'Total',
        barWidth: '50%',
        label: {
          show: true,
          position: 'right',
          formatter: function (value, index) {
            return `${value.value}` + "%";
          },
          color: `${textColor}`
        },
        color: `${menColor}`,
        data: [...axisXrowDataMapMale]
      },
      {
        name: 'נשים',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left',
          formatter: function (value, index) {
            return `${Math.abs(value.value)}` + "%";
          },
          color: `${textColor}`
        },
        color: `${womenColor}`,
        data: [...axisXrowDataFemale]
      }
    ]
  };
  return option;
};
function runBreakdownChart(splittedData) {
  let myNewChart = echarts.init(document.getElementById('breakdown-chart'));
  myNewChart.setOption(getNew_breakdown_chart_option(splittedData.lastMonth, isDarkModeOn));

  window.addEventListener('resize', function () {
    myNewChart.resize();
  });

  add_event_show_and_hide(`breakdown-reset-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  add_event_show_and_hide(`breakdown-submit-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  add_event_show_and_hide(`breakdown-filter-btn`, `breakdown-filter-dropdown`, `breakdown-filter-btn`);
  updateTimePeriod('breakdown-filter-btn-time', currValOfRadioGroup('breakdown_chart-time'));
  updateFilterCategorytext("breakdown-filter-btn-text-currParameter", currValOfRadioGroup("breakdown_chart-category"));

  const breakdown_chartForm = document.getElementById('breakdown-form');

  breakdown_chartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = splittedData[currValOfRadioGroup('breakdown_chart-time')];
    myNewChart.setOption(getNew_breakdown_chart_option(data, isDarkModeOn));
    updateTimePeriod('breakdown-filter-btn-time', currValOfRadioGroup('breakdown_chart-time'));
    updateFilterCategorytext("breakdown-filter-btn-text-currParameter", currValOfRadioGroup("breakdown_chart-category"));
    currPeriod_breakdown_chart = currValOfRadioGroup('breakdown_chart-time');

    const chart_filter = document.getElementById(`breakdown-filter-dropdown`);
    chart_filter.classList.remove("show");
  });
  breakdown_chartForm.addEventListener('reset', (event) => {
    const chart_filter = document.getElementById(`breakdown-filter-dropdown`);
    chart_filter.classList.remove("show");
  });




  let targetNode = document.getElementById('body')

  // watch for a specific class change
  let classWatcherDailyCases = new ClassWatcher(targetNode, 'dark-theme', workOnClassAdd_breakdown, workOnClassRemoval_breakdown)
}

const mockData_breakdown = generateMockData_breakdown();
let currPeriod_breakdown_chart = 'lastMonth';
>>>>>>> origin/main
runBreakdownChart(mockData_breakdown, isDarkModeOn);