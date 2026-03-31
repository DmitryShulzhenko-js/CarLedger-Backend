import type { Request, Response, NextFunction } from "express";

export const test = async (req: Request, res: Response) => {

    console.log('зашло в роут /test!!!')

    //console.log('req.body: ', req.body)

    console.log("HEADERS:", req.headers);

   console.log("USER:", (req as any).user);

  return res.json({ msg: "success", ok: true });
};