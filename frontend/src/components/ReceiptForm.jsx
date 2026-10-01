import { useState } from "react";

import InputField from "./InputField";
import { parseReceiptQr } from "../utils/qrParser";


const initialForm = {
    fn: "",
    fd: "",
    fp: "",
    purchase_datetime: "",
    amount: "",
};


function ReceiptForm() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [qrValue, setQrValue] = useState("");
    const [qrError, setQrError] = useState("");
    const [message, setMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));

        setMessage("");
    }

    function handleQrChange(event) {
        setQrValue(event.target.value);
        setQrError("");
    }

    function handleQrFill() {
        try {
            const parsed = parseReceiptQr(qrValue);

            setForm(parsed);
            setErrors({});
            setQrError("");
            setMessage("");
        } catch (error) {
            setQrError(error.message);
        }
    }

    function validateForm() {
        const newErrors = {};

        if (!form.fn.trim()) {
            newErrors.fn = "Введите ФН.";
        } else if (!/^\d+$/.test(form.fn)) {
            newErrors.fn = "ФН должен содержать только цифры.";
        }

        if (!form.fd.trim()) {
            newErrors.fd = "Введите ФД.";
        } else if (!/^\d+$/.test(form.fd)) {
            newErrors.fd = "ФД должен содержать только цифры.";
        }

        if (!form.fp.trim()) {
            newErrors.fp = "Введите ФП.";
        } else if (!/^\d+$/.test(form.fp)) {
            newErrors.fp = "ФП должен содержать только цифры.";
        }

        if (!form.purchase_datetime) {
            newErrors.purchase_datetime =
                "Укажите дату и время покупки.";
        }

        if (!form.amount) {
            newErrors.amount = "Введите сумму.";
        } else if (
            Number.isNaN(Number(form.amount)) ||
            Number(form.amount) < 1000
        ) {
            newErrors.amount =
                "Сумма должна быть не менее 1000 ₽.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // POST подключим после того, как окончательно
        // соберём frontend и проверим контракт API.
        setMessage("Форма заполнена корректно.");
    }

    return (
        <form
            className="receipt-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <section className="qr-section">
                <label htmlFor="qr">
                    Вставить строку из QR-кода
                </label>

                <textarea
                    id="qr"
                    value={qrValue}
                    onChange={handleQrChange}
                    placeholder="t=...&s=...&fn=...&i=...&fp=..."
                />

                <button
                    type="button"
                    className="secondary-button"
                    onClick={handleQrFill}
                >
                    Заполнить по QR-коду
                </button>

                {qrError && (
                    <p className="form-error">
                        {qrError}
                    </p>
                )}
            </section>

            <div className="form-grid">
                <InputField
                    label="ФН"
                    name="fn"
                    value={form.fn}
                    onChange={handleChange}
                    error={errors.fn}
                />

                <InputField
                    label="ФД"
                    name="fd"
                    value={form.fd}
                    onChange={handleChange}
                    error={errors.fd}
                />

                <InputField
                    label="ФП"
                    name="fp"
                    value={form.fp}
                    onChange={handleChange}
                    error={errors.fp}
                />

                <InputField
                    label="Дата и время покупки"
                    name="purchase_datetime"
                    type="datetime-local"
                    value={form.purchase_datetime}
                    onChange={handleChange}
                    error={errors.purchase_datetime}
                />

                <InputField
                    label="Сумма покупки"
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    error={errors.amount}
                />
            </div>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            <button
                type="submit"
                className="primary-button"
            >
                Зарегистрировать чек
            </button>
        </form>
    );
}


export default ReceiptForm;