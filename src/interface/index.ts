export interface MetricResponse {
	data: Array<{
		id: string;
		displayName: string;
		isPercentageMetric: boolean;
	}>;
}

export interface SegmentResponse {
	data: Array<{
		segmentKey: string;
		displayName: string;
		values: Array<{ segmentId: string; displayName: string }>;
	}>;
}

export interface Kpi {
	id: number;
	metric?: string;
	segmentKey?: string;
	segmentValue?: string;
	mode?: string;
}
