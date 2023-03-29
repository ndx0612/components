export function FormatDate(timestamp: number, format: 'datetime' | 'date' | 'time', lang: 'cn' | 'en' = 'en'): string {
  const date = new Date(timestamp);

  // 定义日期格式化选项
  const options: Intl.DateTimeFormatOptions = {
    weekday: lang === 'cn' ? 'long' : 'short',
    year: 'numeric',
    month: lang === 'cn' ? 'long' : 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  // 根据传入的格式进行格式化
  if (format === 'datetime') {
    return date.toLocaleString(lang, options);
  } else if (format === 'date') {
    options.hour = undefined;
    options.minute = undefined;
    options.second = undefined;
    return date.toLocaleString(lang, options);
  } else if (format === 'time') {
    options.weekday = undefined;
    options.year = undefined;
    options.month = undefined;
    options.day = undefined;
    return date.toLocaleString(lang, options);
  } else {
    return date.toString();
  }
}
