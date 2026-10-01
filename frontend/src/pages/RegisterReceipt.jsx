import { useState } from "react";
import Header from "../components/Header";


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


function RegisterReceipt({ user }) {
    const [success, setSuccess] = useState(false);
    return (
        <>
            <Header user={user} />

            <main className="register-page">
                <section className="register-card">
                    {success ? (
                        <div className="register-result register-result--success">
                            <SuccessIcon />

                            <div className="register-result__content">
                                <h2>Чек успешно зарегистрирован</h2>

                                <p>
                                    Ваш чек отправлен на проверку.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = "/cabinet/";
                                    }}
                                >
                                    Перейти в личный кабинет
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form className="receipt-form">
                            <button
                                type="button"
                                className="register-card__close"
                                aria-label="Закрыть"
                            >
                                ×
                            </button>

                            <h1 className="register-card__title">
                                Регистрация чека
                            </h1>

                            <p className="register-card__description">
                                Введите необходимые данные с чека
                            </p>
                            <label className="form-field">
                                <span>ФН</span>

                                <input
                                    type="text"
                                    name="fn"
                                    placeholder="Введите номер ФН"
                                />
                            </label>

                            <label className="form-field">
                                <span>ФД</span>

                                <input
                                    type="text"
                                    name="fd"
                                    placeholder="Введите номер ФД"
                                />
                            </label>

                            <label className="form-field">
                                <span>ФП</span>

                                <input
                                    type="text"
                                    name="fp"
                                    placeholder="Введите номер ФП"
                                />
                            </label>

                            <label className="form-field">
                                <span>Дата покупки</span>

                                <div className="datetime-field">
                                    <input
                                        type="date"
                                        name="purchase_date"
                                        aria-label="Дата покупки"
                                    />

                                    <span className="datetime-field__divider">|</span>

                                    <input
                                        type="time"
                                        name="purchase_time"
                                        aria-label="Время покупки"
                                    />
                                </div>
                            </label>

                            <label className="form-field">
                                <span>Сумма</span>

                                <input
                                    type="number"
                                    name="amount"
                                    min="1000"
                                    step="0.01"
                                    placeholder="0.00 ₽"
                                />
                            </label>

                            <button
                                type="submit"
                                className="register-button"
                            >
                                Загрузить
                            </button>
                        </form>
                    )}
                </section>
            </main>
        </>
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

export default RegisterReceipt;