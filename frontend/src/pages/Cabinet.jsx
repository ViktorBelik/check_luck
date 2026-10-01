import Header from "../components/Header";
import emptyReceiptsImage from "../assets/empty-receipts.png";

function Cabinet({ user }) {
    return (
        <>
            <Header user={user} />

            <main className="cabinet-page">
                <div className="container">
                    <header className="page-header">
                        <h1>Личный кабинет</h1>
                    </header>

                    <div className="cabinet-empty">
                        <img
                            src={emptyReceiptsImage}
                            alt=""
                            className="cabinet-empty__image"
                        />

                        <h2 className="cabinet-empty__title">
                            У вас пока нет чеков
                        </h2>

                        <p className="cabinet-empty__description">
                            Зарегистрируйте чек, чтобы принять участие в акции
                        </p>

                        <button type="button"
                            className="cabinet-empty__button"
                            onClick={() => {
                                window.location.href = "/receipts/register/";
                            }}
                        >
                            <RegisterReceiptIcon />
                            <span>Зарегистрировать чек</span>
                        </button>
                    </div>

                </div>
            </main>
        </>
    );
}

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


export default Cabinet;