export function isTokenExpiring({
	eagerRefreshThresholdMillis = 1000,
	expiry_date
}: {
	eagerRefreshThresholdMillis?: number;
	expiry_date: number;
}) {
	const now = new Date().getTime();
	return expiry_date ? now >= expiry_date - eagerRefreshThresholdMillis : false;
}
