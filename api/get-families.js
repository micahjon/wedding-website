import Airtable from 'airtable';

export default (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'appOBrTFDUja733KK'
  );
  const families = [];
  base('Invitations')
    .select({
      // Selecting the first 3 records in Main View:
      // maxRecords: 3,
      view: 'Main View',
    })
    .eachPage(
      (records, fetchNextPage) => {
        families.push(
          ...records.map((record) => {
            const family = record.get('Family');
            return {
              id: record.id,
              ...getFamilyData(family),
            };
          })
        );

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      (errorObject) => {
        if (errorObject) {
          res.json({ ...errorObject });
          console.error(errorObject);
          return;
        }

        res.json({ families });
      }
    );

  // res.json({ name: 'John', email: process.env.AIRTABLE_API_KEY });
};

function getFamilyData(family) {
  let people = family
    .replace(/\([^)]+\)/g, '')
    .split(/ and |, and |, & | & |, /)
    .map((p) => p.trim());
  if (people.length === 1)
    return {
      family,
      members: people,
      plusOne: true,
    };

  const nameWithLastName = people
    .slice()
    .reverse()
    .find((p) => p.includes(' '));
  if (nameWithLastName) {
    const lastNames = nameWithLastName.split(' ');
    lastNames.shift();
    const lastName = lastNames.join(' ');
    people = people.map((p) => {
      if (p.includes(' ')) return p;
      return `${p} ${lastName}`;
    });
  }

  if (people[people.length - 1].match(/family|baby/)) {
    people.pop();
    return {
      family,
      members: people,
      extraMembers: true,
    };
  }

  return {
    family,
    members: people,
  };
}
