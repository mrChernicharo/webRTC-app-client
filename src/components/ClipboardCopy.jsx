function ClipboardCopy({ text }) {
    function copyToClipboard(e) {
        navigator.clipboard.writeText(e.target.textContent);
        console.log("link copied!");
    }
    return (
        <span className="text-md text-green-600 bg-black rounded-lg px-4 py-2 cursor-pointer" onClick={copyToClipboard}>
            {text}
        </span>
    );
}

export default ClipboardCopy;
