// crawler main
require( './db' );
var mongoose = require('mongoose');
var news     = mongoose.model('news');
var fs = require('fs');
var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsurl = 'http://www.ettoday.net/'
var startd = moment(process.argv[2]);
var endd = moment(process.argv[3]); //moment();
var newsdate = startd;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYYMMDD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 8,
		jQuery : jsdom,
		forceUTF8 : true,
	callback : function (error, result, $){
				
				if(error){
					console.log(error);
				}else{
					var tolink, totitle, created;
					if(!!$('#all-news-list h3'))
					$('#all-news-list h3').each(function(index, a) {
						tolink = $(this).find('a').attr('href');
						totitle = $(this).text();
						created = tolink.replace('http://www.ettoday.net/news/', "")
						created = created.replace(/[/]\d+(.htm)/ig, '')
						var historyData = new news({
							title: totitle,
							link: tolink,
							category: cate,
							type: 'ettoday',
							created_at: created,
							updated_at: datenow
						});
						//   console.log(created);
						// console.log(tolink);
						// console.log(totitle);
				
						historyData.save(function (err) {
							
							if (err){
							console.log(tolink);
							console.log(totitle);
							}else{
								console.log('save -ok!')
								console.log(tolink);
								console.log(totitle);
							}
						});
					});
		 			historyData = null;


				}
	}
});

//爬分頁，爬不到，先放著(?)
/*
var pagecraw = new Crawler({
	maxConnections : 8,
	jQuery : jsdom,
	callback : function (error, result, $){
		var pagelink, pagetitle;
		// if(!!$('div.menu_page'))
			// $('#all-news-list h3').each(function(index, a) {
		$('.menu_page').each(function(index, a) {
			console.log($(this).html);
			 var pagelink = $(this).attr('href');
			 var pagetitle = $(this).text();
 	    });
		// console.log($(this).html);
		// console.log(pagelink);
		// console.log(pagetitle); 
 	}

});
*/

var customSearch = function(keyword){
	return 'http://www.ettoday.net/news/news-list-'+ keyword +'-0-'+ num +'.htm';
};


var centerday;
for (var m = moment(startd); m.diff(endd, 'days') <= 0; m.add(1, 'days')) {
	
	 centerday = m.format('YYYY-MM-DD')

	for (var num = 0; num < 30; num++) {
		craw.queue({
			uri: customSearch(centerday, num)
		});
	}

}
customSearch = null
craw = null