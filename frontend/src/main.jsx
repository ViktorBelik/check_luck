import React from "react";
import { createRoot } from "react-dom/client";

import RegisterReceipt from "./pages/RegisterReceipt";
import Cabinet from "./pages/Cabinet";

import "./styles.css";


const rootElement = document.getElementById("root");

if (rootElement) {
    const page = rootElement.dataset.page;

    const user = {
        name: rootElement.dataset.userName || "",
        email: rootElement.dataset.userEmail || "",
    };

    const emptyReceiptsImage =
        rootElement.dataset.emptyReceiptsImage || "";

    const pages = {
        register: (
            <RegisterReceipt user={user} />
        ),

        cabinet: (
            <Cabinet
                user={user}
                emptyReceiptsImage={emptyReceiptsImage}
            />
        ),
    };

    createRoot(rootElement).render(
        <React.StrictMode>
            {pages[page] || null}
        </React.StrictMode>
    );
}