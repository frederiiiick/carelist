import CloseIcon from "../Icons/CloseIcon";
import "./modalContainer.scss";


type Props = {
    children: string | JSX.Element | JSX.Element[],
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<any>>,
}

const ModalContainer = ({children, modal, setModal} : Props) => {
    return (
        <div className={`modal-container ${modal && 'visible'}`}>
            <div className="children-container">
                <div className="close-modal">
                    <CloseIcon onClick={() => setModal((prev : boolean) => !prev)}/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ModalContainer;