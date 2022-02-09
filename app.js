console.log("Hello! 😊");

// TODO
// 1. Create URL variable for storing the dashboard
// 2. Grab the container from the HTML
// 3. Set some dashboard options (width, height, etc)

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-GB&:display_count=n&:origin=viz_share_link";
const vizContainer = document.getElementById("vizContainer");
const vizOptions = {
  device: "desktop",
  Region: ["North", "South"],
};
let viz;
// 1. Grab button from HTML
const pdfbutton = document.getElementById("exportPDF");
const pptbutton = document.getElementById("exportPPT");

function initViz() {
  console.log("Hello from initViz!");
  viz = new tableau.Viz(vizContainer, url, vizOptions);
}

// 2. Create a function to generate PDF
function exportPDF() {
  console.log("Generating a PDF...", viz);
  viz.showExportPDFDialog();
}

// 3. Create a function to generate PPT
function exportPPT() {
  console.log("Generating a PPT...", viz);
  viz.showExportPowerPointDialog();
}

// wait until content has loaded and execute initViz
document.addEventListener("DOMContentLoaded", initViz);
pdfbutton.addEventListener("click", exportPDF);
pptbutton.addEventListener("click", exportPPT);

// one-line event listener
document.getElementById("download").addEventListener("click", function () {
  viz.showDownloadDialog();
});

// Function to grab filter values and filter the viz

function getRangeValues() {
  // 1. Get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // get the workbook
  const workbook = viz.getWorkbook();
  //  get active sheet - dashboard
  const activeSheet = workbook.getActiveSheet();
  // get all sheets in active sheet
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  console.log(sheetToFilter);
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter applied"));
}

// Filter the dashboard for sales
document.getElementById("filterBtn").addEventListener("click", getRangeValues);
