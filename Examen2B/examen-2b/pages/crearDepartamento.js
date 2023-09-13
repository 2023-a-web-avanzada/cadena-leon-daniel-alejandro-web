import { Box, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DepartamentoForm from '../components/DepartamentoForm';

export default function CrearDepartamento() {
    const router = useRouter();
    const { conjuntoId } = router.query;

    const handleCrearDepartamento = (data) => {
        fetch('http://localhost:3001/departamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, conjuntoHabitacionalId: conjuntoId })
        }).then(() => {
            router.push(`/conjunto/${conjuntoId}`);
        });
    };

    return (
        <Box p={28}>
            <Heading mb={4}>Agregar Departamento al Conjunto {conjuntoId}</Heading>
            <DepartamentoForm onSubmit={handleCrearDepartamento} />
            <Button mt={4} onClick={() => router.push('/home')}>Volver a la Página Principal</Button>
        </Box>
    );
}

