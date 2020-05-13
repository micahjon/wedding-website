import Airtable from 'airtable';

export default (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'appOBrTFDUja733KK'
  );

  if (!req.body || typeof req.body !== 'object') {
    return res.json({ error: 'POST body is not valid JSON' });
  }

  const { familyID, email, notes, isAttendingBrunch, people = [] } = req.body;

  const newEntries = people.map(({ name, isAttending, dietaryRestrictions }) => {
    return {
      fields: {
        Guest: name,
        Attending: isAttending,
        'Dietary Restrictions': dietaryRestrictions,
        Email: email,
        Notes: notes,
        Brunch: isAttending && isAttendingBrunch,
        Family: [familyID],
      },
    };
  });

  console.log(newEntries);

  base('RSVPs').create(newEntries, (errorObject) => {
    if (errorObject) {
      res.json({ ...errorObject });
      console.error(errorObject);
      return;
    }

    res.json({ success: true });
  });
};
