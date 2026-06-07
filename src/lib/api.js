import Papa from "papaparse";

export const api = {
  // Fetches and parses the CSV curriculum file
  async publicStats() {
    try {
      // process.env.PUBLIC_URL ensures the path is correct for GitHub Pages
      const response = await fetch(`${process.env.PUBLIC_URL}/simuscribe-curriculum.csv`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { 
        header: true, 
        dynamicTyping: true, 
        skipEmptyLines: true 
      });

      return this.transformToStats(parsed.data);
    } catch (error) {
      console.error("Failed to fetch or parse curriculum CSV:", error);
      return null;
    }
  },

  // Transforms raw CSV rows into the format expected by the UI
  transformToStats(data) {
    const total_target = 600;
    const total_current = data.length;
    
    return {
      total_target,
      total_current,
      completion_pct: (total_current / total_target) * 100,
      by_discipline: this.aggregateBy(data, 'discipline'),
      by_tier: this.aggregateBy(data, 'tier')
    };
  },

  // Helper to group data by column name
  aggregateBy(data, key) {
    return data.reduce((acc, row) => {
      const val = row[key];
      if (!acc[val]) acc[val] = { current: 0, target: 0 };
      acc[val].current += 1;
      return acc;
    }, {});
  }
};

export const auth = {
  // Simple check for session token
  isLoggedIn: () => !!localStorage.getItem("token"),
  
  // Handles login flow
  login: async (password) => {
    // Replace with your actual password validation logic
    return new Promise((resolve, reject) => {
      if (password === "admin") {
        localStorage.setItem("token", "true");
        resolve({ success: true });
      } else {
        reject({ response: { data: { detail: "Incorrect password" } } });
      }
    });
  },

  // Clears session
  logout: () => {
    localStorage.removeItem("token");
  }
};
