import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Box,
    CircularProgress
} from '@mui/material';
import { getAllUsers, User } from '../../users/service/UserService';

export default function UsersTable() {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getAllUsers();
                setUsersData(users);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedUsers = usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            paddingBottom="50px"
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <Paper style={{ width: '80%', maxWidth: '1200px' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Correo Electrónico</TableCell>
                                    <TableCell>Organización</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.user_id}</TableCell>
                                        <TableCell>{user.nombre} {user.apellido}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.organizacion}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={usersData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
        </Box>
    );
}
