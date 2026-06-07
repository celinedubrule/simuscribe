import Papa from "papaparse";

export const api = {
  async publicStats() {
    try {
      // Fetches from the public folder
      const response = await fetch(`${process.env.PUBLIC_URL}/simuscribe-curriculum.csv`);
      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { 
        header: true, 
        dynamicTyping: true, 
        skipEmptyLines: true 
      });

      return this.transformToStats(parsed.data);
    } catch (error) {
      console.error("Data fetch error:", error);
      return null;
    }
  },

  transformToStats(data) {
    const total_target = 600;
    const total_current = data.length;
    return {
      total_target,
      total_current,
      completion_pct: (total_current / total_target) * 100,
      by_discipline: {},
      by_tier: {}
    };
  }
};

export const auth = {
  isLoggedIn: () => !!localStorage.getItem("token"),
  login: async (password) => {
    // Replace with your actual auth logic
    if (password === "admin") localStorage.setItem("token", "true");
    else throw new Error("Invalid password");
  }
};
