import { useState } from "react";

import Header from "../components/Header";


function RegisterReceiptIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
    );
}


function SuccessIcon() {
    return (
        <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect
                x="1.25"
                y="1.25"
                width="59.5"
                height="59.5"
                rx="10.75"
                fill="#FCFFFB"
            />
            <rect
                x="1.25"
                y="1.25"
                width="59.5"
                height="59.5"
                rx="10.75"
                fill="none"
                stroke="#37CD1A"
                strokeWidth="2.5"
            />
            <path
                d="M18.6694 32.8348L26.0028 40.1681L44.3361 21.8348"
                stroke="#37CD1A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function ErrorIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M7.99833 14.2733H3.95833C1.64499 14.2733 0.678328 12.62 1.79833 10.6L3.87833 6.85333L5.83833 3.33333C7.02499 1.19333 8.97166 1.19333 10.1583 3.33333L12.1183 6.86L14.1983 10.6067C15.3183 12.6267 14.345 14.28 12.0383 14.28H7.99833V14.2733Z"
                fill="#F04D4D"
                stroke="#F04D4D"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.99609 11.3333H8.00208"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 6V9.33333"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function ErrorNotification({ message, onClose }) {
    return (
        <div className="error-notification">
            <ErrorIcon />

            <span>{message}</span>

            <button
                type="button"
                className="error-notification__close"
                onClick={onClose}
                aria-label="Закрыть"
            >
                ×
            </button>
        </div>
    );
}


function RegisterReceipt({ user }) {
    const [formData, setFormData] = useState({
        fn: "",
        fd: "",
        fp: "",
        purchase_datetime: "",
        amount: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));

        setServerError("");
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.fn.trim()) {
            newErrors.fn = "Введите ФН";
        }

        if (!formData.fd.trim()) {
            newErrors.fd = "Введите ФД";
        }

        if (!formData.fp.trim()) {
            newErrors.fp = "Введите ФП";
        }

        if (!formData.purchase_datetime) {
            newErrors.purchase_datetime = "Укажите дату покупки";
        }

        if (!formData.amount) {
            newErrors.amount = "Введите сумму покупки";
        } else if (Number(formData.amount) < 1000) {
            newErrors.amount = "Сумма покупки должна быть не менее 1000 ₽";
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

        setIsSubmitting(true);
        setErrors({});
        setServerError("");

        const data = new FormData();

        data.append("fn", formData.fn.trim());
        data.append("fd", formData.fd.trim());
        data.append("fp", formData.fp.trim());
        data.append(
            "purchase_datetime",
            formData.purchase_datetime
        );
        data.append("amount", formData.amount);

        const csrfToken = document.querySelector(
            "[name=csrfmiddlewaretoken]"
        )?.value;

        try {
            const response = await fetch("/receipts/register/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
                body: data,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                const backendErrors = {};

                Object.entries(result.errors || {}).forEach(
                    ([field, fieldErrors]) => {
                        if (Array.isArray(fieldErrors)) {
                            backendErrors[field] = fieldErrors
                                .map((error) => error.message)
                                .join(" ");
                        }
                    }
                );

                setErrors(backendErrors);

                const nonFieldError =
                    backendErrors.__all__ ||
                    "Не удалось зарегистрировать чек.";

                setServerError(nonFieldError);

                return;
            }

            setSuccess(true);
        } catch {
            setServerError(
                "Не удалось отправить чек. Попробуйте ещё раз."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (success) {
        return (
            <>
                <Header user={user} />

                <main className="register-page">
                    <section className="register-card">
                        <div className="register-result register-result--success">
                            <div className="register-result__content">
                                <SuccessIcon />

                                <h2>
                                    Ваш чек загружен
                                </h2>

                                <p>
                                    Мы уже начали анализировать ваши покупки.
                                    Это займёт всего парку секунд.
                                </p>

                                <button
                                    type="button"
                                    className="register-result__button"
                                    onClick={() => {
                                        window.location.href =
                                            "/receipts/cabinet/";
                                    }}
                                >
                                    На главную
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }

    return (
        <>
            <Header user={user} />

            <main className="register-page">
                <section className="register-card">
                    <button
                        type="button"
                        className="register-card__close"
                        onClick={() => {
                            window.location.href = "/receipts/cabinet/";
                        }}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>

                    <h1 className="register-card__title">
                        Регистрация чека
                    </h1>

                    <p className="register-card__description">
                        Введите данные чека для участия в акции
                    </p>

                    {serverError && (
                        <ErrorNotification
                            message={serverError}
                            onClose={() => setServerError("")}
                        />
                    )}

                    <form
                        className="receipt-form"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            name="csrfmiddlewaretoken"
                            value={
                                document.querySelector(
                                    "[name=csrfmiddlewaretoken]"
                                )?.value || ""
                            }
                        />

                        <label className="form-field">
                            <span>ФН</span>

                            <input
                                type="text"
                                name="fn"
                                value={formData.fn}
                                onChange={handleChange}
                                placeholder="Введите ФН"
                            />

                            {errors.fn && (
                                <small className="form-field__error">
                                    {errors.fn}
                                </small>
                            )}
                        </label>

                        <label className="form-field">
                            <span>ФД</span>

                            <input
                                type="text"
                                name="fd"
                                value={formData.fd}
                                onChange={handleChange}
                                placeholder="Введите ФД"
                            />

                            {errors.fd && (
                                <small className="form-field__error">
                                    {errors.fd}
                                </small>
                            )}
                        </label>

                        <label className="form-field">
                            <span>ФП</span>

                            <input
                                type="text"
                                name="fp"
                                value={formData.fp}
                                onChange={handleChange}
                                placeholder="Введите ФП"
                            />

                            {errors.fp && (
                                <small className="form-field__error">
                                    {errors.fp}
                                </small>
                            )}
                        </label>

                        <label className="form-field">
                            <span>Дата и время покупки</span>

                            <input
                                type="datetime-local"
                                name="purchase_datetime"
                                value={formData.purchase_datetime}
                                onChange={handleChange}
                            />

                            {errors.purchase_datetime && (
                                <small className="form-field__error">
                                    {errors.purchase_datetime}
                                </small>
                            )}
                        </label>

                        <label className="form-field">
                            <span>Сумма покупки</span>

                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                min="1000"
                                step="0.01"
                            />

                            {errors.amount && (
                                <small className="form-field__error">
                                    {errors.amount}
                                </small>
                            )}
                        </label>

                        <button
                            type="submit"
                            className="register-button"
                            disabled={isSubmitting}
                        >
                            <RegisterReceiptIcon />

                            {isSubmitting
                                ? "Отправка..."
                                : "Загрузить"}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default RegisterReceipt;