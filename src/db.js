var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var report = mongoose.model('delayreport', {
                    title: String,
                    link: String,
                    type: String,
                    created_at: Date,
                    updated_at: Date

              });
mongoose.model( 'delayreport', report );
mongoose.connect('mongodb://localhost/delayreport');
