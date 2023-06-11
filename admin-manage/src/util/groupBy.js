// 分组
function groupBy(list,grouping,val,initial) {
	const groupedBy = {};
	let data = []
	let arrData ={
		name:[],
		value:[]
	}
	for (const item of list) {
		if (groupedBy[item[grouping]]) {
			groupedBy[item[grouping]].push(item);

		} else {

			groupedBy[item[grouping]] = [item];

		}
	}
	for (const groupedByKey in groupedBy) {
		if (Array.isArray(val)){
			// console.log('数组',val,groupedByKey,groupedBy)
			arrData.name.push(val[groupedByKey-initial])
			arrData.value.push(groupedBy[groupedByKey].length)
		}else{
			data.push({value: groupedBy[groupedByKey].length,name:groupedByKey})
		}
	}

	if (Array.isArray(val)){

		return arrData
	}
	return data



}
export default groupBy;