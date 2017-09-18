# Winterlove API Server

> Winterlove project

## Api
> [http://localhost:1777/documentation](http://localhost:1777/documentation)

## Event
### Methods
 * on(data)
 * emit(data, [options]) // options = {user, room}
 * connected(client)
 * disconnected(client)
### Members
 * nameSpace
 * server
 * io
 * eventName
 * _nameSpace (override) // setting namespace in a Event class
### To use an event in controllers
```javascript

```

## Controller
### Members
 * server
 * events
### To use it
```javascript
```

## Mongoose  
> This is ODM of MongoDB

### To make unique options as a key
```javascript
const SimSchema = new Schema({
    msisdn     : { type : String , unique : true, required : true, dropDups: true },
    imsi       : { type : String , unique : true, required : true, dropDups: true },
    status     : { type : Boolean, default: true},
    signal     : { type : Number },
    probe_name : { type:  String , required : true }
});
```

### To make a middleware
#### A query Before do some queries
```javascript
const schema = new Schema({...something})
schema.pre('save', function(next) {
    //this <---  it self don not use arrow function
    next()
})
```
#### A query after pre queries
```javascript
const schema = new Schema({...something})
schema.post('remove', function(doc) {
    window.console.log('%s has been removed', doc._id)
})
```

## TODO
* search [api]
* documents [api]
* map [api]
* mongoose migrations
## In progress
* file uploading plugin (50%)
* auth [api] (100%) [need test]
* event (50%)
## Done
* mongoose model
* config
* controller
* router
* auth

