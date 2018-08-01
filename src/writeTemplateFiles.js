import globby from 'globby';
import path from 'path';

import fse from 'fs-extra';
import mustache from 'mustache';


const writeTemplateFiles = async ({ location, destination, templateValues = {} }) => {
  const files = await globby(location, { dot: true });
  console.log('files', files);
  files.forEach((file) => {
    console.log('file', file);
    const relativeFilePath = path.relative(location, file);

    let destinationFilePath = path.join(destination, relativeFilePath);
    // (Ass)uming that package.json will always be at base of destination
    // I can't wait until I regret hard-coding this

    // I need to do this because I have templated package.json
    // npm actually won't package directories with invalid package.json files
    // so I have to change the name to package.template.json
    if (file.indexOf('package.template.json') >= 0) {
      destinationFilePath = path.join(destination, 'package.json');
    // if I don't template .npmignore they'll get respected and things will actually get ignore :(
    } else if (file.indexOf('.npmignore-template') >= 0) {
      destinationFilePath = path.join(destination, '.npmignore');
    } else if (file.indexOf('.gitignore-template') >= 0) {
      destinationFilePath = path.join(destination, '.gitignore');
    }

    fse.ensureFileSync(location);
    fse.ensureFileSync(destinationFilePath);
    const locationContents = fse.readFileSync(location, 'utf8');
    const content = mustache.render(locationContents, templateValues);
    console.log('content', content);
    fse.writeFileSync(destinationFilePath, content, 'utf8');
  });
};

export default writeTemplateFiles;
