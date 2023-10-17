export function findPosts(
  items,
  pageIndex,
  pageSize,
  sortField,
  sortDirection,
) {
  let localItems;

  if (sortField && sortField !== "id") {
    localItems = items.slice(0).sort((a, b) => {
      const strFieldA =
        sortDirection === "desc"
          ? b[sortField].toUpperCase()
          : a[sortField].toUpperCase();
      const strFieldB =
        sortDirection === "desc"
          ? a[sortField].toUpperCase()
          : b[sortField].toUpperCase();

      if (strFieldA < strFieldB) {
        return -1;
      }
      if (strFieldA > strFieldB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else if (sortField) {
    localItems = items.slice(0).sort((a, b) => {
      const idA = sortDirection === "desc" ? b[sortField] : a[sortField];
      const idB = sortDirection === "desc" ? a[sortField] : b[sortField];

      if (idA < idB) {
        return -1;
      }
      if (idA > idB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else {
    localItems = items;
  }

  let pageOfItems;
  if (!pageIndex && !pageSize) {
    pageOfItems = localItems;
  } else {
    const startIndex = pageIndex * pageSize;
    pageOfItems = localItems.slice(
      startIndex,
      Math.min(startIndex + pageSize, localItems.length),
    );
  }

  return pageOfItems;
}
