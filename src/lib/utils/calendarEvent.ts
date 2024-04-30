/**
 * Generate google calendar event link
 */

export function googleCalendar({
	title,
	description,
	location,
	date,
	startTime,
	endTime
}: {
	title: string;
	description: string;
	location: string;
	date: string;
	startTime: string;
	endTime: string;
}) {
	const start = new Date(`${date} ${startTime}`).toISOString();
	const end = new Date(`${date} ${endTime}`).toISOString();

	const details = [
		'&action=TEMPLATE',
		`&text=${encodeURIComponent(title)}`,
		`&details=${encodeURIComponent(description)}`,
		`&location=${encodeURIComponent(location)}`,
		`&dates=${start}/${end}`
	];

	return `https://www.google.com/calendar/render${details.join('')}`;
}
