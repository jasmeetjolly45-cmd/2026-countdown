// ==========================
// AUTOMATIC YEAR PROGRESS LOGIC (2026, 2027, 2028...)
// ==========================
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function updateYearProgress() {
    const now = new Date();
    const year = now.getFullYear();
    
    const startOfYear = new Date(year, 0, 1); // January 1st
    const endOfYear = new Date(year + 1, 0, 1); // January 1st of next year
    
    const totalYearMs = endOfYear - startOfYear;
    const elapsedMs = now - startOfYear;
    
    // Calculate percentage complete
    let percentage = (elapsedMs / totalYearMs) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    // Calculate days completed
    const dayOfYear = Math.floor(elapsedMs / (1000 * 60 * 60 * 24)) + 1;
    const totalDays = isLeapYear(year) ? 366 : 365;

    // Update DOM elements safely
    const yearTitle = document.getElementById("year-title");
    const percentElement = document.getElementById("percent-count");
    const fillElement = document.getElementById("progress-fill");
    const dayElement = document.getElementById("day-of-year");
    const totalElement = document.getElementById("total-days");

    if (yearTitle) yearTitle.textContent = year;
    if (percentElement) percentElement.textContent = percentage.toFixed(0); 
    if (fillElement) fillElement.style.width = percentage + "%";
    if (dayElement) dayElement.textContent = dayOfYear;
    if (totalElement) totalElement.textContent = totalDays;
}

// Run immediately on load and refresh every minute
document.addEventListener("DOMContentLoaded", function() {
    updateYearProgress();
    setInterval(updateYearProgress, 60000); 
});
