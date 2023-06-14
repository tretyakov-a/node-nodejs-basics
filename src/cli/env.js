const PREFIX = "RSS_";
const SEP = "; ";

const parseEnv = () => {
  const rssVars = Object.keys(process.env)
    .filter((key) => key.startsWith(PREFIX))
    .reduce((acc, key) => {
      const varString = `${key}=${process.env[key]}`;
      return [...acc, varString];
    }, []);

  console.log(rssVars.join(SEP));
};

parseEnv();
