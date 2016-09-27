// crawler main
require( './db' );
var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsdate = 20030505;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYYMMDD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('.wrapper_box .container_box .block_z1:first a').each(function(index, a) {
				 var tolink = $(this).attr('href');
				 var totitle = $(this).text();
			 var historyData = new news({
			   title: totitle,
			   link: tolink,
			   category: cate,
			   type: 'ettoday',
			   created_at: newsdate,
         	   updated_at: datenow
			 });
			 historyData.save(function (err) {
			   if (err)
			   console.log(tolink);
			   console.log(totitle);
			 });
     	});
		 pagecraw.queue(tolink);
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
 	});
 	}
});

var customSearch = function(keyword){
	return 'http://www.ettoday.net/' + keyword;
};

craw.queue({
  uri: customSearch('sitemap.htm')
});
