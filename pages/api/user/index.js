export default (req, res) => {
  switch (req.method) {
    case 'GET':
      const users = await excuteQuery({
        query: 'SELECT * FROM USER_BASE;',
        values: '',
      });
      res.send(users);
      break;
    case 'POST':
      {
        const { FIRST_NAME, LAST_NAME, PASSWORD } = req.body;
        const result = await excuteQuery({
          query:
            'INSERT INTO USER_BASE(FIRST_NAME,LAST_NAME,PASSWORD) VALUES(?,?,MD5(?));',
          values: [FIRST_NAME, LAST_NAME, PASSWORD],
        });
        res.send(result);
      }
      break;
    case 'DELETE':
      {
        const result = await excuteQuery({
          query: 'DELETE FROM USER_BASE;',
          values: '',
        });
        res.send(result);
      }
      break;
    default:
      res.status(405).end();
      break;
  }
};
