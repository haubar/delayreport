// crawler main
var Crawler = require('crawler2');
var jsdom = require('jsdom');

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#contentCol #pagelet_search_results_objects #all_search_results').each(function(index, a) {
				 var toQueueUrl = $(this).find('a').attr('href');
  			 console.log(a);
  			 //console.log(toQueueUrl);
				//craw.queue(toQueueUrl);
     });
		}
});

var customSearch = function(keyword){
	return 'https://www.facebook.com/search/pages/?q=' + keyword;
};

craw.queue({
  uri: customSearch('coffee', '咖啡')
});
