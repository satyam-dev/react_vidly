import _ from "lodash";
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // convert items to a lodash object to chain operators - _(items)
  // convert back the lodash object to an array(or any other value type) by calling .value()
  return _(items).slice(startIndex).take(pageSize).value();
}
