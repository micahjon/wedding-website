groups
  .map((g) => {
    let people = g
      .replace(/\([^)]+\)/g, '')
      .split(/ and |, and |, & | & |, /)
      .map((p) => p.trim());
    if (people.length === 1) return people[0];

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
        return p + ' ' + lastName;
      });
      // console.log(lastName, people);
    }

    return people.join(', ');
  })
  .join('\n');
