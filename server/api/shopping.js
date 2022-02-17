const db = require('../db');
const express = require('express');
const router = express.Router();
const mysqlDB = require('mysql');
const $sql = require('../sql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// 连接已配置的数据库
const conn = mysqlDB.createConnection(db.mysql);

conn.connect();
const JsonWrite = (req, res) => {
  if (typeof res === 'undefined') {
    req.json({
      code: '10013',
      message: '操作失败',
    });
  } else {
    req.json(res);
  }
};
router.post('/serachShopping', jsonParser, (req, res) => {
  serachShopping(req, res);
});
function serachShopping(req, res) {
  console.log(req.body);
  let { pageSize, pageIndex, value } = req.body;
  let to = pageSize * pageIndex - pageSize;
  let sql = `select * from dg_taobao where zh like '%${value}%' limit ${to},${pageSize};`;
  let sql1 = `select count(1) from dg_taobao where zh like '%${value}%';`;
  conn.query(sql, (err, reu) => {
    if (err) {
      res.json({
        code: '10001',
        message: '操作失败',
      });
    } else {
      conn.query(sql1, (error, resolve) => {
        if (error) {
          res.json({ code: '10011', message: '操作失败' });
        } else {
          res.json({
            code: '10003',
            message: '操作成功',
            data: reu,
            total: resolve[0]['count(1)'],
          });
        }
      });
    }
  });
}
router.post('/deleteShopping', jsonParser, (req, res) => {
  console.log(req.body);

  let {
    id,
    level,
    parent_id,
    zh,
    ru,
    pt,
    en,
    sort,
    catid,
    catid_use,
    query,
    query_use,
    weight,
    status,
  } = req.body;
  let sql = `delete from dg_taobao where id=${id}`;
  let sql1 = `INSERT INTO dg_taobao_recover values(${id},${level},${parent_id},
    \'${zh}\',\'${ru}\',\'${pt}\',\'${en}\',${sort},${catid},${catid_use},\'${query}\',${query_use},
    ${weight},${status}
    );`;
  conn.query(sql1, (error, data) => {
    if (error) res.json(error);
    else {
      conn.query(sql, (err, result) => {
        if (err) {
          res.json({
            code: '10019',
            message: '操作失败',
          });
        } else {
          res.json({
            code: '10001',
            message: '删除成功',
            state: 'success',
          });
        }
      });
    }
  });
});
router.post('/selectAllShopping', jsonParser, (req, res) => {
  if (req.body.value) {
    serachShopping(req, res);
    return;
  }
  let pageIndex = req.body.pageIndex;
  let pageSize = req.body.pageSize;
  let T = pageIndex * pageSize - pageSize * 1;
  let F = pageSize;
  let sql = `select * from dg_taobao limit ${T},${F}`;
  let sql1 = $sql.shopping.total;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err, '接口失败');
    } else {
      conn.query(sql1, (error, resolve) => {
        if (error) {
          res.json({
            code: '11003',
            message: '操作失败',
          });
        } else {
          JsonWrite(res, {
            code: 200,
            message: '操作成功',
            data: result,
            total: resolve[0]['count(1)'],
          });
        }
      });
    }
  });
});
router.post('/setShoppingWeight', jsonParser, (req, res) => {
  let sql = `UPDATE dg_taobao set weight =${req.body.weight} where id = ${req.body.id}`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.json({
        code: '10003',
        message: '操作失败',
      });
    } else {
      res.json({
        code: '10001',
        message: '操作成功',
      });
    }
  });
});
/**
 * @Recover 回收站
 */
//
router.get('/shoppingRecover', (req, res) => {
  let sql = `select * from dg_taobao_recover`;
  conn.query(sql, (err, result) => {
    if (err) res.json(err);
    else res.json(result);
  });
});
module.exports = router;
