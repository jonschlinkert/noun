var Noun = require('./');
var noun = new Noun();

noun
  .use(function() {
    var pkg = this.get('one');
    console.log(pkg)
    this.context.one = this.context.foo;
  })
  .use(function() {
    this.context.bbb = this.context.bar;
  })
  .use(baz({what: 'whhhhhaaaa?'}))

function baz(options) {
  return function () {
    this.set('one', 'two');
    this.context.ccc = this.context.baz;
  }
}
// console.log(noun);