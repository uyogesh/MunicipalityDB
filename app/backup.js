import backup from 'mongodb-backup';
import restore from 'mongodb-restore';
// import os from 'os';
import fs from 'fs';
import { url } from './db';

export const backupDb = () => {
  const date = new Date();
  const path = `/dbBackup/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}${date.getMinutes()}/`;
  fs.mkdirSync(path);
  backup({
    uri: `${url}/municipality`,
    root: path,
    tar: 'municipality.tar'
  });
};

export const restoreDb = (pathName) => {
  restore({
    uri: `${url}/municipality`,
    root: pathName,
    tar: 'municipality.tar'
  });
};
