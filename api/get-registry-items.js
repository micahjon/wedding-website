import Airtable from 'airtable';

export default (req, res) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    'appOBrTFDUja733KK'
  );
  const items = [];
  base('Registry')
    .select({
      view: 'Main View',
    })
    .eachPage(
      (records, fetchNextPage) => {
        items.push(
          ...records
            .map((record) => {
              const name = record.get('Name');
              const link = record.get('Link');
              const photos = record.get('Photo');
              const count = record.get('Count');
              const claimDates = (record.get('Claim Dates') || '')
                .split(/, ?/)
                .map((date) => date.trim())
                .filter(Boolean);
              if (!name) return;
              return {
                id: record.id,
                name,
                link,
                photo: photos ? photos[0].thumbnails.large : undefined,
                count,
                claimDates,
              };
            })
            .filter(Boolean)
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

        res.json({ items });
      }
    );
};
