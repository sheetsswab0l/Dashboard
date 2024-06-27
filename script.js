document.addEventListener('DOMContentLoaded', function() {
    // Set up gauges
    var staffingGauge = new Gauge(document.getElementById("staffingGauge")).setOptions({
        max: 100,
        value: 85,
        label: "Sworn Staffing"
    });
    staffingGauge.animationSpeed = 32;
    staffingGauge.set(85);

    var budgetGauge = new Gauge(document.getElementById("budgetGauge")).setOptions({
        max: 100,
        value: 60,
        label: "Budget Utilization"
    });
    budgetGauge.animationSpeed = 32;
    budgetGauge.set(60);

    var clearanceGauge = new Gauge(document.getElementById("clearanceGauge")).setOptions({
        max: 100,
        value: 70,
        label: "Case Clearance Rate"
    });
    clearanceGauge.animationSpeed = 32;
    clearanceGauge.set(70);

    // Update task counters
    updateTaskCounters();
});

function updateTaskCounters() {
    const divisions = ['admin', 'invest', 'ops', 'services'];
    divisions.forEach(div => {
        const completed = localStorage.getItem(`${div}Completed`) || 0;
        const total = localStorage.getItem(`${div}Total`) || 10;
        document.getElementById(`${div}Tasks`).textContent = `${completed}/${total}`;
    });
}

function makeEditable(element) {
    element.contentEditable = true;
    element.classList.add('editable');
    element.addEventListener('blur', function() {
        localStorage.setItem(element.id, element.innerHTML);
    });
}

function loadContent() {
    const editableElements = document.querySelectorAll('.editable-content');
    editableElements.forEach(element => {
        const savedContent = localStorage.getItem(element.id);
        if (savedContent) {
            element.innerHTML = savedContent;
        }
        makeEditable(element);
    });
}

function updateTaskStatus(checkbox) {
    const division = checkbox.closest('.division-tasks').id.replace('Tasks', '');
    const completed = document.querySelectorAll(`#${division}Tasks input:checked`).length;
    const total = document.querySelectorAll(`#${division}Tasks input[type="checkbox"]`).length;
    localStorage.setItem(`${division}Completed`, completed);
    localStorage.setItem(`${division}Total`, total);
    updateTaskCounters();
}