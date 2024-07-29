import { SORT_ORDER } from "../constants/index.js";

function parseSortOrder(sortOrder) {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
};

function parseSortBy(sortBy) {
  const keys = [
    "_id",
    "name",
    "phoneNumber",
    "isFavourite",
    "contactType",
    "createdAt",
    "updatedAt"
  ];

  if (keys.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

function parseSortParams(query) {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

export { parseSortParams };