import cms from './src/qlcms';

async function main() {
  const schema = await new cms({
    typesPath: `${process.cwd()}/model`,
  }).buildSchema();

  const template = await new cms({
    typesPath: `${process.cwd()}/model`,
  }).buildCms();
}

main();
