export const generateChartOptions = (data: Array<Array<string | number>>) => {
	return {
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
				data: data,
				type: "areaspline",
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
};
