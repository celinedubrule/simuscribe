const DISCIPLINE_LIST = [
    "Emergency Medicine & Urgent Care",
    "Internal Medicine / Family Practice",
    "Pediatrics",
    "Obstetrics & Gynecology",
    "Surgery & Orthopedics"
];

function loadDashboard() {
    const view = document.getElementById('app-view');
    view.innerHTML = `
        <button onclick="location.reload()" class="btn btn-secondary">← Back to Overview</button>
        <div class="card">
            <h2>Case Library</h2>
            <select id="filterSelect" onchange="filterTable()" class="btn btn-secondary" style="margin-bottom:20px; width:100%; cursor:pointer; background:#1e293b; color:white;">
                <option value="All">All Disciplines (Show All)</option>
                ${DISCIPLINE_LIST.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
            
            <table id="caseTable">
                <thead><tr><th>Code</th><th>Discipline</th><th>Chief Complaint</th></tr></thead>
                <tbody id="tableBody">
                    ${renderRows(curriculumData)}
                </tbody>
            </table>
        </div>
    `;
}

function renderRows(data) {
    if (data.length === 0) return '<tr><td colspan="3">No cases found.</td></tr>';
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
    // If "All" is selected, pass the entire curriculumData array
    const filteredData = (filter === 'All') 
        ? curriculumData 
        : curriculumData.filter(row => row.discipline === filter);
    
    document.getElementById('tableBody').innerHTML = renderRows(filteredData);
}
