export const DATA_MAP = {
  CATEGORIES: require("../data/categories.json"),
  SUPPLIERS: require("../data/suppliers.json"),
  PRODUCTS: require("../data/products.json"),
};

export const DATA_MAP_KEYS = Object.keys(DATA_MAP);

export const PREDEFINED_QUERIES = [
  {
    name: "All Categories",
    query: "SELECT * FROM Categories",
  },
  {
    name: "All Suppliers",
    query: "SELECT * FROM Suppliers",
  },
  {
    name: "All Products",
    query: "SELECT * FROM Products",
  },
];

export const getColumnItemsByTableName = (tableName) => {
  const table = DATA_MAP[tableName];
  const firstRowItem = table ? table[0] : {};
  return Object.keys(firstRowItem).map((key) => ({
    key,
    type: typeof firstRowItem[key],
  }));
};

export const getRowValueByType = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return Object.values(value).join(", ");
  if (typeof value === "boolean") {
    if (value) return "Yes";
    return "No";
  }
  return value;
};

export const toSentenceCase = (camelCase) => {
  if (camelCase) {
    const result = camelCase.replace(/([A-Z])/g, " $1");
    return result[0].toUpperCase() + result.substring(1).toLowerCase();
  }
  return "";
};
