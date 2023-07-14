'use client'
import useSelectMoneda from "./hooks/useSelectMoneda";
import { MonedasConst } from "./const/monedas.const";
import useEffect from "react";

export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [moneda, UseSelectMonedas] = useSelectMoneda('Monedas global 2', MonedasConst)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
        () => {
            console.log(moneda);
        },
        [moneda]
    )
    return (
        <>
            {UseSelectMonedas}
        </>
    )
}