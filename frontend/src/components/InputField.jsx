function InputField({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    placeholder = "",
}) {
    return (
        <div className="form-field">
            <label htmlFor={name}>
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? "input input-error" : "input"}
            />

            {error && (
                <p className="field-error">
                    {error}
                </p>
            )}
        </div>
    );
}


export default InputField;