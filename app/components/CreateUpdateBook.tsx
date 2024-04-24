import Input from "antd/es/input/Input";
import { BookRequest } from "../services/books";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
    mode: Mode
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate 
}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(1);

    useEffect(() => {
        setTitle(values.title)
        setDescription(values.description)
        setPrice(values.price)
    },[values]);

    const handleOnOk = async () => {
        const bookRequest = {
            title: title, 
            description: description, 
            price: price,
        };

        mode === Mode.Create 
        ? handleCreate(bookRequest)
        : handleUpdate(values.id, bookRequest);
        }
    return (
        <Modal
            title={
                mode === Mode.Create ? "AddBook" : "EditBook"
            } 
            open={isModalOpen}             
            onOk={handleOnOk}
            onCancel={handleCancel}
            cancelText={"Cancel"}
            >
                <div className="book__modal">
                    <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name"
                    />
                    <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoSize={{minRows: 3, maxRows: 3}}
                    placeholder="Description"
                    />
                    <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    />
                </div>
            </Modal>
    )
};