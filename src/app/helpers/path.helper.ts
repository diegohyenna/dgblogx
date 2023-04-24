export function buildPath(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
): any {
  const originalMethod = descriptor.value;

  descriptor.value = function (items: any) {
    let path = '?';
    for (let item in items) {
      path += `${items[item] != 'all' ? `${item}=${items[item]}&` : ''}`;
    }
    path = path.substring(0, path.lastIndexOf('&'));

    return originalMethod.apply(this, [path]);
  };
  return descriptor;
}
