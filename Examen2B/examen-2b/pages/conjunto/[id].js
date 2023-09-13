import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    List,
    ListItem,
    Badge,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function ConjuntoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [conjunto, setConjunto] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const resConjunto = await fetch(`http://localhost:3001/conjunto/${id}`);
                    const dataConjunto = await resConjunto.json();

                    const resDepartamentos = await fetch(`http://localhost:3001/departamentos/${id}`);
                    const dataDepartamentos = await resDepartamentos.json();

                    setConjunto(dataConjunto);
                    setDepartamentos(dataDepartamentos);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [id]);

    const eliminarConjunto = async () => {
        try {
            await fetch(`http://localhost:3001/conjunto/${id}`, {
                method: 'DELETE',
            });
            router.push('/conjuntos');
        } catch (err) {
            console.error(err);
        }
    };

    const eliminarDepartamento = async (deptoId) => {
        try {
            await fetch(`http://localhost:3001/departamento/${deptoId}`, {
                method: 'DELETE',
            });
            const updatedDepartamentos = departamentos.filter(depto => depto.id !== deptoId);
            setDepartamentos(updatedDepartamentos);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box p={6}>
            <Heading mb={4}>{conjunto?.nombre}</Heading>
            <Flex direction="column" alignItems="start" spacing={3}>
                <Text fontSize="xl"><b>Ubicación:</b> {conjunto?.ubicacion}</Text>
                <Text fontSize="xl"><b>Fecha de Fundación:</b> {conjunto?.fundacion}</Text>
                <Badge colorScheme={conjunto?.enUso ? 'green' : 'red'}>{conjunto?.enUso ? 'En uso' : 'No está en uso'}</Badge>
                <List mt={6} spacing={2}>
                    {departamentos.map(depto => (
                        <ListItem key={depto.id} border="1px" borderColor="gray.200" borderRadius="md" p={3}>
                            <Text><b>Número:</b> {depto.id}</Text>
                            <Text><b>Área:</b> {depto.area}</Text>
                            <Text><b>Amueblado:</b> {depto.amueblado ? 'Sí' : 'No'}</Text>
                            <Text><b>Precio:</b> ${depto.precio}</Text>
                            <Text><b>Fecha de Estreno:</b> {depto.fechaEstreno}</Text>
                            <IconButton
                                aria-label="Eliminar departamento"
                                icon={<DeleteIcon />}
                                onClick={() => eliminarDepartamento(depto.id)}
                                colorScheme="red"
                                variant="ghost"
                                size="sm"
                            />
                        </ListItem>
                    ))}
                </List>
            </Flex>
            <Flex mt={6} spacing={4}>
                <Button onClick={() => router.push('/conjuntos')}>Volver a Conjuntos</Button>
                <Button ml={4} onClick={() => router.push(`/crearDepartamento?conjuntoId=${conjunto?.id}`)}>Agregar Departamento</Button>
                <Button ml={4} colorScheme="red" onClick={() => setIsOpen(true)}>Eliminar Conjunto</Button>
            </Flex>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Eliminar Conjunto Habitacional
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            ¿Estás seguro? Esta acción no se puede deshacer.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={eliminarConjunto} ml={3}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
