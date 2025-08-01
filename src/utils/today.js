const todayDate = new Date(); //Fri Aug 01 2025 17:00:05 GMT+0900 (한국 표준시)

export const getTodayString = () => {
  return todayDate.toISOString().split('T')[0];
}; //2025-08-01
