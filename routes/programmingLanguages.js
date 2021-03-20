const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/*Get single programming language */
router.get('/single/:id', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.getSingle(req.params.id));
    } catch (err) {
      console.error(`Error while getting single programming languages `, err.message);
      next(err);
    }
  });

/* save programing language */
router.post('/save', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.create(req.body));
    } catch (err) {
      console.error(`Error while creating programming language`, err.message);
      next(err);
    }
  });
/* update programing language */
router.post('/update', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.update(req.body));
  } catch (err) {
    console.error(`Error while update programming language`, err.message);
    next(err);
  }
});

router.get('/createjwt', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.cretateJwt());
  } catch (err) {
    console.error(`Error while create jwt token`, err.message);
    next(err);
  }

});
router.post('/decodeJwt',async function(req,res,next){
  try{
    res.json(await programmingLanguages.decodeJwt(req.body));
  }
  catch(err){
    console.error(`Error while create jwt token`, err.message);
    next(err);
  }
})
module.exports = router;