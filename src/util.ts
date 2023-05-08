export const toDateStr = (d: Date) => {
  return [
    d.toDateString().split(" ").slice(0, 3).join(" "),
    d.toTimeString().split(" ")[0],
  ].join(", ");
};
