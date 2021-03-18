const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  let status=1;
  let message='Successfully fetch'
  if(data.length==0){
    status=0;
    message="No data";
  }
  return {
    data,status,message,meta
  }
}
async function getSingle(id){
    const rows = await db.query(
      `SELECT * FROM programming_languages where id= ?`, 
      [id]
    );
    const data = helper.emptyOrRows(rows);
    let status=1;
    let message='Successfully fetch'
    if(data.length==0){
        status=0;
        message="No data";
    }
    return {
      data,status,message
    }
  }
  async function create(programmingLanguage){
    const result = await db.query(
      `INSERT INTO programming_languages 
      (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
      VALUES 
      (?, ?, ?, ?, ?)`, 
      [
        programmingLanguage.name, programmingLanguage.released_year,
        programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
        programmingLanguage.tiobe_rank
      ]
    );
  
    let message = 'Error in creating programming language';
    let status = 0;
    if (result.affectedRows) {
      message = 'Programming language created successfully';
      status=1;
    }
  
    return {message,status};
  }
module.exports = {
  getMultiple,
  getSingle,
  create
}