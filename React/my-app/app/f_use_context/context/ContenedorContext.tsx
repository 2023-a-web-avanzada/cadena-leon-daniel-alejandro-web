// f_use_context/context/ContenedorContext.ts
import { createContext } from "react";
import { ContenedorContextObjeto } from "../components/interfaces/ContenedorContextObjeto";

export const ContenedorContext = createContext(
    {} as ContenedorContextObjeto
)