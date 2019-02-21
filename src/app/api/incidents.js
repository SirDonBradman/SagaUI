import axiosInstance from '../axios/axios';

export default function getIncidentsData(product, severity, reportedBy, fromDate, toDate, environment) {
	// if (severity === undefined)
	// 	severity = 'S[1-2]';
	// if (reportedBy === undefined)
	// 	reportedBy = 'Client Internal';
	// if (fromDate === undefined)
	// 	fromDate='';
	// if (toDate === undefined)
	// 	toDate='';
	// if (environment === undefined)
	// 	environment = 'Production';
	if (product === undefined)
		product = '24/7 Chat';
	
	let config = {
		params:{
			product,
			severity,
			reportedBy,
			fromDate,
			toDate,
			environment
		}
	};
	return axiosInstance.get('/incidents', config);
}

export function getIncidentsHeatMapData(product, severity, reportedBy, fromDate, toDate, environment){
	let config = {
		params:{
			product,
			severity,
			reportedBy,
			fromDate,
			toDate,
			environment
		}
	};
	return axiosInstance.get('/incidents/heatmap', config);
}

export function dae_getIncidentsData(product, trend){
	let data = {
			product:'abc',
			trend:'monthly',
			data:[
				{
					label:'Jan',
					created:60,
					resolved:40
				},
				{
					label:'Feb',
					created:30,
					resolved:20
				},
				{
					label:'Mar',
					created:40,
					resolved:35
				},
				{
					label:'Apr',
					created:60,
					resolved:58
				},
				{
					label:'May',
					created:80,
					resolved:50
				},
				{
					label:'June',
					created:50,
					resolved:10
				}
			]
		};

	return new Promise(function(resolve){
		setTimeout(() => resolve(data), 3000);
	});
}