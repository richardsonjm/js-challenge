describe("toggleOffline", function() {
  beforeEach(function(){
    window.ourapp = {
      successRate: 0.7,
      offline: false,
      results: [],
      cache: []
    };
    spyOn(document, "getElementById").and.returnValue("foo");
  });

  it("app online by default", function() {
    expect(ourapp.offline).toBe(false);
  });


  it("toggle offline", function() {
    toggleOffline();
    expect(ourapp.offline).toBe(true);
  });

  it("clears results when set online", function() {
    ourapp.results.push("bingo")
    expect(ourapp.results).toEqual(["bingo"]);
    toggleOffline();
    expect(ourapp.results).toEqual([]);
  });

});

describe("processCache", function() {
  beforeEach(function(){
    window.ourapp = {
      successRate: 0.7,
      offline: false,
      results: [],
      cache: ['foo', 'bar', 'baz']
    };
  });

  it("removes records from cache with successful save", function() {
    spyOn(window, "saveRecord").and.returnValue("true");
    expect(ourapp.cache).toEqual(['foo', 'bar', 'baz']);
    processCache();
    expect(ourapp.cache).toEqual([]);
  });

  it("does not remove records from cache when offline", function() {
    ourapp.offline = true;
    expect(ourapp.cache).toEqual(['foo', 'bar', 'baz']);
    processCache();
    expect(ourapp.cache).toEqual(['foo', 'bar', 'baz']);
  });
});

describe("queFormValues", function() {
  beforeEach(function(){
    window.ourapp = {
      successRate: 0.7,
      offline: true,
      results: [],
      cache: []
    };
  });

  it("adds records to que", function() {
    var fakeElement = document.createElement("input");
    fakeElement.setAttribute('type', 'text');
    fakeElement.setAttribute('value', 'foo');
    spyOn(document, "getElementById").and.returnValue(fakeElement);
    returnObject = { "input-1": 'foo', "input-2": 'foo', "input-3": 'foo' };
    queFormValues([1, 2, 3]);
    expect(ourapp.cache).toEqual([returnObject]);
  });
});

describe("saveAndDeleteFromCache", function() {
  beforeEach(function(){
    window.ourapp = {
      successRate: 0.7,
      offline: false,
      results: [],
      cache: ["foo"]
    };
  });

  it("removes succesfully saved record from cache", function() {
    spyOn(window, "saveRecord").and.returnValue("true");
    saveAndDeleteFromCache("a record");
    expect(ourapp.cache).toEqual([]);
  });
});
