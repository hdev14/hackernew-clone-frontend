const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerMonth * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < msPerMinute) {
    return 'less than 1 min ago';
  }

  if (elapsed < msPerHour) {
    const min = Math.round(elapsed / msPerMinute);
    return `${min} min ago`;
  }

  if (elapsed < msPerDay) {
    const hrs = Math.round(elapsed / msPerHour);
    return `${hrs} h ago`;
  }

  if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return `${days} days ago`;
  }

  if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${months} months ago`;
  }

  const years = Math.round(elapsed / msPerYear);
  return `${years} years ago`;
};

export const timeDifferenceForDate = (date) => {
  const current = new Date().getTime();
  const previous = new Date(date).getTime();
  return timeDifference(current, previous);
};
