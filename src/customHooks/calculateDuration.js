export default function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return "Invalid";
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth() - 1, 0);
    days += prevMonth.getDate();
  }

  if (years === 0 && months === 0) {
    return `${days} days`;
  }

  if (years === 0) {
    return `${months} months and ${days} days`;
  }

  return `${years} years and ${months} months`;
}
