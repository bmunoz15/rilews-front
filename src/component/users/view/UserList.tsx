import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box } from '@mui/material';

//Datos simulados
const usersData = [
    { fullName: 'Alice Johnson', email: 'alice.johnson@example.com', organization: 'Org A', role: 'Admin' },
    { fullName: 'Bob Smith', email: 'bob.smith@example.com', organization: 'Org B', role: 'User' },
    { fullName: 'Charlie Brown', email: 'charlie.brown@example.com', organization: 'Org C', role: 'User' },
    { fullName: 'David Williams', email: 'david.williams@example.com', organization: 'Org D', role: 'Admin' },
    { fullName: 'Eva Green', email: 'eva.green@example.com', organization: 'Org E', role: 'User' },
    { fullName: 'Frank White', email: 'frank.white@example.com', organization: 'Org F', role: 'Admin' },
    { fullName: 'Grace Black', email: 'grace.black@example.com', organization: 'Org G', role: 'User' },
    { fullName: 'Henry Adams', email: 'henry.adams@example.com', organization: 'Org H', role: 'Admin' },
    { fullName: 'Isabella Clark', email: 'isabella.clark@example.com', organization: 'Org I', role: 'User' },
    { fullName: 'Jack Davis', email: 'jack.davis@example.com', organization: 'Org J', role: 'Admin' },
];

export default function UsersTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
            paddingBottom="50px" // Ajusta según la altura de tu footer
        >
            <Paper style={{ width: '80%', maxWidth: '1200px' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Organization</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                    <TableCell>{user.role}</TableCell>
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
        </Box>
    );
}
