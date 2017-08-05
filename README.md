# Winterlove API Server




## Mongoose  
* This is our ODM of MongoDB
### Make unique options as a key
```javascript
const SimSchema = new Schema({
    msisdn     : { type : String , unique : true, required : true, dropDups: true },
    imsi       : { type : String , unique : true, required : true, dropDups: true },
    status     : { type : Boolean, default: true},
    signal     : { type : Number },
    probe_name : { type:  String , required : true }
});
```

### Make a middleware
#### Before do some query
```javascript
const schema = new Schema({...something})
schema.pre('save', function(next) {
    //this <---  it self don not use arrow function
    next()
})
```
#### After pre things do some query
```javascript
const schema = new Schema({...something})
schema.post('remove', function(doc) {
    window.console.log('%s has been removed', doc._id)
})
```

## TODO
* auth
* io event
* mongoose migrations