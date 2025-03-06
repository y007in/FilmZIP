const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const date = `${year}${month}${day}`;
export const formatDate = `${year}.${month}.${day}`;
export const randomNum = `${date}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
