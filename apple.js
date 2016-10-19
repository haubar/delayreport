// crawler main
require( './db' );

var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsurl = 'http://www.appledaily.com.tw'
var startd = moment('2003-05-05');
var endd = moment();
var newsdate = startd;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYY-MM-DD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		forceUTF8 : true,
		callback : function (error, result, $){
				var tolink,title; 
				$('#article .soil #coverstory .nclns li').each(function(index, a) {
				 tolink = $(this).find('a').attr('href');
				 totitle = $(this).find('a').text();
					 var historyData = new news({
					   title: totitle,
					   link: newsurl+tolink,
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

var centerday;
for (var m = moment(startd); m.diff(endd, 'days') <= 0; m.add(1, 'days')) {
  console.log(
	 centerday = m.format('YYYYMMDD')
   );
  craw.queue({
  	uri: customSearch(centerday)
  });
}

;
