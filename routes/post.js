var express     	= require('express');
var appRootPath 	= require('app-root-path');

var familias	= appRootPath.require('./logic/post/familias');
var postCadastro	= appRootPath.require('./logic/post/cadastrar');
var postLogin	= appRootPath.require('./logic/post/logar');
var atualizarCadastro	= appRootPath.require('./logic/post/atualizar');
var dataRequisicao	= appRootPath.require('./logic/post/dataRequisicao');
var cadastrarNoticia	= appRootPath.require('./logic/post/cadastrarNoticia');

var router = express.Router();

//router.post('/familias', familias);
router.post('/cadastrar', postCadastro);
router.post('/logar', postLogin);
router.post('/atualizarCadastro', atualizarCadastro);
//router.post('/dataRequisicao', dataRequisicao);
router.post('/cadastrarNoticia', cadastrarNoticia);

module.exports = router;