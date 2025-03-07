export const categories = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Rent & Bills",
  "Travel",
  "Education",
  "Investments",
  "Other",
];


export const incomeCategories = [
    "Salary",
    "Business",
    "Freelancing",
    "Overtime Pay",
    "Bonuses and Incentives",
    "Stock Dividends",
    "Rental Income (from property)",
    "Cryptocurrency Gains",
    "Child Support/Alimony",
    "Scholarships/Grants",
    "Royalties",
    "Lottery or Gambling Winnings",
    "Gifts or Donations Received",
    "Income from Side Hustles",
  ];

export const getCategoryColors = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      "Food & Dining": "#fd3c4a",
      Shopping: "#fcac12",
      Transportation: "#6c757d",
      Entertainment: "#ff9800",
      Healthcare: "#2196f3",
      "Rent & Bills": "#007bff",
      Travel: "#4caf50",
      Education: "#673ab7",
      Investments: "#388e3c",
      Salary: "#28a745",
      Business: "#007bff",
      Freelancing: "#6c757d",
      "Overtime Pay": "#9c27b0",
      "Bonuses and Incentives": "#ff9800",
      "Stock Dividends": "#4caf50",
      "Rental Income (from property)": "#0097a7",
      "Cryptocurrency Gains": "#ff5722",
      "Child Support/Alimony": "#ff9800",
      "Scholarships/Grants": "#1565c0",
      Royalties: "#673ab7",
      "Lottery or Gambling Winnings": "#dc3545",
      "Gifts or Donations Received": "#28a745",
      "Income from Side Hustles": "#e91e63",
      Other: "#6c757d",
    };
    return categoryColors[category] || "#6c757d";
  };