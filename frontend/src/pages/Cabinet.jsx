function Cabinet() {
    return (
        <main className="page">
            <div className="container">
                <header className="page-header">
                    <h1>Личный кабинет</h1>
                </header>

                <div className="cabinet">
                    <p>Здесь будут зарегистрированные чеки.</p>

                    <a
                        href="/receipts/register/"
                        className="primary-button"
                    >
                        Зарегистрировать чек
                    </a>
                </div>
            </div>
        </main>
    );
}


export default Cabinet;