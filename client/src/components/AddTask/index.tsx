import { useState } from "react";
import FormContainer from "../FormContainer";
import ModalContainer from "../ModalContainer";
import Seprator from "../Separator";
import { inputChange } from "../../Utils/Handlers";
import AddTaskIcon from "../Icons/AddTaskIcon";
import { gql, useMutation } from "@apollo/client";
import { GET_USER_TASKS } from "../../Graphql/Queries";
import { CREATE_TASK } from "../../Graphql/Mutations";
import { useAppSelector } from "../../Redux/hooks";
import { toast } from "react-toastify";
import "./addTask.scss";

const AddTask = ({ getTasks } : any) => {
    const user = useAppSelector(state => state.auth.user);
    const [addModal, setAddModal] = useState(false);
    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [
            {
                query: GET_USER_TASKS,
                variables:  {userId: user.id},
            },
            'getTaskByUser'
        ],
        awaitRefetchQueries: true,
    });

    const [form, setForm] = useState({
        note: {
            value: '',
            error: '',
        },
    });
    
    const onChangeInput = ({ event, type } : {event: any, type: string}) => {
        const target = event.target as HTMLTextAreaElement;
        inputChange({ setForm: setForm, key: type, value: 'value', data: target.value })
    }
    
    const onTaskAdd =  async({ note, userId }: {note: string, userId: number | null}) => {
        if (user.id) {
            const date = new Date();
            const dateString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear()

            let isValid: boolean = true;
            if (!note) {
                isValid = false;
                inputChange({ setForm: setForm, key: 'Note', value: 'error', data: 'Note cannot be blank' })
            } else {
                inputChange({ setForm: setForm, key: 'Note', value: 'error', data: '' })
            }
            if (isValid) {
                try {
                    await createTask({variables: {note: note, userId: userId, date: dateString } }).then(async() => {
                        setAddModal((prev) => !prev);
                        await getTasks({ variables: {userId: user.id}})
                        toast.success('New task has been added', {
                            position: "top-center",
                        });
                    })
                } catch (error) {
                    setAddModal((prev) => !prev);
                    toast.error('Something went wrong', {
                        position: "top-center",
                    });
                }
            }
        }
    }
    return (
        <>
            <ModalContainer modal={addModal} setModal={setAddModal}>
                <FormContainer>
                    <p className="header">New Task</p>
                    <textarea placeholder='Write something. . .' onChange={(event: React.FormEvent<HTMLTextAreaElement>): void => onChangeInput({ event, type: "note"})}></textarea>
                    <Seprator height={20} />
                    <button onClick={() => onTaskAdd({ note: form.note.value, userId: user.id})}>Add Task</button>
                </FormContainer>
            </ModalContainer>
            <div className='add-task' onClick={() => setAddModal((prev) => !prev)}>
                <div className='add-task-icon'>
                    <AddTaskIcon />
                </div>
            </div>
        </>
    )
}


export default AddTask;