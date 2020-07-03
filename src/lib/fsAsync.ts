import fs from 'fs';
import { promisify } from 'util';

export const readdirAsync = promisify(fs.readdir);
export const readFileAsync = promisify(fs.readFile);