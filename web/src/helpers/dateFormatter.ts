export function formatDate(date: Date) {
  const _date = new Date(date);
  const milisecondsSinceDate = Date.now() - _date.getTime();
  const dateGreaterThanOneDay = milisecondsSinceDate >= 86400000;
  const dateGreaterThanOneHour = milisecondsSinceDate >= 3600000;

  if (dateGreaterThanOneDay)
    return _date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  if (dateGreaterThanOneHour) {
    const hours = Math.floor(milisecondsSinceDate / 3600000);
    return `${hours} hour${hours != 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(milisecondsSinceDate / 60000);
  return minutes >= 1 ? `${minutes} minute${minutes != 1 ? 's' : ''} ago` : 'Now';
}
