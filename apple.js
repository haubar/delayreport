// crawler main
require( './db' );

var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsdate = 20030505;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYY-MM-DD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#article #coverstory li').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
					 var historyData = new news({
					   title: totitle,
					   link: tolink,
					   category: cate,
					   type: 'apple',
					   created_at: newsdate,
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
