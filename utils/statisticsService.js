// // statisticsService.js
// const waterUsageData = [
//     { date: '2024-10-22', totalLiters: 50 },
//     { date: '2024-10-23', totalLiters: 60 },
//     { date: '2024-10-24', totalLiters: 55 },
//     // Add more data for the month to simulate
//   ];
  
//   export const getDailyWaterUsage = (date) => {
//     const usage = waterUsageData.find((record) => record.date === date);
//     return usage ? usage.totalLiters : 0;
//   };
  
//   export const getMonthlyWaterUsage = (month) => {
//     const currentMonthData = waterUsageData.filter((record) =>
//       record.date.startsWith(month)
//     );
//     return currentMonthData.reduce((total, record) => total + record.totalLiters, 0);
//   };
  