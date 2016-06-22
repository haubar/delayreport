var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var report = mongoose.model('delayreport', {
                    title: String,
                    link: String,
                    type: String,
                    updated_at: Date
              });
mongoose.model( 'delayreport', report );
mongoose.connect('mongodb://localhost/delayreport');
