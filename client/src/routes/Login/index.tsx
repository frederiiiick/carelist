import { Link } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Seprator from "../../components/Separator";
import "./login.scss";
import { inputChange } from "../../Utils/Handlers";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../Graphql/Mutations";
import { useState } from "react";
import { toast } from "react-toastify";
import actions from "../../Redux/Actions";
import { useAppDispatch } from "../../Redux/hooks";

const Login = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({
        username: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
    });

    const [getLoginUser] = useMutation(USER_LOGIN);

    const onChangeInput = ({ event, type } : {event: any, type: string}) => {
        const target = event.target as HTMLInputElement;
        inputChange({ setForm: setForm, key: type, value: 'value', data: target.value })
    }

    const onLogin = async({ username, password }: {username: string, password: string}) => {
        let isValid: boolean = true;
        if (!username) {
            isValid = false;
            inputChange({ setForm: setForm, key: 'username', value: 'error', data: 'Username cannot be blank' })
        } else {
            inputChange({ setForm: setForm, key: 'username', value: 'error', data: '' })
        }

        if (!password) {
            isValid = false;
            inputChange({ setForm: setForm, key: 'password', value: 'error', data: 'Password cannot be blank' })
        } else {
            inputChange({ setForm: setForm, key: 'password', value: 'error', data: '' })
        }
        
        if (isValid) {
            try {
                await getLoginUser({variables: {username: username, password: password} }).then(async(res) => {
                    const payload =  res.data.userLogin;
                    await dispatch(actions.auth.login(payload));
                    toast.success(`Welcome back ${payload.name}!`, {
                        position: "top-center",
                    });
                })
            } catch (error) {
                toast.error('Authentication unssuccessful', {
                    position: "top-center",
                });
            }
        }
    }
    
    return (
        <div className="login-container">
            <FormContainer>
                <p className="header">Welcome to CareList</p>
                <input type="text" placeholder="Username" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "username"})} />
                <p className="input-error">{form.username.error}</p>
                <Seprator height={10} />
                <input type="password" placeholder="Password" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "password"})} />
                <p className="input-error">{form.password.error}</p>
                <Seprator height={20} />
                <button onClick={() => onLogin({ username: form.username.value, password: form.password.value })}>Login</button>
                <p className="signup">Not yet registered? <Link to={'/signup'}>Signup now</Link></p>
            </FormContainer>
        </div>
    )
}

export default Login;