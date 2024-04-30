/**
 * Parse time string
 * @param time - Time string in format 'Hh:mm AM/PM'
 * @returns Object with hours and minutes
 * @example
 * parseTime('12:00 PM') // { hours: 12, minutes: 0 }
 * parseTime('12:30 AM') // { hours: 0, minutes: 30 }
 */
export function parseTime(time: string) {
	const modifier = time.slice(-2);
	const [hours, minutes] = time.slice(0, -2).split('.');
	return {
		hours: parseInt(hours, 10) + (modifier === 'PM' ? 12 : 0),
		minutes: parseInt(minutes, 10)
	};
}

/**
 * Parse date string
 * @param date - Date string in format '17/04/2024'
 * @returns Object with year, month and day
 * @example
 * parseDate('17/04/2024') // { year: 2024, month: 4, date: 17 }
 */
export function parseDate(dateString: string) {
	const [date, month, year] = dateString.split('/').map((d) => parseInt(d, 10));
	return { year, month, date };
}

/**
 * Generate date object
 * @param dateString - Date string in format '17/04/2024'
 * @param time - Time string in format '12:00 PM'
 * @returns Date object
 * @example
 * generateDate('17/04/2024', '12:00 PM') // Date object
 */
export function generateDate(dateString: string, time: string) {
	const { year, month, date } = parseDate(dateString);
	const { hours, minutes } = parseTime(time);
	return new Date(year, month - 1, date, hours, minutes);
}

/**
 * Generate google calendar event link
 */
export function googleCalendar({
	title,
	description,
	location,
	start,
	end
}: {
	title: string;
	description: string;
	location: string;
	start: Date;
	end: Date;
}) {
	// convert Date to this format YYYYMMDDTHHmmSSZ
	const dates = {
		start: start.toISOString().replace(/-|:|\.\d+/g, ''),
		end: end.toISOString().replace(/-|:|\.\d+/g, '')
	};

	const details = [
		'&action=TEMPLATE',
		`&text=${encodeURIComponent(title)}`,
		`&details=${encodeURIComponent(description)}`,
		`&location=${encodeURIComponent(location)}`,
		`&dates=${dates.start}/${dates.end}`
	];

	return `https://calendar.google.com/calendar/render?${details.join('')}`;
}

/**
 * Generate outlook calendar event link
 * @param title - Event title
 * @param description - Event description
 * @param location - Event location
 * @param start - Event start date
 * @param end - Event end date
 */
export function outlookCalendar({
	title,
	description,
	location,
	start,
	end
}: {
	title: string;
	description: string;
	location: string;
	start: Date;
	end: Date;
}) {
	const details = [
		`path=/calendar/action/compose`,
		`rru=addevent`,
		`startdt=${start.toISOString()}`,
		`enddt=${end.toISOString()}`,
		`subject=${encodeURIComponent(title)}`,
		`body=${encodeURIComponent(description)}`,
		`location=${encodeURIComponent(location)}`
	];
	return `https://outlook.live.com/calendar/deeplink/compose?${details.join('&')}`;
}

// 01:00 AM,
// 01:15 AM,
// 01:30 AM,
// 01:45 AM,
// 02:00 AM,
// 02:15 AM,
// 02:30 AM,
// 02:45 AM,
// 03:00 AM,
// 03:15 AM,
// 03:30 AM,
// 03:45 AM,
// 04:00 AM,
// 04:15 AM,
// 04:30 AM,
// 04:45 AM,
// 05:00 AM,
// 05:15 AM,
// 05:30 AM,
// 05:45 AM,
// 06:00 AM,
// 06:15 AM,
// 06:30 AM,
// 06:45 AM,
// 07:00 AM,
// 07:15 AM,
// 07:30 AM,
// 07:45 AM,
// 08:00 AM,
// 08:15 AM,
// 08:30 AM,
// 08:45 AM,
// 09:00 AM,
// 09:15 AM,
// 09:30 AM,
// 09:45 AM,
// 10:00 AM,
// 10:15 AM,
// 10:30 AM,
// 10:45 AM,
// 11:00 AM,
// 11:15 AM,
// 11:30 AM,
// 11:45 AM,
// 12:00 PM,
// 12:15 PM,
// 12:30 PM,
// 12:45 PM,
// 01:00 PM,
// 01:15 PM,
// 01:30 PM,
// 01:45 PM,
// 02:00 PM,
// 02:15 PM,
// 02:30 PM,
// 02:45 PM,
// 03:00 PM,
// 03:15 PM,
// 03:30 PM,
// 03:45 PM,
// 04:00 PM,
// 04:15 PM,
// 04:30 PM,
// 04:45 PM,
// 05:00 PM,
// 05:15 PM,
// 05:30 PM,
// 05:45 PM,
// 06:00 PM,
// 06:15 PM,
// 06:30 PM,
// 06:45 PM,
// 07:00 PM,
// 07:15 PM,
// 07:30 PM,
// 07:45 PM,
// 08:00 PM,
// 08:15 PM,
// 08:30 PM,
// 08:45 PM,
// 09:00 PM,
// 09:15 PM,
// 09:30 PM,
// 09:45 PM,
// 10:00 PM,
// 10:15 PM,
// 10:30 PM,
// 10:45 PM,
// 11:00 PM,
// 11:15 PM,
// 11:30 PM,
// 11:45 PM,
// 12:00 AM,
// 12:15 AM,
// 12:30 AM,
// 12:45 AM,
