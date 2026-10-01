import ReceiptForm from "../components/ReceiptForm";


function RegisterReceipt() {
    const root = document.getElementById("root");

    const promoStart = root?.dataset.promoStart;
    const promoEnd = root?.dataset.promoEnd;

    return (
        <main className="page">
            <div className="container">
                <header className="page-header">
                    <h1>Регистрация чека</h1>

                    <p className="promo-period">
                        Период акции:{" "}
                        {formatDate(promoStart)} —{" "}
                        {formatDate(promoEnd)}
                    </p>
                </header>

                <ReceiptForm />
            </div>
        </main>
    );
}


function formatDate(value) {
    if (!value) {
        return "";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(value));
}


export default RegisterReceipt;
