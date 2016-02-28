export const describe = (name, fn) => {
  console.log(`# ${name.toUpperCase()}`);
  typeof fn === 'function'? fn() : null;
}
