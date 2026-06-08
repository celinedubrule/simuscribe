let curriculumData = [];
const DISCIPLINE_LIST = [
    "Emergency Medicine & Urgent Care", "Internal Medicine / Family Practice", 
    "Pediatrics", "Obstetrics & Gynecology", "Surgery & Orthopedics"
];

document.addEventListener('DOMContentLoaded', () => {
    Papa.parse('simuscribe-curriculum.csv', {
        download: true, header: true,
        complete: (results) => { curriculumData = results.data; }
    });
});

function loadDashboard() {
    document.getElementById('app-view').innerHTML = `
        <button onclick="location.reload()" class="btn btn-secondary">← Back to Overview</button>
        <div class="card">
            <h2>Case Library</h2>
            <select id="filterSelect" onchange="filterTable()" class="btn btn-secondary" style="margin-bottom:20px; width:100%; cursor:pointer; background:#1e293b; color:white;">
                <option value="All">All Disciplines (Show All)</option>
                ${DISCIPLINE_LIST.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
            <table id="caseTable">
                <thead><tr><th>Code</th><th>Discipline</th><th>Chief Complaint</th></tr></thead>
                <tbody id="tableBody">${renderRows(curriculumData)}</tbody>
            </table>
        </div>
    `;
}

function renderRows(data) {
    return data.map((row, i) => row.case_code ? `
        <tr onclick="viewCase(${i})">
            <td>${row.case_code}</td>
            <td>${row.discipline}</td>
            <td style="color:var(--accent);">${row.chief_complaint}</td>
        </tr>
    ` : '').join('');
}

function filterTable() {
    const filter = document.getElementById('filterSelect').value;
    const filtered = (filter === 'All') ? curriculumData : curriculumData.filter(r => r.discipline === filter);
    document.getElementById('tableBody').innerHTML = renderRows(filtered);
}

function viewCase(index) {
    const row = curriculumData[index];
    document.getElementById('app-view').innerHTML = `
        <button onclick="loadDashboard()" class="btn btn-secondary">← Back to Library</button>
        <div class="card">
            <h1>${row.chief_complaint}</h1>
            <p><strong>Discipline:</strong> ${row.discipline} | <strong>Tier:</strong> ${row.tier}</p>
            <h3>History of Present Illness</h3><p>${row.history_present_illness}</p>
            <h3>Physical Exam</h3><p>${row.physical_exam}</p>
            <h3>Plan</h3><p>${row.soap_plan}</p>
        </div>
    `;
}
