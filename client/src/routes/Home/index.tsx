import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER_TASKS } from '../../Graphql/Queries';
import { useAppSelector } from '../../Redux/hooks';
import './home.scss';
import { ITask } from '../../Utils/Interfaces';
import TaskCard from '../../components/TaskCard';
import AddTask from '../../components/AddTask';
import { useEffect } from 'react';


const Home = () => {
    const user = useAppSelector(state => state.auth.user);
    // const { data } = useQuery(GET_USER_TASKS, { variables: {userId: user.id}})
    const [getTasks, { data }] = useLazyQuery(GET_USER_TASKS, { fetchPolicy: 'network-only' });

    useEffect(() => {
        getTasks({ variables: {userId: user.id}})
    }, [getTasks, user.id])

    return (
        <div className='home-container'>
            <AddTask getTasks={getTasks} />
            {
                data?.getTaskByUser.map((task: ITask) => {
                    return(
                        <TaskCard data={task} key={task.id} />
                    )
                })
            }
        </div>
    )
}


export default Home;