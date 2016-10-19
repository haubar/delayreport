// crawler main
require( './db' );
var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsurl = 'http://www.chinatimes.com'
var newsdate = '2010-01-01';
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYYMMDD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		forceUTF8 : true,
		callback : function (error, result, $){
				var tolink, totitle, pagelink;

			    // $('.wrapper .newspapers.history .np_alllist').each(function(index, a) {
				$('.wrapper .newspapers.history .np_alllist .listRight h2').each(function(index, a) {
				 pagelink = $(this).find('.pagination.clear-fix li a').attr('href');
				 tolink = $(this).find('a').attr('href');
				 totitle = $(this).find('a').text();
			 var historyData = new news({
			   title: totitle,
			   link: newsurl+tolink,
			   category: cate,
			   type: 'chinatime',
			   created_at: newsdate,
         	   updated_at: datenow
			 });
			 historyData.save(function (err) {
			//    if (err)
			//    console.log(tolink);
			//    console.log(totitle);
			 });
     	});
		 
		  
			pagecraw.queue({
	  			uri: (pagelink)
			})
		}
});




var pagecraw = new Crawler({
	maxConnections : 10,
	jQuery : jsdom,
	forceUTF8 : true,
	callback : function (error, result, $){
		
			$('.wrapper .newspapers.history .np_alllist .pagination.clear-fix li').each(function(index, a) {
			 var pageinlink = $(this).find('a').attr('href');
			 var pageintitle = $(this).find('a').text();
			 console.log('******************')
			 console.log(pageintitle)
			 console.log(pageinlink)
			 console.log('******************')
			 
 	});
 	}
});


var startd = moment('2003-05-05');
var endd = moment();
var centerday;
for (var m = moment(startd); m.diff(endd, 'days') <= 0; m.add(1, 'days')) {
  console.log(
	 centerday = m.format('YYYYMMDD')
   );
}


var customSearch = function(keyword, mapx){
	return 'http://www.chinatimes.com/history-by-date/' + keyword+'-'+ mapx;
};
var mapx = ['2601',
			'260102',
			'260114',
			'260106',
			'260108',
			'260109',
			'260115',
			'260107',
			'260111',
			'260112',
			'260113',
		   ];
for (var idx = 0; idx < mapx.length; idx++) {
	craw.queue({
	  uri: customSearch(newsdate, mapx[idx])
	});
}


//http://www.chinatimes.com/history-by-date/2009-10-01-260102?page=4