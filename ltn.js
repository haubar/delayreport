// crawler main
require( './db' );
var mongoose = require('mongoose');
var news     = mongoose.model('news');

var Crawler = require('crawler2');
var jsdom = require('jsdom');
var moment = require('moment');

var newsdate = 20050101;
var datenow = moment().format("YYYY-MM-DD");
var datecreate = moment(newsdate).format("YYYY-MM-DD");
var cate = 'none';

var craw = new Crawler({
		maxConnections : 10,
		jQuery : jsdom,
		callback : function (error, result, $){
				$('#main  #newslistul li').each(function(index, a) {
				 var tolink = $(this).find('a').attr('href');
				 var totitle = $(this).find('a').text();
				 var historyData = new news({
				   title: totitle,
				   link: tolink,
					 category: cate,
				   type: 'ltn',
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

var customSearch = function(keyword, cate){
		return 'http://news.ltn.com.tw/newspaper/' + cate + '/' + keyword;
};
var category = ['focus','politics','society','life','opinion','world'];
for (var idx = 0; idx < category.length; idx++) {
	craw.queue({
	  uri: customSearch('20050101', category[idx])
	});
}
