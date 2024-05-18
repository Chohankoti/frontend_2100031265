import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Task1() {
    const [fields, setFields] = useState([]);
    const [isShow, setShow] = useState(false);
    const [newField, setNewField] = useState({ type: 'text', label: '', options: [], placeholder: '', name: '' });


    const AddField = () => {
        setFields([...fields, newField]);
        setNewField({ type: 'text', label: '', options: [], placeholder: '', name: '' });
        setShow(false);
    };

    const RemoveField = (name) => {
        const updatedfileds = fields.filter(f => f.name !== name)
        setFields(updatedfileds)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewField((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOptionsChange = (e, index) => {
        const { value } = e.target;
        const updatedOptions = [...newField.options];
        updatedOptions[index] = value;
        setNewField((prevData) => ({
            ...prevData,
            options: updatedOptions
        }));
    };

    const addOption = () => {
        setNewField((prevData) => ({
            ...prevData,
            options: [...prevData.options, '']
        }));
    };

    const removeOption = (index) => {
        const updatedOptions = [...newField.options];
        updatedOptions.splice(index, 1);
        setNewField((prevData) => ({
            ...prevData,
            options: updatedOptions
        }));
    };

    return (
        <div className='flex flex-col items-center mt-2 h-screen w-screen'>
            <div className='mb-4'>
                <Button variant="success" className='mr-3' onClick={() => setShow(!isShow)}>Add</Button>
                <Button variant="secondary" className='mr-3' onClick={() => setFields([])}>Reset Data</Button>
            </div>

            {isShow ? (
                <div className='flex flex-col mb-4'>
                    <label className='mb-2'>Type:</label>
                    <select
                        name="type"
                        value={newField.type}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full mb-2"
                    >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="number">Number</option>
                        <option value="radio">Radio</option>
                    </select>

                    <label className='mb-2'>Label:</label>
                    <input
                        name="label"
                        placeholder="Please enter label"
                        value={newField.label}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full mb-2"
                    />

                    {newField.type === 'radio' && (
                        <div className='flex flex-col mb-2'>
                            <label className='mb-2'>Options:</label>
                            {newField.options.map((option, index) => (
                                <div key={index} className='flex items-center mb-2'>
                                    <input
                                        name="option"
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionsChange(e, index)}
                                        className="border rounded p-2 w-full mr-2"
                                    />
                                    <button type="button" onClick={() => removeOption(index)} className='bg-red-500 text-white px-3 py-1 rounded'>Remove</button>
                                </div>
                            ))}
                            <Button variant="primary" onClick={addOption}>Add Option</Button>
                        </div>
                    )}

                    <label className='mb-2'>Placeholder:</label>
                    <input
                        name="placeholder"
                        placeholder="Please enter placeholder"
                        value={newField.placeholder}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full mb-2"
                    />

                    <label className='mb-2'>Name:</label>
                    <input
                        name="name"
                        placeholder="Please enter name"
                        value={newField.name}
                        onChange={handleInputChange}
                        className="border rounded p-2 w-full mb-2"
                    />

                    <Button variant="primary" onClick={AddField}>Save Field</Button>
                </div>
            ) : (
                <div className='w-[30%]'>
                    {fields.length > 0 && (
                        <Form noValidate className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
                            {fields.map((field, index) => (
                                <Row key={index}>
                                    <Col md={12} className="mb-4">
                                        <div className='flex flex-col'>
                                            <Form.Group>
                                                <Form.Label>{field.label}</Form.Label>
                                                {field.type === 'radio' ? (
                                                    <div className='flex flex-wrap'>
                                                        {field.options.map((option, i) => (
                                                            <Form.Check
                                                                key={i}
                                                                type="radio"
                                                                label={option}
                                                                name={field.name}
                                                                className="mr-3 mb-2"
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Form.Control
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        name={field.name}
                                                        className="form-control mb-2"
                                                        style={{ width: `${field.label.length * 30}px` }}
                                                    />
                                                )}
                                                <Form.Control.Feedback type="invalid">
                                                    {`Please provide a valid ${field.label.toLowerCase()}.`}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button variant="danger" size="sm" onClick={() => RemoveField(field.name)}>Remove</Button>
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                            <div className="text-center mt-4">
                                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700">
                                    Submit form
                                </Button>
                            </div>
                        </Form>
                    )}
                </div>
            )}
        </div>
    );
}
