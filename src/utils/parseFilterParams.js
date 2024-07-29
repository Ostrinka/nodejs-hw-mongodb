function parseContactType(contactType) {
  if (typeof contactType !== 'string') {
    return undefined;
  }

  const validTypes = ['work', 'home', 'personal'];
  if (validTypes.includes(contactType)) {
    return contactType;
  }

  return undefined;
}

function parseIsFavourite(isFavourite) {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  }

  return undefined;
}

function parseFilterParams(query) {
  const { isFavourite, contactType } = query;
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
}

export { parseFilterParams };