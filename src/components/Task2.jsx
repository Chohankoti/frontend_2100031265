import React, { useState } from 'react';
import { empdata } from './Employee';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

export default function Task2() {
    const [emp, setEmp] = useState(empdata);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const tableHeaders = Object.keys(emp[0] || {});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = emp
        .filter(employee => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortConfig.key) {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
            }
            return 0;
        })
        .slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const DeleteEmployee = (id) => {
        const newEmp = emp.filter(employee => employee.id !== id);
        setEmp(newEmp);
    }

    const ResetData = () => {
        setEmp(empdata);
        setSearchTerm('');
        setSortConfig({ key: null, direction: 'asc' });
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }

    return (
        <Container>
            <div className="w-3/4 mx-auto" style={{ marginTop: '25px' }}>
                <div style={{ margin: '5px' }}>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control mb-3"
                    />
                    <Button variant="secondary" onClick={ResetData}>Reset Data</Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {tableHeaders.map(header => (
                                <th key={header} onClick={() => handleSort(header)} style={{ cursor: 'pointer' }}>
                                    {sortConfig.key === header ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null} {header}
                                </th>
                            ))}
                            {tableHeaders.length > 0 ? <th>Action</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(employee => (
                            <tr key={employee.id}>
                                {tableHeaders.map(header => (
                                    <td key={header}>
                                        {header === 'id' ? (<button>{employee[header]}</button>) : (employee[header])}
                                    </td>
                                ))}
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => DeleteEmployee(employee.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {Array.from({ length: Math.ceil(emp.length / itemsPerPage) }).map((_, index) => (
                        <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </Container>
    );
}
