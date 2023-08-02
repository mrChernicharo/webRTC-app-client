import Header from "../small/Header";

function Layout({ children }) {
    return (
        <div className="layout flex flex-col items-center">
            <Header />

            {children}
        </div>
    );
}

export default Layout;
