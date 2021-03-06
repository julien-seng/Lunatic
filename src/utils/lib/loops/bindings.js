export const buildBindingsForDeeperComponents = (index) => (bindings) =>
	bindings
		? Object.entries(bindings).reduce((_, [name, value]) => {
				if (Array.isArray(value)) return { ..._, [name]: value[index] || null };
				return { ..._, [name]: value };
		  }, {})
		: {};

const getDefaultDatasetStructure = (name, value) => ({
	[name]: { dataStructure: {}, dataPoints: { [name]: value } },
});

export const buildVectorialBindings = (bindings) =>
	bindings
		? Object.entries(bindings).reduce((_, [name, value]) => {
				if (Array.isArray(value))
					return {
						..._,
						...getDefaultDatasetStructure(name, value),
					};
				return { ..._, [name]: value };
		  }, {})
		: {};

export const displayLoop = (dependencyList) => (bindings) => {
	if (!Array.isArray(dependencyList) || !bindings) return false;
	return !(
		dependencyList
			.map((iv) =>
				Array.isArray(bindings[iv][0])
					? bindings[iv][0].flat()[0]
					: bindings[iv][0]
			)
			.filter((v) => v).length === 0
	);
};

export const displayLoopQuestion = (dependencyList) => (bindings) => {
	if (!Array.isArray(dependencyList) || !bindings) return false;
	return !(
		dependencyList
			.map((iv) =>
				Array.isArray(bindings[iv]) ? bindings[iv].flat()[0] : bindings[iv]
			)
			.filter((v) => v).length === 0
	);
};
