# COVID Dashboard Replica
> A faithful replica of a government-grade public-health dashboard built with vanilla JavaScript, ECharts, and modular SCSS.

## 🎯 Overview
- **The Challenge:** The challenge was to replicate a government-grade public-health dashboard — dense charts, sortable tables, dark/light themes, and mobile layouts — using front-end fundamentals only.
- **The Solution:** Built in vanilla JavaScript with ECharts and modular SCSS: dual-axis interactive charts, tri-state sortable tables with custom filters, scroll-synced navigation via IntersectionObserver, and a theme system that re-initializes charts on dark-mode toggle.
- **The Result:** The result is a faithful, responsive dashboard replica with polished data visualization and UX — proving strong UI craft without a SPA framework.

## 💻 Tech Stack
- JavaScript
- HTML5
- CSS3
- ECharts
- SCSS
- Data Visualization
- Responsive UI

## 🚀 How to Run Locally
```bash
npm install
npx sass styles/scss:styles/css
npx serve .
```
Open the URL shown in the terminal (typically [http://localhost:3000](http://localhost:3000)) and navigate to `index.html`.

Alternatively, open `index.html` directly in a browser or via a Live Server extension after compiling SCSS.

Optional — watch SCSS for changes during development:
```bash
npm run sass
```

## Project Structure

- **`index.html`** — main dashboard entry point (ECharts loaded via CDN)
- **`corona.Js`** — app shell: dark mode, navigation, overview KPI cards
- **`charts_*.js` / `chart_breakdown.js`** — ECharts visualizations
- **`table_*.js`** — sortable, filterable data tables
- **`styles/scss/`** — modular SCSS partials compiled to `styles/css/`

Prototype pages: `example.html`, `tablesExample.html`.

## Screenshots

![desktop_homepage](./screenshots/desktop_home_page.png)
![mobile_homepage](./screenshots/mobile_homepage.png)
![table](./screenshots/sorted_table.png)
![charts](./screenshots/charts.png)
![charts_darkmode](./screenshots/charts_darkmode.png)
