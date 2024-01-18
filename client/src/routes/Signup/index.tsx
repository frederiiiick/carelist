import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Seprator from "../../components/Separator";
import "./signup.scss";
import { inputChange } from "../../Utils/Handlers";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../Graphql/Mutations";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: {
            value: '',
            error: '',
        },
        username: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
        confirm_password: {
            value: '',
            error: '',
        },
    });

    const [createUser] = useMutation(CREATE_USER);

    const onSignup = async({ name, username, password, confirm_password }: {name: string, username: string, password: string, confirm_password: string}) => {
        let isValid: boolean = true;
        if (!name) {
            isValid = false;
            inputChange({ setForm: setForm, key: 'name', value: 'error', data: 'Name cannot be blank' })
        } else {
            inputChange({ setForm: setForm, key: 'name', value: 'error', data: '' })
        }

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

        if (password !== confirm_password) {
            isValid = false;
            inputChange({ setForm: setForm, key: 'confirm_password', value: 'error', data: 'Password does not match' })
        } else {
            inputChange({ setForm: setForm, key: 'confirm_password', value: 'error', data: '' })
        }

        if (isValid) {
            try {
                await createUser({variables: {name: name, username: username, password: password} }).then(async() => {
                    toast.success('You have successfully registered', {
                        position: "top-center",
                    });
                    navigate('/');
                })
            } catch (error) {
                toast.error('Authentication unssuccessful', {
                    position: "top-center",
                });
            }
        }
    }

    const onChangeInput = ({ event, type } : {event: any, type: string}) => {
        const target = event.target as HTMLInputElement;
        inputChange({ setForm: setForm, key: type, value: 'value', data: target.value })
    }
    
    return (
        <div className="signup-container">
            <FormContainer>
                <p className="header">Signup to CareList</p>
                <input type="text" placeholder="Name" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "name"})} />
                <p className="input-error">{form.name.error}</p>
                <Seprator height={10} />
                <input type="text" placeholder="Username" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "username"})} />
                <p className="input-error">{form.username.error}</p>
                <Seprator height={10} />
                <input type="password" placeholder="Password" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "password"})} />
                <p className="input-error">{form.password.error}</p>
                <Seprator height={10} />
                <input type="password" placeholder="Confirm Password" onChange={(event: React.FormEvent<HTMLInputElement>): void => onChangeInput({ event, type: "confirm_password"})} />
                <p className="input-error">{form.confirm_password.error}</p>
                <Seprator height={20} />
                <button  
                    onClick={() => onSignup(
                        { 
                            name: form.name.value, 
                            username: form.username.value, 
                            password: form.password.value, 
                            confirm_password: form.confirm_password.value 
                        }
                    )}
                >
                    Signup
                </button>
                <p className="signup">Already have an account? <Link to={'/'}>Login now</Link></p>
            </FormContainer>
        </div>
    )
}

export default Signup;