var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/delayreport');

var report = mongoose.model('delayreport', {
                    title: String,
                    link: String,
                    type: String,
              });
/*
var historyData = new report({
  title: '',
  link: '',
  type: '',
});
*/
// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
historyData.save(function (err) {
  if (err)
  console.log('meow');
});
