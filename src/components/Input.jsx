
export default function Input({ id, label, value, onSelect }) {
    return (
        <div className="input-group" >
            <label>{label}</label>
            <input 
                type="text"
                id={id}
                defaultValue={value}
                onChange={onSelect}
            />
        </div>
    );
}
