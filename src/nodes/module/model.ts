import { cid } from '../../libs/model';

type ModuleModel = {
  id: string; // unique module id
  name: string[]; // ['http2', 'server']
  type: string; // 'ts', 'tsx, 'js', 'jsx', 'mjs', 'json'
  definitions: string[];
  exports?: {
    definitions?: string[];
    default?: string;
  };
  path?: string; // package relative path
};

export default ModuleModel;

export function wordsFromName(name: string): string[] {
  const words: string[] = [];
  for (let offset = 0; offset < name.length; offset++) {
    const code = name.charCodeAt(offset);
    if (code >= 65 && 90 >= code) { // upper case letter
      words.push(String.fromCharCode(code + 32));
    } else if ((code >= 97 && 122 >= code) || (code >= 48 && 57 >= code)) {
      words[words.length - 1] += String.fromCharCode(code);
    }
  }
  return words;
}

export function create(name: string): ModuleModel {
  return {
    id: cid(),
    name: wordsFromName(name),
    type: 'ts',
    definitions: []
  };
}
