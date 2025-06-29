function formatTimestampToDate(timestamp: number) {
	const date = new Date(timestamp);
	const dateFormatted = date.toLocaleDateString("en-US", {
		dateStyle: "short",
	});
	const timeFormatted = date.toLocaleTimeString("en-US", {
		timeStyle: "short",
	});

	return `${dateFormatted} ${timeFormatted}`;
}

export { formatTimestampToDate };
