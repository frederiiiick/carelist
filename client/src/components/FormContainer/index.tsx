import "./formContainer.scss";


type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const FormContainer = ({children} : Props) => {
    return (
        <div className="form-container">
            { children }
        </div>
    )
}

export default FormContainer;