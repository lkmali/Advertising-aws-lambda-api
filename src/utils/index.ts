import createError from 'http-errors'

/**
 * BadRequest
 *
 * @export
 * @param {string} message
 * @returns {Error}
 */
export function badRequest (message: string): {statusCode: number; error: Error } {
  return { error: createError(400, message), statusCode: 400 }
}

/**
 * Unauthorized
 *
 * @export
 * @param {string} message
 * @returns {Error}
 */
export function unauthorized (message: string): {statusCode: number; error: Error } {
  return { error: createError(401, message), statusCode: 401 }
}

/**
 * internalError
 *
 * @export
 * @param {string} message
 * @returns {Error}
 */
export function internalError (message: string): {statusCode: number; error: Error } {
  return { error: createError(500, message), statusCode: 500 }
}

/**
 * custom error
 *
 * @export
 * @param {string} message
 * @returns {Error}
 */
export function customError (statusCode: number, message: string): {statusCode: number; error: Error } {
  return { error: createError(statusCode, message), statusCode: 500 }
}

export function isEmpty(value: any): boolean {
    if (value == null) return true; // Checks for null and undefined
  
    if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  
    if (typeof value === 'object') return Object.keys(value).length === 0;
  
    return false;
  }

  export function isNil(value: any): boolean {
    return value == null; // Checks for null and undefined
  }

  export function omit<T extends Record<string, any>, K extends keyof T>(
    obj: T, 
    keys: K[]
  ): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
  }
