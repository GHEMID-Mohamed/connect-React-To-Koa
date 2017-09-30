var router = require('koa-router')();

router.prefix('/todos');

var todos = []

router.get('/', function *(next) {
  this.body = todos;
});


router.get('/:todo', function *(next) {

  if(this.params.todo!='') todos.push(this.params.todo)
  console.log('params received = '+this.params.todo)
  this.redirect('/');

});

module.exports = router;
