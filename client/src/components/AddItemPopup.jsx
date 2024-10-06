/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalContent, ModalFooter, ModalBody, Button, Input, Textarea, Card, CardBody } from "@nextui-org/react";
import { Upload } from 'lucide-react';

const AddItemPopup = ({ isOpen, onClose, onAddItem }) => {
    const [newItem, setNewItem] = useState({ name: '', price: '', age: '', description: '', image: null });
    const [modalPlacement, setModalPlacement] = React.useState("auto");

    const handleItemChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewItem({ ...newItem, image: files[0] });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleSubmit = () => {
        onAddItem(newItem);
        setNewItem({ name: '', price: '', age: '', description: '', image: null });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            size='sm'
            backdrop="blur"
            value={modalPlacement}
            onValueChange={setModalPlacement}
        >
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-2xl font-bold">Add New Item</h2>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <Card className="mb-6">
                            <CardBody className="overflow-visible py-2">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    {newItem.image ? (
                                        <img src={URL.createObjectURL(newItem.image)} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    )}
                                    <input type="file" name="image" accept="image/*" onChange={handleItemChange} className="hidden" />
                                </label>
                            </CardBody>
                        </Card>
                        <div className="space-y-4">
                            <Input
                                name="name"
                                value={newItem.name}
                                onChange={handleItemChange}
                                label="Item Name"
                                variant="bordered"
                                isRequired
                            />
                            <Input
                                type="number"
                                name="price"
                                value={newItem.price}
                                onChange={handleItemChange}
                                label="Price"
                                variant="bordered"
                                isRequired
                            />
                            <Input
                                type="number"
                                name="age"
                                value={newItem.age}
                                onChange={handleItemChange}
                                label="Age"
                                variant="bordered"
                                isRequired
                            />
                            <Textarea
                                name="description"
                                value={newItem.description}
                                onChange={handleItemChange}
                                label="Description"
                                variant="bordered"
                                isRequired
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Add Item
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    );
};

export default AddItemPopup;