const ARGS_SEP = ", ";
const ARG_PREFIX = "--";

const propNameRegExp = new RegExp(`^${ARG_PREFIX}[\\w]{1,}[\\w]*$`);
const isValidPropName = (name) => propNameRegExp.test(name);

const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsAsNameValue = [];
  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i];
    if (isValidPropName(propName)) {
      const value = args[i + 1];
      if (!value || isValidPropName(value)) {
        throw new Error(`Property '${propName}' has now value`);
      }
      argsAsNameValue.push(`${propName.slice(ARG_PREFIX.length)} is ${value}`);
    } else {
      throw new Error(`Argument name '${propName}' invalid`);
    }
  }
  console.log(argsAsNameValue.join(ARGS_SEP));
};

try {
  parseArgs();
} catch (err) {
  console.error(err.message);
}
