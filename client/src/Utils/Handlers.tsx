


type InputChange = {
    setForm: React.Dispatch<React.SetStateAction<any>>,
    key: string | number,
    value:any,
    data: string | number,
}

export const inputChange = ({ setForm, key, value, data }: InputChange) => {
    const values = (prevValue: any) => { return({ ...prevValue, [value]: data }) }

    return setForm((prev:any) : any => ({
        ...prev, 
        [key]: values(prev[key])
    }))
}
