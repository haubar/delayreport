/******** ......問題很多 */
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
				$('.wrapper .newspapers.history .np_alllist .pagination.clear-fix li:not(.disabled, .last)').each(function(index, a) {
				 pagelink = $(this).find('a').attr('href');
				// if(!!pagelink > 1)
				{
					console.log(pagelink);
				}
				
				 tolink = $(this).find('a').attr('href');
				 totitle = $(this).find('a').text();
				//   console.log(tolink);
			    //   console.log(totitle);
     		});
			// if(!!pagelink > 1)
			pagecraw.queue({
	  			uri: (newsurl+pagelink)
			})
			 
		}
});



var pagecraw = new Crawler({
	maxConnections : 8,
	jQuery : jsdom,
	forceUTF8 : true,
	callback : function (error, result, $){
		  if(error){
			   console.log(error);
		  }else{

		    var pagelink, pagetitle;
			if($('.wrapper').size() > 0)
			$('.wrapper .newspapers.history .np_alllist .listRight li h2').each(function(index, a) {
			 pagelink = $(this).find('a').attr('href');
			 created = pagelink.replace("www.chinatimes.com/", "").replace("newspapers/", "").replace("/", "").substring(0,8);
			 pagetitle = $(this).find('a').text();
			 console.log('******************')
			 console.log(pagetitle)
			 console.log(pagelink)
			 console.log('******************')
			 var historyData = new news({
			   title: pagetitle,
			   link: newsurl+pagelink,
			   category: cate,
			   type: 'cht',
			   created_at: created,
         	   updated_at: datenow
			 });
			 historyData.save(function (err) {
			   if (err)
			   console.log(pagelink);
			   console.log(pagetitle);
			 });
		
 	        });
		 }
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