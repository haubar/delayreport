// crawler main
var Crawler = require('crawler2');
var jsdom = require('jsdom');

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('.wrapper_box .container_box .block_z1:first a').each(function(index, a) {
				 var tolink = $(this).attr('href');
				 var totitle = $(this).text();
  			 console.log(tolink); console.log('\n');
			 console.log(totitle);
  			 console.log('==================================');
			 console.log('\n');
			 pagecraw.queue(tolink);
     	});
		}
});

var pagecraw = new Crawler({
	maxConnections : 10,
	jQuery : jsdom,
	callback : function (error, result, $){
		if(!!$('#all-news-list'))
			$('#all-news-list h3').each(function(index, a) {
			 var tolink = $(this).find('a').attr('href');
			 var totitle = $(this).text();
		 console.log(tolink);
		 console.log(totitle);
		 console.log('==================================');
		 console.log('\n');
	//
 	});
 	}
});

var customSearch = function(keyword){
	return 'http://www.ettoday.net/' + keyword;
};

craw.queue({
  uri: customSearch('sitemap.htm')
});
