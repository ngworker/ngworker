export function cdkTableSnapshot(element: HTMLElement, selector: string) {
  const cells = element.querySelectorAll<HTMLElement>(selector);
  const columnCount = cells[0]?.parentElement?.childElementCount ?? 0;
  const rowCount = cells.length / columnCount;
  const cellCount = columnCount * rowCount;

  return {
    cells,
    rowCount: rowCount ?? -1,
    columnCount: columnCount ?? -1,
    cellCount: cellCount ?? -1,
  };
}
