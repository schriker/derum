import { plainToClass } from 'class-transformer';

const rawQueryToEntity = (entity: any, res: any) => {
  res.forEach((e: any) => {
    Object.keys(e).forEach((key) => {
      if (key.indexOf('.') != -1) {
        const nameStart = key.substring(0, key.indexOf('.'));
        const nameLast = key.substring(key.indexOf('.') + 1, key.length);
        if (e[key] !== null) {
          if (!e[nameStart]) {
            e[nameStart] = {};
          }
          e[nameStart][nameLast] = e[key];
        }
        delete e[key];
      }
    });
  });
  return plainToClass(entity, res as Record<string, unknown>[]);
};

export default rawQueryToEntity;
