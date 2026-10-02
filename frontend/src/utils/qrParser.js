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
    const normalizedValue = value.trim();

    const formats = [
        // 20261015T1200
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/,

        // 20261015T120000
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,

        // 20261015 1200
        /^(\d{4})(\d{2})(\d{2})[ ](\d{2})(\d{2})$/,

        // 20261015 120000
        /^(\d{4})(\d{2})(\d{2})[ ](\d{2})(\d{2})(\d{2})$/,

        // 2026-10-15T12:00
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,

        // 2026-10-15T12:00:00
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,

        // 2026-10-15 12:00
        /^(\d{4})-(\d{2})-(\d{2})[ ](\d{2}):(\d{2})$/,

        // 2026-10-15 12:00:00
        /^(\d{4})-(\d{2})-(\d{2})[ ](\d{2}):(\d{2}):(\d{2})$/,
    ];

    for (const format of formats) {
        const match = normalizedValue.match(format);

        if (!match) {
            continue;
        }

        const [, year, month, day, hour, minute] = match;

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute)
        );

        if (
            date.getFullYear() !== Number(year) ||
            date.getMonth() !== Number(month) - 1 ||
            date.getDate() !== Number(day) ||
            date.getHours() !== Number(hour) ||
            date.getMinutes() !== Number(minute)
        ) {
            throw new Error(
                "Некорректная дата в QR-коде."
            );
        }

        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    throw new Error(
        "Некорректный формат даты в QR-коде."
    );
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