// crawler main
var Crawler = require('crawler2');
var jsdom = require('jsdom');

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#main  #newslistul li').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
  			 console.log(tolink);
			 console.log(totitle);
  			 console.log('==================================');
			 console.log('\n');
			//craw.queue(toQueueUrl);
     });
		}
});

var customSearch = function(keyword, cate){
		return 'http://news.ltn.com.tw/newspaper/' + cate + '/' + keyword;
};
var category = ['focus','politics','society','life','opinion','world'];
for (var idx = 0; idx < category.length; idx++) {
	craw.queue({
	  uri: customSearch('20050101', category[idx])
	});
}
