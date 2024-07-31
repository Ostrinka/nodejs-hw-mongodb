import { SORT_ORDER } from "../constants/index.js";

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

  return "name";
};

function parseSortOrder(sortOrder) {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
};

function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export { parseSortParams };