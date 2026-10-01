function NotificationIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.22647 3.39124C6.88615 3.74456 5.01449 5.67745 4.73307 8.16169L4.44567 10.6987C4.37426 11.3291 4.11876 11.9224 3.71295 12.4C2.85178 13.4137 3.55072 15 4.85849 15H15.1416C16.4494 15 17.1483 13.4137 16.2871 12.4C15.8813 11.9224 15.6258 11.3292 15.5544 10.6987L15.3645 9.02228M12.5 16.6667C12.1361 17.6377 11.1542 18.3333 10 18.3333C8.84585 18.3333 7.86394 17.6377 7.50004 16.6667"
                stroke="#3E4552"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
            <path
                d="M16.6666 4.16667C16.6666 5.54738 15.5473 6.66667 14.1666 6.66667C12.7859 6.66667 11.6666 5.54738 11.6666 4.16667C11.6666 2.78596 12.7859 1.66667 14.1666 1.66667C15.5473 1.66667 16.6666 2.78596 16.6666 4.16667Z"
                fill="#524FE5"
            />
        </svg>
    );
}

function ProfileIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M3.33331 13.3333V12.6667C3.33331 10.8257 4.8257 9.33333 6.66665 9.33333H9.33331C11.1743 9.33333 12.6666 10.8257 12.6666 12.6667V13.3333M10.6666 4.66667C10.6666 6.13943 9.47274 7.33333 7.99998 7.33333C6.52722 7.33333 5.33331 6.13943 5.33331 4.66667C5.33331 3.19391 6.52722 2 7.99998 2C9.47274 2 10.6666 3.19391 10.6666 4.66667Z"
                stroke="#3E4552"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function RulesIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M6.66667 6C6.66667 5.73629 6.74487 5.47851 6.89137 5.25924C7.03788 5.03997 7.24612 4.86908 7.48976 4.76816C7.73339 4.66724 8.00148 4.64084 8.26012 4.69229C8.51876 4.74373 8.75634 4.87072 8.94281 5.05719C9.12928 5.24366 9.25627 5.48124 9.30771 5.73988C9.35916 5.99852 9.33276 6.26661 9.23184 6.51025C9.13092 6.75388 8.96003 6.96212 8.74076 7.10863C8.52149 7.25514 8.26371 7.33333 8 7.33333V8M9.5 12.6667L8.53333 13.9556C8.26667 14.3111 7.73333 14.3111 7.46667 13.9556L6.5 12.6667H4.66667C3.19391 12.6667 2 11.4728 2 10V4.66667C2 3.19391 3.19391 2 4.66667 2H11.3333C12.8061 2 14 3.19391 14 4.66667V10C14 11.4728 12.8061 12.6667 11.3333 12.6667H9.5Z"
                stroke="#3E4552"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="7.99998" cy="10" r="0.666667" fill="#3E4552" />
        </svg>
    );
}

function CabinetIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M8 12V10M6.71331 1.88L2.09331 5.58C1.57331 5.99333 1.23997 6.86667 1.35331 7.52L2.23997 12.8267C2.39997 13.7733 3.30664 14.54 4.26664 14.54H11.7333C12.6866 14.54 13.6 13.7667 13.76 12.8267L14.6466 7.52C14.7533 6.86667 14.42 5.99333 13.9066 5.58L9.28664 1.88667C8.57331 1.31333 7.41997 1.31333 6.71331 1.88Z"
                stroke="#3E4552"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function Header({ user }) {
    return (
        <header className="header">
            <div className="header__logo">ЧЕК НА УДАЧУ</div>

            <nav className="header__nav">
                <a href="#" className="header__back">
                    ←&nbsp; На сайт
                </a>

                <div className="header__links">
                    <a href="#" className="header__active">
                        <CabinetIcon />
                        Личный кабинет
                    </a>

                    <a href="#">
                        <RulesIcon />
                        Правила
                    </a>

                    <a href="#">
                        <ProfileIcon />
                        Профиль
                    </a>
                </div>
            </nav>

            <div className="header__user">
                <button
                    type="button"
                    className="header__notification"
                    aria-label="Уведомления"
                >
                    <NotificationIcon />
                </button>

                <div className="header__avatar">ЕИ</div>

                <div className="header__user-info">
                    <strong>{user?.name}</strong>
                    <span>{user?.email}</span>
                </div>
            </div>
        </header>
    );
}

export default Header;