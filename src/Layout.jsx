import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="layout flex flex-col items-center border">
            <Header />

            {children}
        </div>
    );
}

export default Layout;
