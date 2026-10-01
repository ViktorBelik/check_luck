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

            <button type="submit" className="register-button">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.3333 5.00002V7.01669C18.3333 8.33335 17.4999 9.16669 16.1832 9.16669H13.3333V3.34169C13.3333 2.41669 14.0916 1.66669 15.0166 1.66669C15.9249 1.67502 16.7583 2.04169 17.3583 2.64169C17.9583 3.25002 18.3333 4.08335 18.3333 5.00002Z"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M1.66675 5.83335V17.5C1.66675 18.1917 2.45006 18.5834 3.00006 18.1667L4.42508 17.1C4.75841 16.85 5.22509 16.8834 5.52509 17.1834L6.9084 18.575C7.2334 18.9 7.76677 18.9 8.09177 18.575L9.49176 17.175C9.78343 16.8834 10.2501 16.85 10.5751 17.1L12.0001 18.1667C12.5501 18.575 13.3334 18.1834 13.3334 17.5V3.33335C13.3334 2.41669 14.0834 1.66669 15.0001 1.66669H5.83341H5.00008C2.50008 1.66669 1.66675 3.15835 1.66675 5.00002V5.83335Z"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 7.5H10"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.625 10.8333H9.375"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <span>Загрузить</span>
            </button>
        </form>
    );
}


export default ReceiptForm;