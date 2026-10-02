import { useEffect, useState } from "react";

import Header from "../components/Header";
import emptyReceiptsImage from "../assets/empty-receipts.png";


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


function StatusBadge({ status }) {
    const statusClasses = {
        pending: "status-badge status-badge--pending",
        accepted: "status-badge status-badge--accepted",
        rejected: "status-badge status-badge--rejected",
    };

    return (
        <span className={statusClasses[status] || "status-badge"}>
            {status === "pending" && "На проверке"}
            {status === "accepted" && "Принят"}
            {status === "rejected" && "Отклонен"}
        </span>
    );
}


function Cabinet({ user }) {
    const [receipts, setReceipts] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        total: 0,
        has_next: false,
        has_previous: false,
    });
    const [sortField, setSortField] = useState("purchase_date");
    const [sortDirection, setSortDirection] = useState("desc");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadReceipts(page = 1) {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(
                `/api/receipts/?page=${page}&sort=${sortField}&order=${sortDirection}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Не удалось загрузить чеки."
                );
            }

            const data = await response.json();

            setReceipts(data.results || []);

            setPagination(
                data.pagination || {
                    page: 1,
                    pages: 1,
                    total: 0,
                    has_next: false,
                    has_previous: false,
                }
            );
        } catch {
            setError(
                "Не удалось загрузить историю чеков. Попробуйте обновить страницу."
            );
        } finally {
            setIsLoading(false);
        }
    }

    function handleSort(field) {
        if (sortField === field) {
            setSortDirection((currentDirection) =>
                currentDirection === "asc" ? "desc" : "asc"
            );
            return;
        }

        setSortField(field);
        setSortDirection("asc");
    }

    useEffect(() => {
        loadReceipts(1);
    }, [sortField, sortDirection]);

    function handleRegisterReceipt() {
        window.location.href = "/receipts/register/";
    }

    function handlePageChange(page) {
        if (page < 1 || page > pagination.pages) {
            return;
        }

        loadReceipts(page);
    }

    return (
        <>
            <Header user={user} />

            <main className="cabinet-page">
                <div className="cabinet-container">
                    <div className="cabinet-header">
                        <div>
                            <h1 className="cabinet-title">
                                История чеков
                            </h1>
                        </div>

                        <div className="cabinet-count">
                            Чеков внесено: <strong>{pagination.total} шт.</strong>
                        </div>

                    </div>

                    {isLoading && (
                        <div className="cabinet-state">
                            Загрузка чеков...
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="cabinet-error">
                            {error}
                        </div>
                    )}

                    {!isLoading &&
                        !error &&
                        receipts.length === 0 && (
                            <div className="cabinet-empty">
                                {emptyReceiptsImage && (
                                    <img
                                        src={emptyReceiptsImage}
                                        alt=""
                                        className="cabinet-empty__image"
                                    />
                                )}

                                <h2 className="cabinet-empty__title">
                                    У вас пока нет чеков
                                </h2>

                                <p className="cabinet-empty__description">
                                    Зарегистрируйте чек, чтобы
                                    принять участие в акции
                                </p>

                                <button
                                    type="button"
                                    className="cabinet-empty__button"
                                    onClick={handleRegisterReceipt}
                                >
                                    <RegisterReceiptIcon />

                                    <span>
                                        Зарегистрировать чек
                                    </span>
                                </button>
                            </div>
                        )}

                    {!isLoading &&
                        !error &&
                        receipts.length > 0 && (
                            <>
                                <div className="receipts-table">
                                    <div className="receipts-table__header">
                                        <button
                                            type="button"
                                            className="receipts-table__sort"
                                            onClick={() => handleSort("purchase_date")}
                                        >
                                            <span>Дата покупки</span>
                                            <span className="receipts-table__sort-icon">
                                                {sortField === "purchase_date"
                                                    ? sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"
                                                    : "↕"}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="receipts-table__sort"
                                            onClick={() => handleSort("status")}
                                        >
                                            <span>Статус</span>
                                            <span className="receipts-table__sort-icon">
                                                {sortField === "status"
                                                    ? sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"
                                                    : "↕"}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="receipts-table__sort"
                                            onClick={() => handleSort("amount")}
                                        >
                                            <span>Сумма чека</span>
                                            <span className="receipts-table__sort-icon">
                                                {sortField === "amount"
                                                    ? sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"
                                                    : "↕"}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="receipts-table__sort"
                                            onClick={() => handleSort("registration_date")}
                                        >
                                            <span>Дата регистрации</span>
                                            <span className="receipts-table__sort-icon">
                                                {sortField === "registration_date"
                                                    ? sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"
                                                    : "↕"}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className="receipts-table__sort"
                                            onClick={() => handleSort("information")}
                                        >
                                            <span>Информация</span>
                                            <span className="receipts-table__sort-icon">
                                                {sortField === "information"
                                                    ? sortDirection === "asc"
                                                        ? "↑"
                                                        : "↓"
                                                    : "↕"}
                                            </span>
                                        </button>
                                    </div>

                                    {receipts.map((receipt) => (
                                        <div
                                            key={receipt.id}
                                            className="receipts-table__row"
                                        >
                                            <div className="receipts-table__cell receipts-table__purchase">
                                                <div className="receipt-qr">
                                                    QR
                                                </div>

                                                <div>
                                                    <strong>
                                                        {receipt.purchase_date}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="receipts-table__cell">
                                                <StatusBadge
                                                    status={receipt.status}
                                                />
                                            </div>

                                            <div className="receipts-table__cell receipts-table__amount">
                                                {receipt.amount} ₽
                                            </div>

                                            <div className="receipts-table__cell receipts-table__date">
                                                {receipt.registration_date}
                                            </div>

                                            <div className="receipts-table__cell receipts-table__information">
                                                {receipt.status === "pending" && (
                                                    <span>
                                                        Чек находится на проверке
                                                    </span>
                                                )}

                                                {receipt.status === "accepted" && (
                                                    <span>
                                                        Чек принят
                                                    </span>
                                                )}

                                                {receipt.status === "rejected" && (
                                                    <span>
                                                        {receipt.rejection_reason ||
                                                            "Чек отклонён"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {pagination.pages > 1 && (
                                    <div className="pagination">
                                        <button
                                            type="button"
                                            className="pagination__button"
                                            disabled={
                                                !pagination.has_previous
                                            }
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.page - 1
                                                )
                                            }
                                        >
                                            ←
                                        </button>

                                        {Array.from(
                                            {
                                                length: pagination.pages,
                                            },
                                            (_, index) => index + 1
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                className={
                                                    page ===
                                                        pagination.page
                                                        ? "pagination__button pagination__button--active"
                                                        : "pagination__button"
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        page
                                                    )
                                                }
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            type="button"
                                            className="pagination__button"
                                            disabled={
                                                !pagination.has_next
                                            }
                                            onClick={() =>
                                                handlePageChange(
                                                    pagination.page + 1
                                                )
                                            }
                                        >
                                            →
                                        </button>
                                    </div>
                                )}

                                <div className="cabinet-footer">
                                    <div className="cabinet-info">
                                        <span className="cabinet-info__icon">
                                            ⓘ
                                        </span>

                                        <span>
                                            Иногда проверка вашего чека может занять до 5 рабочих дней
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="cabinet-footer__button"
                                        onClick={handleRegisterReceipt}
                                    >
                                        <RegisterReceiptIcon />

                                        <span>
                                            Зарегистрировать чек
                                        </span>
                                    </button>
                                </div>
                            </>
                        )}
                </div>
            </main>
        </>
    );
}

export default Cabinet;