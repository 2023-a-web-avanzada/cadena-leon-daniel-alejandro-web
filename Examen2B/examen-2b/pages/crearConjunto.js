import { Box, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ConjuntoHabitacionalForm from '../components/ConjuntoHabitacionalForm';

export default function CrearConjunto() {
    const router = useRouter();

    const handleCrearConjunto = (data) => {
        fetch('http://localhost:3001/conjunto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => {
            router.push('/conjuntos');
        });
    };

    return (
        <Box p={28}>
            <Heading mb={4}>Crear Conjunto Habitacional</Heading>
            <ConjuntoHabitacionalForm onSubmit={handleCrearConjunto} />
            <Button mt={4} onClick={() => router.push('/home')}>Volver a la Página Principal</Button>
        </Box>
    );
}
