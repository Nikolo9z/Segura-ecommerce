import { NextApiRequest,NextApiResponse } from "next";

export function AuthMiddleware(req: NextApiRequest, res: NextApiResponse) {
  // Guardamos la función original
  const originalJson = res.json.bind(res);

  // Reemplazamos res.json
  res.json = (body: any) => {
    console.log("Respuesta enviada:", body);
    return originalJson(body);
  };

  // Aquí podrías agregar lógica de autenticación si quieres
}