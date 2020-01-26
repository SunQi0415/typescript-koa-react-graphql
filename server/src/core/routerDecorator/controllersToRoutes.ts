import fs from 'fs';
import path from 'path';
import KoaRouter from 'koa-router';
import { symbolPrefix, IController, IControllerFn } from './router.decorator';

// 扫描controller中的文件
async function readController(controllerPath: string) {
  const Controllers: object[] = [];
  const fileNames = fs.readdirSync(controllerPath);

  for (const name of fileNames) {
    const _controllerPath = path.join(controllerPath, name);
    if (fs.statSync(_controllerPath).isDirectory()) {
      await readController(_controllerPath)
    } else {
      try {
        const controllerClass = await import(_controllerPath);
        if (typeof controllerClass === 'object' && Object.prototype.toString.call(controllerClass).toLowerCase() === '[object object]') {
          Controllers.push(controllerClass.default);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  // console.log(Controllers)
  return Controllers;
  
}

const scannerControllers = async (controllerPath: string) => {
  return await readController(controllerPath);
}


// 路由映射控制器
export default async (router: KoaRouter) => {
  scannerControllers(path.join(__dirname, '../../controller/')).then((Controllers) => {
    Controllers.forEach((Controller: IController) => {
      // console.log(Controller)
      const cPath = Reflect.get(Controller, symbolPrefix);
      if (!cPath) return;
      
      const controllerFnKeys: (string | number | symbol)[] = Reflect.ownKeys(Controller.prototype);
      
      controllerFnKeys.forEach((key: string) => {
        if (key === 'constructor') return;
        const controllerFn: IControllerFn = Reflect.get(Controller.prototype, key);
        const { method, path: controllerFnPath } = controllerFn.route;
        const url = cPath + controllerFnPath;
        const originalControllerFn = controllerFn.bind(Controller.prototype);

        router[method](url, originalControllerFn)
      })
    })
  })
}