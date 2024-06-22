export const unprotectedPaths = ['/login', '/registration', '/', '/clothing'];

export const isAllowedPath = (path) => {
  if (unprotectedPaths.includes(path)) {
    return true;
  }

  const dynamicAllowedPattern = /^\/clothing\/\d+$/;

  return dynamicAllowedPattern.test(path);
};
