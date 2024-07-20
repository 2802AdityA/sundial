export const data = {
	data: {
		metric: "daily-active-users",
		segmentKey: "platform",
		segmentId: "ios",
		values: [
			{
				date: "2024-07-19",
				value: 71318,
			},
			{
				date: "2024-07-18",
				value: 19948,
			},
			{
				date: "2024-07-17",
				value: 66024,
			},
			{
				date: "2024-07-16",
				value: 20500,
			},
			{
				date: "2024-07-15",
				value: 73880,
			},
			{
				date: "2024-07-14",
				value: 82329,
			},
			{
				date: "2024-07-13",
				value: 26316,
			},
			{
				date: "2024-07-12",
				value: 62304,
			},
			{
				date: "2024-07-11",
				value: 85117,
			},
			{
				date: "2024-07-10",
				value: 43820,
			},
			{
				date: "2024-07-09",
				value: 54153,
			},
			{
				date: "2024-07-08",
				value: 19290,
			},
			{
				date: "2024-07-07",
				value: 81626,
			},
			{
				date: "2024-07-06",
				value: 92743,
			},
			{
				date: "2024-07-05",
				value: 54790,
			},
			{
				date: "2024-07-04",
				value: 82010,
			},
			{
				date: "2024-07-03",
				value: 59875,
			},
			{
				date: "2024-07-02",
				value: 22166,
			},
			{
				date: "2024-07-01",
				value: 38479,
			},
			{
				date: "2024-06-30",
				value: 38340,
			},
			{
				date: "2024-06-29",
				value: 81697,
			},
			{
				date: "2024-06-28",
				value: 37366,
			},
			{
				date: "2024-06-27",
				value: 89044,
			},
			{
				date: "2024-06-26",
				value: 96680,
			},
			{
				date: "2024-06-25",
				value: 26261,
			},
			{
				date: "2024-06-24",
				value: 46172,
			},
			{
				date: "2024-06-23",
				value: 92720,
			},
			{
				date: "2024-06-22",
				value: 43840,
			},
		],
	},
};

export const arr = [
	data["data"]["values"].map((val) => {
		return val["value"];
	}),
];

export const options: Highcharts.Options = {
	colors: [
		{
			linearGradient: { x1: 0, x2: 1, y1: 1, y2: 1 },
			stops: [
				[0, "#EDF8F7"],
				[1, "#33ADA6"],
			],
		},
	],
	xAxis: {
		visible: false,
	},
	yAxis: {
		visible: false,
	},
	title: {
		text: "",
	},
	credits: {
		enabled: false,
	},
	legend: {
		enabled: false,
	},
	series: [
		{
			type: "areaspline",
			data: arr[0],
			fillColor: {
				linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
				stops: [
					[0, "#97DBD6"],
					[1, "#ffffff"],
				],
			},
			marker: {
				enabled: false,
				states: {
					hover: {
						enabled: false,
					},
				},
			},
		},
	],
	tooltip: {
		enabled: false,
	},
};
