let curriculumData = [];

// Initialize data once
Papa.parse('simuscribe-curriculum.csv', {
    download: true, header: true,
    complete: (results) => { curriculumData = results.data; }
});

function loadDashboard() {
    const view = document.getElementById('app-view');
    view.innerHTML = `
        <button onclick="location.reload()" class="btn" style="background:#475569; color:white;">← Back Home</button>
        <div class="card">
            <h2>Case Library</h2>
            <table>
                <thead><tr><th>Code</th><th>Discipline</th><th>Complaint</th></tr></thead>
                <tbody>
                    ${curriculumData.map((row, i) => row.case_code ? `
                        <tr onclick="viewCase(${i})">
                            <td>${row.case_code}</td>
                            <td>${row.discipline}</td>
                            <td style="color:var(--accent);">${row.chief_complaint}</td>
                        </tr>
                    ` : '').join('')}
                </tbody>
            </table>
        </div>
    `;
}

function viewCase(index) {
    const row = curriculumData[index];
    const view = document.getElementById('app-view');
    view.innerHTML = `
        <button onclick="loadDashboard()" class="btn" style="background:#475569; color:white;">← Back to Library</button>
        <div class="card">
            <h1>${row.chief_complaint}</h1>
            <p><strong>Discipline:</strong> ${row.discipline} | <strong>Tier:</strong> ${row.tier}</p>
            <h3>History of Present Illness</h3><p>${row.history_present_illness}</p>
            <h3>Physical Exam</h3><p>${row.physical_exam}</p>
            <h3>Plan</h3><p>${row.soap_plan}</p>
        </div>
    `;
}
