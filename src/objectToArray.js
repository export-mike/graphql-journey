// // @ low
// export default function (obj: Object): Array<Object> {
//   return Object.keys(obj)
//   .reduce((acc: Array<Object>, k:string) => {
//     return [...acc, [ obj[k] ]];
//   }, [])
// }

export default function(obj) {
  return Object.keys(obj).reduce(
    (acc, k) => {
      return acc.concat([{ name: k, ...obj[k] }]);
    },
    []
  );
}
