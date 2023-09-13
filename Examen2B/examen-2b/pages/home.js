import { Box, Button, Heading, VStack, Spacer } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function MainPage() {
    const router = useRouter();

    return (
        <Box p={6}>
            <Heading mb={6}>Página Principal</Heading>
            <VStack spacing={4}>
                <Button onClick={() => router.push('/conjuntos')}>Ver Conjuntos Habitacionales</Button>
                <Button onClick={() => router.push('/crearConjunto')}>Crear Conjunto Habitacional</Button>
            </VStack>
        </Box>
    );
}