import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {conf} from './conf.js'


const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const filePath = path.join(__dirname, './.output/ecosystem.config.cjs');


const content = `module.exports = ${
    JSON.stringify(conf)
}`;


fs.writeFile(filePath, content, (err) => {
    if (err) throw err; 
    console.log(`成功将内容写入到${filePath}中,大丰版本1.00`);
});