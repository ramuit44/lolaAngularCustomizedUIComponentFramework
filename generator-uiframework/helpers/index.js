var stringHelper = {};

function escapeRegExp (str) {
	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

stringHelper.replaceAll = function (str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

module.exports = stringHelper;
