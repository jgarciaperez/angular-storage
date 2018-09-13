export class BaseStorage {
  get(key: string): any {}

  set(key: string, value: any, expires?: Date): void {}

  remove(key: string): void {}
}
export class InternalStorage extends BaseStorage {}

export class SDKStorage extends BaseStorage {}
