import { existsSync, readdir, writeFile } from 'fs';
const writeFilePlus = (fileName, filledTxt, isAppend) => {
    return new Promise((reslove, reject) => {
      // eslint-disable-next-line no-undef
      writeFile(fileName, new Buffer(filledTxt), isAppend ? { flag: 'a' } : {}, err => {
        if (err) {
          reject(err);
        }
        reslove(0);
      })
    })
  }
const tags = [{
    en: 'front',
    cn: '前端'
},{
    en: 'server',
    cn: '服务端'
}, {
    en: 'android',
    cn: '安卓'
}, {
    en: 'ops',
    cn: '运维'
}, {
    en: 'other',
    cn: '杂七杂八'
}];
const docs = tags.map(tag => ({
    ...tag,
    en: `./docs/${tag.en}`
}));
const readFils = (fileObj) => new Promise((res, rej) => {
    if(!existsSync(fileObj.en)) {
        res({
            menu: fileObj.cn,
            subMenus:[]
        })
    } else {
        readdir(fileObj.en, (err, files) => {
            if (err) {
                rej(err);
            }
    
            res({
                menu: fileObj.cn,
                subMenus: files? files.map(file => ({
                    title: file.replace('.md', ''),
                    path: `${fileObj.en}/${file}`
                })): []
            });
        })
    }
    
})
const run = async () => {
    const menus = await Promise.all(docs.map(async doc => await readFils(doc)));
    const sb = '# Summary\n\n* [总览](README.md)\n';

    const menusStr = menus.reduce((pre, cur) => {
        const {
            menu,
            subMenus
        } = cur;
        const menuStr = `* ${menu}\n`;
        const subMenusStr = subMenus.reduce((preSub, curSub) => preSub + `\t* [${curSub.title}](${curSub.path})\n`, '')
        return pre + menuStr + subMenusStr;
    }, sb)
    await writeFilePlus('SUMMARY.md', menusStr);
    console.log(menusStr);
    console.log('\n\n目录整理完成^_^y')
}

run();