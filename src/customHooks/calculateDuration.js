import {
  differenceInYears,
  differenceInMonths,
  addYears,
  addMonths,
  differenceInDays,
} from "date-fns";

function calculateDuration(startDate, endDate) {
  const start = new Date(
    Date.UTC(
      new Date(startDate).getFullYear(),
      new Date(startDate).getMonth(),
      new Date(startDate).getDate()
    )
  );
  const end = new Date(
    Date.UTC(
      new Date(endDate).getFullYear(),
      new Date(endDate).getMonth(),
      new Date(endDate).getDate()
    )
  );

  if (start > end) {
    return "invalid";
  }

  let years = differenceInYears(end, start);
  const adjustedStartAfterYears = addYears(start, years);

  let months = differenceInMonths(end, adjustedStartAfterYears);

  const adjustedStartAfterMonths = addMonths(adjustedStartAfterYears, months);

  // const days = differenceInDays(end, adjustedStartAfterMonths);
  const days = differenceInDays(
    end,
    addMonths(adjustedStartAfterYears, months)
  );

  if (adjustedStartAfterMonths > end) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0 && months === 0) {
    return `${days} days`;
  }

  if (years === 0) {
    return `${months} months`;
  }

  if (months > 0) {
    return `${years} years, ${months} months`;
  }

  return `${years} years`;
}

export default calculateDuration;
