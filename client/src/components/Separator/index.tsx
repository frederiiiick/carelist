type Props = {
    width?: string | number,
    height?: string | number,
}


const Seprator = ({ width='auto', height='auto' }: Props) => {
    return (
        <div style={{ width: width, height: height,}}></div>
    );
}


export default Seprator;