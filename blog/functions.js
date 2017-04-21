$(function() {
	var tplElem = document.getElementById('body-template');
	var template = Handlebars.compile(tplElem.innerHTML);

	$.ajax('content.json').done(function(data) {
		var content = null;
		var route = (location.search || '').replace('?', '');
		var articles = [];

		for(var i in data){
			if(route.indexOf(i) == 0)
				content = data[i];
			else
				articles.push({url: i, title: data[i].title});
		}

		content = content || {};
		content.articles = articles;
		$(tplElem).before(template(content));
		
		document.title = (Handlebars.compile(document.title))(content);
	})
});