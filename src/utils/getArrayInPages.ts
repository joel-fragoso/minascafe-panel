export default function getArrayInPages(
  arrayOfItems: Array<unknown>,
  numItemsPerPage = 7,
) {
  const arr = arrayOfItems.slice(0);
  const pages = [];

  while (arr.length) {
    pages.push(arr.splice(0, numItemsPerPage));
  }

  return pages;
}
