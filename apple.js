// crawler main
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var report = mongoose.model('delayreport', {
                    title: String,
                    link: String,
                    type: String,
                    updated_at: Date
              });
mongoose.model( 'delayreport', report );
mongoose.connect('mongodb://localhost/delayreport');


var Crawler = require('crawler2');
var jsdom = require('jsdom');
var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#article #coverstory li').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
					 var historyData = new report({
					   title: totitle,
					   link: tolink,
					   type: 'apple',
					 });
					 historyData.save(function (err) {
					   if (err)
					   console.log(tolink);
			  		   console.log(totitle);
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
