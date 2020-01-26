export const symbolPrefix = Symbol('prefix');

export type IController = new () => {};

interface IRoute {
  method: 'get' | 'post' | 'put' | 'delete' | 'all';
  path: string
}

export interface IControllerConfig {
  route: IRoute
}

export interface IControllerFn extends IControllerConfig {
  (...args: Array<number | string | object>): Promise<object | string>;
}

const normalizePath = (path: string) => path.startsWith('/') ? path : `/${path}`;

const route = ({ method, path }: IRoute) => (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
  const controllerFn = Reflect.get(target, propertyKey);
  Reflect.set(controllerFn, 'route', { 
    path: normalizePath(path),
    method
  });
}

export const Controller = (prefix: string) => {
  return (target: IController) => {
    Reflect.set(target, symbolPrefix, prefix);
  }
}
export const Get = (path: string) => route({ path, method: 'get'});
export const Post = (path: string) => route({ path, method: 'post'});
export const Put = (path: string) => route({ path, method: 'put'});
export const Delete = (path: string) => route({ path, method: 'delete'});
export const All = (path: string) => route({ path, method: 'all'});
