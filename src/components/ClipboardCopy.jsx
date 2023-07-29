function ClipboardCopy({ text }) {
    function copyToClipboard(e) {
        navigator.clipboard.writeText(e.target.textContent);
        console.log("link copied!");
    }
    return (
        <span style={{ color: "dodgerblue", cursor: "pointer" }} onClick={copyToClipboard}>
            {text}
        </span>
    );
}

export default ClipboardCopy;
