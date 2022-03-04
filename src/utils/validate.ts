/**
 *
 * @param path 路径
 * @returns
 */

export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
