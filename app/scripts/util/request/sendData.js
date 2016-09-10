import $ from 'jquery';

const sendData = (e, form) => {
	e.preventDefault();
	const type = form.attr('method');
	const url = form.attr('action');
	const data = form.serialize();
	return $.when($.ajax( {type, url, data} ));
};

export default sendData;
