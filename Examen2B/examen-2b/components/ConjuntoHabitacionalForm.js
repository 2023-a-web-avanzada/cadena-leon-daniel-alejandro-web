import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Switch, Button, VStack } from '@chakra-ui/react';

function ConjuntoHabitacionalForm({ onSubmit }) {
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [fundacion, setFundacion] = useState('');
    const [enUso, setEnUso] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            nombre,
            ubicacion,
            fundacion,
            enUso
        });
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4} padding={4} borderWidth={1} borderRadius="md">
            <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input value={nombre} onChange={e => setNombre(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Ubicación</FormLabel>
                <Input value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Fecha de fundación</FormLabel>
                <Input type="date" value={fundacion} onChange={e => setFundacion(e.target.value)} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">En uso</FormLabel>
                <Switch size="md" isChecked={enUso} onChange={() => setEnUso(prev => !prev)} />
            </FormControl>
            <Button type="submit" colorScheme="blue">Enviar</Button>
        </VStack>
    );
}

export default ConjuntoHabitacionalForm;
