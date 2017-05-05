exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
     'mongodb://admin:admin@ds131511.mlab.com:31511/final-capstone-bart-schedule' :
     'mongodb://admin:admin@ds131511.mlab.com:31511/final-capstone-bart-schedule');
exports.PORT = process.env.PORT || 5001;
