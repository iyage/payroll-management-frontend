import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (data) => {
  return await api.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchUserById = async (data, token) => {
  return await api.post("/fetchUserById", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchAllEmployee = async (token) => {
  return await api.get("/get_all_users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const enrollEmployee = async (data, token) => {
  return await api.post("/registration", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSalary = async (data, token) => {
  return await api.post("/add_salary", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDeduction = async (data, token) => {
  return await api.post("/create_new_deduction", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const generatepayslip = async (data, token) => {
  return await api.post("/generate_payslips", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
