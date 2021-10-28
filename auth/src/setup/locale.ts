import { Request, Response, NextFunction } from 'express'
import default_lang from '../app/locales/en-US/translations.json'

declare global {
  namespace Express {
    export interface Request {
      t: typeof default_lang;
    }
  }
}

export const localeMiddleware = (localeHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    // get accept language: he-IL, en-US ...etc
    const accept_language = req.headers['accept-language']
  
    // import the language object and assign to req.t
    req.t = await localeHandler(accept_language)
  
    next()
  
  }
}

export const localeHandler = async (accept_language: string): Promise<{}> => {
  try {
    const { default: translations } = await import(`../app/locales/${accept_language}/translations.json`)
    return translations
  } catch (err) {
    const { default: translations } = await import(`../app/locales/en-US/translations.json`)
    return translations
  }
}