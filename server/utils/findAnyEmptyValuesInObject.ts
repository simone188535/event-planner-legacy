/*
 when given an object (like req.body), this helper method iterates over it and looks and returns the 
 the first key value pair is null or equal to an empty string.
 */

const allReqBodyObject = (obj) => Object.entries(obj).map(([key, val]) => ({
  key,
  value: val,
}));


// 
const findEmptyObjVals = allReqBodyObject.find(
  ({ key, value }) => value === "" || value === null
);

return findEmptyObjVals;
