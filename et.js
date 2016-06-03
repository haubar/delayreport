// crawler main
var Crawler = require('crawler2');
var jsdom = require('jsdom');

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('.wrapper_box .container_box .block_z1:first ').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
  			 console.log(tolink); console.log('\n');
			 console.log(totitle);
  			 console.log('==================================');
			 console.log('\n');
			//  craw.queue(tolink);
     });
		}
});

var customSearch = function(keyword){
	return 'http://www.ettoday.net/' + keyword;
};

craw.queue({
  uri: customSearch('sitemap.htm')
});
