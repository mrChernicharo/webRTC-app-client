import Header from "../small/Header";

function Layout({ children }) {
    return (
        <div className="layout flex flex-col">
            <Header />

            {children}
        </div>
    );
}

export default Layout;
