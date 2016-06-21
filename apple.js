// crawler main
var Crawler = require('crawler2');
var jsdom = require('jsdom');
var dbsave = require('mongo.js');
var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#article #coverstory li').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
  	// 		 console.log(tolink);
			//  console.log(totitle);
  	// 		 console.log('==================================');
			//  console.log('\n');
			//craw.queue(toQueueUrl);
			var historyData = new report({
			  title: totitle,
			  link: tolink,
			  type: 'apple',
			});
     });
		}
});

var customSearch = function(keyword){
	return 'http://www.appledaily.com.tw/appledaily/archive/' + keyword;
};

craw.queue({
  uri: customSearch('20030505')
});
