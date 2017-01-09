// crawler main
require( './db' );
var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsurl = 'http://www.chinatimes.com'
var startd = moment(process.argv[2]);
var endd = moment(process.argv[3]); //moment();
var newsdate = startd;
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
				$('.wrapper .newspapers.history .np_alllist .listRight').each(function(index, a) {
				 pagelink = $('.pagination.clear-fix li').find('a').attr('href');
				console.log(pagelink);
				 tolink = $(this).find('li h2').find('a').attr('href');
				 totitle = $(this).find('li h2').find('a').text();
				//   console.log(tolink);
			    //   console.log(totitle);
			 var historyData = new news({
			   title: totitle,
			   link: newsurl+tolink,
			   category: cate,
			   type: 'cht',
			   created_at: newsdate,
         	   updated_at: datenow
			 });
			//  historyData.save(function (err) {
			//    if (err)
			//    console.log(tolink);
			//    console.log(totitle);
			//  });
     	});
		 
		  
			pagecraw.queue({
	  			uri: (pagelink)
			})
		}
});



var pagecraw = new Crawler({
	maxConnections : 8,
	jQuery : jsdom,
	forceUTF8 : true,
	callback : function (error, result, $){
		    var pagelink, pagetitle;
			if(!!$('.wrapper .newspapers.history .np_alllist .listRight'))
			$('.wrapper .newspapers.history .np_alllist .listRight').each(function(index, a) {
			 pageinlink = $(this).find('li h2').find('a').attr('href');
			 pageintitle = $(this).find('li h2').find('a').text();
			 console.log('******************')
			 console.log(pageintitle)
			 console.log(pageinlink)
			 console.log('******************')
			 
 	        });
 	}
});

var customSearch = function(keyword, mapx){
	return 'http://www.chinatimes.com/history-by-date/' + keyword+'-'+ mapx;
};

// var startd = moment('2003-05-05');
// var endd = moment();
var centerday;
for (var m = moment(startd); m.diff(endd, 'days') <= 0; m.add(1, 'days')) {
  console.log(
	 centerday = m.format('YYYY-MM-DD')
   );
var mapx = ['2601',
			'260102',
			'260106',
			'260108',
			'260109',
			'260115',
			'260107',
			'260111',
			'2602',
			'2603',
			'2604',
		   ];   
	for (var idx = 0; idx < mapx.length; idx++) {
		craw.queue({
		uri: customSearch(centerday, mapx[idx])
		});
	}

}






//http://www.chinatimes.com/history-by-date/2009-10-01-260102?page=4