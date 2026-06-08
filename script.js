Papa.parse('simuscribe-curriculum.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const grid = document.getElementById('dashboard-grid');
        const stats = {};

        results.data.forEach(row => {
            if (!row.discipline) return;
            if (!stats[row.discipline]) stats[row.discipline] = { total: 0, tiers: {} };
            stats[row.discipline].total++;
            stats[row.discipline].tiers[row.tier] = (stats[row.discipline].tiers[row.tier] || 0) + 1;
        });

        grid.innerHTML = Object.keys(stats).map(disc => `
            <div class="card">
                <h3><span>${disc}</span> <span class="count">${stats[disc].total} Cases</span></h3>
                <ul class="tier-list">
                    <li><span>Foundation</span> <span>${stats[disc].tiers['Tier 1 — Foundation'] || 0}</span></li>
                    <li><span>Intermediate</span> <span>${stats[disc].tiers['Tier 2 — Intermediate'] || 0}</span></li>
                    <li><span>Advanced</span> <span>${stats[disc].tiers['Tier 3 — Advanced'] || 0}</span></li>
                </ul>
            </div>
        `).join('');
    }
});
