import { NextFunction, Request, Response } from 'express';
import { checkSchema } from 'express-validator';
const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const check = await checkSchema(
      {
        name: { notEmpty: true, errorMessage: 'Debe tener un valor' },
        surname: { notEmpty: true, errorMessage: 'Debe tener un valor' },
        username: { notEmpty: true, errorMessage: 'Debe tener un valor' },
        email: { notEmpty: true, errorMessage: 'Email invalido' },
        password: {
          isLength: { options: { min: 8 }, errorMessage: 'Valor mínimo de 8 caracteres' },
          notEmpty: true,
          errorMessage: 'Debe tener un valor',
        },
      },
      ['body']
    ).run(req);

    const result = formatResult(check);

    if (result.length > 0) {
      return res.status(400).send({
        message: 'Validation error',
        result: {},
        error: result,
      });
    }

    next();
  } catch (error: any) {
    res.status(500).send('Something went wrong');
  }
};

export default userMiddleware;

const formatResult = (result: any[]) => {
  return result
    .map((elem) =>
      elem.errors.map((err: any) => {
        return { [err.path]: err.msg };
      })
    )
    .flat();
};
