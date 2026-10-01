export function parseReceiptQr(value) {
    if (!value.trim()) {
        throw new Error("Введите строку QR-кода.");
    }

    const params = new URLSearchParams(value);

    const purchaseDate = params.get("t");
    const amount = params.get("s");
    const fn = params.get("fn");
    const fd = params.get("i");
    const fp = params.get("fp");

    if (!purchaseDate || !amount || !fn || !fd || !fp) {
        throw new Error(
            "Не удалось найти все необходимые данные в QR-коде."
        );
    }

    return {
        purchase_datetime: parseReceiptDate(purchaseDate),
        amount: normalizeAmount(amount),
        fn,
        fd,
        fp,
    };
}


function parseReceiptDate(value) {
    if (!/^\d{8}T\d{4}$/.test(value)) {
        throw new Error(
            "Некорректная дата в QR-коде."
        );
    }

    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);
    const hour = value.slice(9, 11);
    const minute = value.slice(11, 13);

    return `${year}-${month}-${day}T${hour}:${minute}`;
}


function normalizeAmount(value) {
    const amount = Number(value.replace(",", "."));

    if (!Number.isFinite(amount)) {
        throw new Error(
            "Некорректная сумма в QR-коде."
        );
    }

    return amount.toFixed(2);
}