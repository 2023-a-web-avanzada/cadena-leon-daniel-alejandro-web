import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Switch, Button, VStack, NumberInput, NumberInputField } from '@chakra-ui/react';

function DepartamentoForm({ onSubmit }) {
    const [area, setArea] = useState('');
    const [amueblado, setAmueblado] = useState(false);
    const [precio, setPrecio] = useState(0);
    const [fechaEstreno, setFechaEstreno] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            area,
            amueblado,
            precio,
            fechaEstreno
        });
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4} padding={4} borderWidth={1} borderRadius="md">
            <FormControl>
                <FormLabel>Área</FormLabel>
                <Input value={area} onChange={e => setArea(e.target.value)} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Amueblado</FormLabel>
                <Switch size="md" isChecked={amueblado} onChange={() => setAmueblado(prev => !prev)} />
            </FormControl>
            <FormControl>
                <FormLabel>Precio</FormLabel>
                <NumberInput value={precio} onChange={valueString => setPrecio(Number(valueString))} precision={2}>
                    <NumberInputField />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Fecha de estreno</FormLabel>
                <Input type="date" value={fechaEstreno} onChange={e => setFechaEstreno(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">Enviar</Button>
        </VStack>
    );
}

export default DepartamentoForm;
