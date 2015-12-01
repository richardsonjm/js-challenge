# BuildingBlok JS Programming Challenge

### In order to be considered for a JavaScript position, you must complete the following steps.

## Task

* Fork this repository
* Open `index.html`

You will find a purposefully minimal amount of JS in the page. The problem is to construct an
offline caching object that will attempt to save records, retry failures, or queue objects to be
saved if the app is in an offline state.

To keep the problem simple no backend is necessary. Your object will just call the global
`saveRecord(record)` method and it will return `true` if the object was saved and `false` otherwise.

### Steps

* Add at least 2 forms with various fields to the page to simulate different kinds of records that can be saved.
* Saving the form will queue the form results into your cacher
* If the app is online (based on `ourapp.offline`) the cacher will immediately try to save the record
* Even when online there is a chance `saveRecord` will return `false` to simulate a network failure. When this happens
the cacher should wait at least 5 seconds before trying to save the request again.
* If the app is offline the cacher will simply queue the record.
* When the app's offline state changes from `false` to `true` any saved records should be flushed.
* Write some tests to exercise your cacher using the test runner of your choosing
* Visually format and display the results (see `ourapp.results`)

### Possibilities (bonus points)

* Introduce a framework to manage the forms and better structure your logic
* Allow a configurable `maxRetries` setting so that failed attempts don't continue into eternity
* Auto detect the app has gone offline if `x` amount of records fail to save in a row
* Render the state of your cacher's queues

## Once Complete

Send your results in a pull request. We will review your code and get back to you.
