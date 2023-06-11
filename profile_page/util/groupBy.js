// 分组
function groupBy(list) {
	const groupedBy = {};
	for (const item of list) {
		if (groupedBy[item.grouping]) {
			groupedBy[item.grouping].push(item);

		} else {
			groupedBy[item.grouping] = [item];
		}
	}

	// return Object.values(groupedBy)
	// return Object.keys(groupedBy)
	return groupedBy
}
export default groupBy;