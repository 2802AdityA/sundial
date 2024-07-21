export const getLgSpanClass = (index: number, length: number) => {
	if (length % 3 === 1 && index === length - 1) {
		return "lg:col-span-6";
	}
	if (length % 3 === 2 && index >= length - 2) {
		return "lg:col-span-3";
	}
	return "lg:col-span-2";
};

export const getMdSpanClass = (index: number, length: number) => {
	if (length % 2 === 1 && index === length - 1) {
		return "md:col-span-2";
	}
};

export const getRightButtonLgClass = (index: number, length: number) => {
	if (index + 1 === length || (index + 1) % 3 === 0) {
		return "lg:block";
	}
	return "lg:hidden";
};
export const getRightButtonMdClass = (index: number, length: number) => {
	if (index + 1 === length || (index + 1) % 2 === 0) {
		return "md:block ";
	}
	return "md:hidden";
};
