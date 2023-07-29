function stripDollars(data: string): number;
function stripDollars(data: string[]): number[];
function stripDollars(data: string[] | string): number | number[] {
  if (Array.isArray(data)) {
    return data.map((item) => Number(item.split("$")[1]));
  }
  return Number(data.split("$")[1]);
}
export { stripDollars };
