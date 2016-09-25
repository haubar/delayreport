// crawler main
require( './db' );

var mongoose = require('mongoose');
var report     = mongoose.model('report');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsdate = 20030505;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYY-MM-DD");

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
						 created_at: datecreate,
             updated_at: datenow
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
