const sql = {
  shopping: {
    all: 'select * from dg_taobao limit 20;',
    total: 'select count(1) from dg_taobao;',
  },
};

module.exports = sql;
