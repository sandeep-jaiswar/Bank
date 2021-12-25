import excuteQuery from '../../../src/config/database';

export default async (req, res) => {
  const { userId } = req.query;
  switch (req.method) {
    case 'GET':
      const users = await excuteQuery({
        query: 'SELECT * FROM USER_BASE WHERE ID=?;',
        values: userId,
      });
      res.send(users);
      break;
    case 'POST':
      const result = await excuteQuery({
        query:
          'INSERT INTO USER_BASE(FIRST_NAME,LAST_NAME,PASSWORD) VALUES(?,?,MD5(?));',
        values: ['SUPER', 'USER', 'SUPER'],
      });
      res.send(result);
      break;
    case 'PATCH':
      {
        const { FIRST_NAME, LAST_NAME, PASSWORD } = req.body;
        const arr = Object.entries(req.body);
        const querystr = arr.reduce((acc, cur, currentIndex) => {
          if (cur.length > 1 && cur[1]) {
            return (
              acc +
              `${cur[0]}= '${cur[1]}' ${
                currentIndex != arr.length - 1 ? ',' : ''
              }`
            );
          }
          return '';
        }, '');
        const result = await excuteQuery({
          query: `UPDATE USER_BASE SET ${querystr} WHERE ID=${userId};`,
          values: [FIRST_NAME, LAST_NAME, PASSWORD],
        });
        res.send(result);
      }
      break;
    case 'DELETE':
      {
        const result = await excuteQuery({
          query: 'DELETE FROM USER_BASE WHERE ID=${userId};',
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
