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
	metric?: {
		id: string;
		name: string;
	};
	segmentKey?: {
		id: string;
		name: string;
	};
	segmentValue?: {
		id: string;
		name: string;
	};
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
