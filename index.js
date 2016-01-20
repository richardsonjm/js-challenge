window.ourapp = {
  successRate: 0.7,
  offline: false,
  results: [],
  cache: []
};

function _failure(record) {
  ourapp.results.push({saved: false, record: record, at: Date()});
}

function _success(record) {
  ourapp.results.push({saved: true, record: record, at: Date()});
}

function saveRecord(record) {
  if(ourapp.offline || Math.random() >= ourapp.successRate) {
    _failure(record);
    return false;
  } else {
    _success(record);
    return true;
  }
}

function toggleOffline() {
  ourapp.offline = !ourapp.offline;
  document.getElementById('status').innerText = ourapp.offline ? 'Offline' : 'Online';
  if (ourapp.offline) {
    ourapp.results = [];
  }
}

function queFormValues(idArray) {
  var record = {}
  var arrayLength = idArray.length;
  for (var i = 0; i < arrayLength; i++) {
     var input = 'input-' + idArray[i]
     record[input] = document.getElementById(input).value
  }
  ourapp.cache.push(record);
  processCache();
}

function processCache() {
  if (!ourapp.offline) {
    var cacheLength = ourapp.cache.length;
    for (var i = 0; i < cacheLength; i++) {
      if (!saveAndDeleteFromCache(ourapp.cache[0])) {
        window.setTimeout(saveAndDeleteFromCache(ourapp.cache[0]), 5000);
      }
    }
  }
  displayResults();
}

function saveAndDeleteFromCache(record) {
  if (saveRecord(record)) {
    ourapp.cache.shift();
    return true;
  } else {
    return false;
  }
}

function displayResults () {
  var resultsLength = ourapp.results.length;
  for (var i = 0; i < resultsLength; i++) {
    var div = document.createElement("div");
    var t = document.createTextNode(JSON.stringify(ourapp.results[i]));
    div.appendChild(t);
    document.body.appendChild(div);
  }
}
