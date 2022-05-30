const ARGS_SEP = ', ';
const NAME_VALUE_SEP = ' is ';

export const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsAsNameValue = [];
  for (let i = 0; i < args.length; i += 2) {
    const nameValue = args
      .slice(i, i + 2)
      .join(NAME_VALUE_SEP)
      .slice(2);
    argsAsNameValue.push(nameValue);
  }
  console.log(argsAsNameValue.join(ARGS_SEP));
};

parseArgs();
