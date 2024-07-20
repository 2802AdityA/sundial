export const generateChartOptions: (
	data: Array<Array<string | number>>
) => Highcharts.Options = (data: Array<Array<string | number>>) => {
	return {
		chart: {
			className: "min-width:300px",
			width: 250,
			height: "20%",
			type: "areaspline",
			// width: `'36%'`,
		},
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
		// responsive: {
		// 	rules: [
		// 		{
		// 			condition: {
		// 				maxWidth: 50,
		// 				maxHeight: 25,
		// 			},
		// 			// Make the labels less space demanding on mobile
		// 			// chartOptions: {
		// 			// 	xAxis: {
		// 			// 		labels: {
		// 			// 			formatter: function () {
		// 			// 				return this.value.charAt(0);
		// 			// 			}
		// 			// 		}
		// 			// 	},
		// 			// 	yAxis: {
		// 			// 		labels: {
		// 			// 			align: 'left',
		// 			// 			x: 0,
		// 			// 			y: -2
		// 			// 		},
		// 			// 		title: {
		// 			// 			text: ''
		// 			// 		}
		// 			// 	}
		// 			// }
		// 		},
		// 	],
		// },
		series: [
			{
				data: data,
				type: "area",
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
