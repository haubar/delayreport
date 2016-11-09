require('dotenv').config()
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var news = mongoose.model('news', {
                    title: String,
                    link: String,
                    category: String,
                    type: String,
                    created_at: String,
                    updated_at: Date
              });
mongoose.model( 'news', news );
mongoose.connect( process.env.DB_HOST );
