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

export interface RequestBody {
	metric: string;
	segmentKey: string;
	segmentId: string;
}

export interface Response {
	data: {
		metric: string;
		segmentKey: string;
		segmentId: string;
		values: Array<{
			date: string;
			value: number;
		}>;
	};
}
