import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../Graphql/Mutations";
import { GET_USER_TASKS } from "../../Graphql/Queries";
import { useAppSelector } from "../../Redux/hooks";
import { ITask } from "../../Utils/Interfaces"
import DeleteTaskIcon from "../Icons/DeleteTaskIcon";
import './taskCard.scss';
import { toast } from "react-toastify";


const TaskCard = ({data} : {data: ITask}) => {
    const user = useAppSelector(state => state.auth.user);
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [
            {
                query: GET_USER_TASKS,
                variables:  {userId: user.id},
            },
        ],
        awaitRefetchQueries: true,
    });

    const onDelete = async({ id }: {id: number | undefined}) => {
        if (id) {
            try {
                await deleteTask({variables: { id: id } }).then(async() => {
                    toast.success('Task has been deleted', {
                        position: "top-center",
                    });
                })
            } catch (error) {
                toast.error('Something went wrong', {
                    position: "top-center",
                });
            }
        }
    }

    return (
        <div className='task-card'>
            <div className='card-header'>
                <p>{data.date}</p>
                <DeleteTaskIcon onClick={() => onDelete({id: data.id})} />
            </div>
            <div className='card-body'>
                {data.note}
            </div>
        </div>
    )
}


export default TaskCard;