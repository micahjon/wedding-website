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
              const url = record.get('Link');
              const photos = record.get('Photo');
              const notes = record.get('Notes');
              const reservedBy = record.get('Reserved By');
              if (!name) return;
              return {
                id: record.id,
                name,
                url,
                photo: photos ? photos[0].thumbnails.large : undefined,
                reservedBy,
                notes,
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
