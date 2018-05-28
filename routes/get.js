var express     	= require('express');
var appRootPath 	= require('app-root-path');

var verifica	= appRootPath.require('./logic/get/verifica');
var membros	= appRootPath.require('./logic/get/membros');
var pontuacao	= appRootPath.require('./logic/get/pontuacao');
var atividades	= appRootPath.require('./logic/get/atividades');
var familia	= appRootPath.require('./logic/get/familia');
var usuario	= appRootPath.require('./logic/get/usuario');
var notificacao	= appRootPath.require('./logic/get/notificacao');
var limparDatas	= appRootPath.require('./logic/get/LimparDatasUser');

var router = express.Router();

router.get('/verifica', verifica);
router.get('/membros', membros);
router.get('/pontuacao', pontuacao);
router.get('/atividades', atividades);
router.get('/familia', familia);
router.get('/usuario', usuario);
router.get('/notificacao', notificacao);
router.get('/limparDatas', limparDatas);

module.exports = router;