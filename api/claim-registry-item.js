import Airtable from 'airtable';

export default (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'appOBrTFDUja733KK'
  );

  if (!req.body || typeof req.body !== 'object') {
    return res.json({ error: 'POST body is not valid JSON' });
  }

  const { id, claimedCount } = req.body;

  base('Registry').update(
    [
      {
        id,
        fields: {
          'Claimed Count': claimedCount,
        },
      },
    ],
    (errorObject) => {
      if (errorObject) {
        res.json({ ...errorObject });
        console.error(errorObject);
        return;
      }

      res.json({ success: true });
    }
  );
};
