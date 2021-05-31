export function cdkTableSnapshot(element: HTMLElement, selector: string) {
  const cells = element.querySelectorAll<HTMLElement>(selector);
  const columnCount = cells[0]?.parentElement?.childElementCount ?? 0;
  const rowCount = cells.length / columnCount;
  const cellCount = columnCount * rowCount;

  return {
    cells,
    rowCount: isNaN(rowCount) ? 0 : rowCount ?? -1,
    columnCount: isNaN(columnCount) ? 0 : columnCount ?? -1,
    cellCount: isNaN(cellCount) ? 0 : cellCount ?? -1,
  };
}
