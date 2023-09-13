import { Box, Heading, Button, List, ListItem, Link, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Conjuntos() {
    const [conjuntos, setConjuntos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:3001/conjuntos')
            .then(response => response.json())
            .then(data => setConjuntos(data));
    }, []);

    return (
        <Box p={6}>
            <Heading mb={4}>Conjuntos Habitacionales</Heading>
            <List spacing={6}>
                {conjuntos.map((conjunto) => (
                    <ListItem key={conjunto.id} border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                        <VStack align="start" spacing={2}>
                            <Link fontWeight="bold" fontSize="xl" onClick={() => router.push(`/conjunto/${conjunto.id}`)}>
                                {conjunto.nombre}
                            </Link>
                            <Text><b>Ubicación:</b> {conjunto.ubicacion}</Text>
                            <Text><b>Fecha de Fundación:</b> {conjunto.fundacion}</Text>
                            <Button size="sm" onClick={() => router.push(`/conjunto/${conjunto.id}`)}>
                                Ver más
                            </Button>
                        </VStack>
                    </ListItem>
                ))}
            </List>
            <Button mt={4} onClick={() => router.push('/home')}>Volver a la Página Principal</Button>
            <Button ml={4} mt={4} onClick={() => router.push('/crearConjunto')}>Crear Conjunto</Button>
        </Box>
    );
}
