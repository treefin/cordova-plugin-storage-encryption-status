const consoleEl = document.getElementById("console");

function log(...args) {
    console.log(...args);

    const argsAsSting = args
        .map((arg) => {
            if (arg instanceof Error) {
                return `{Error: ${arg.message}}`;
            } else if (arg === undefined) {
                return "undefined";
            } else {
                return JSON.stringify(arg);
            }
        })
        .join(" ");

    consoleEl.textContent += `> ${argsAsSting}\n`;
}

document.addEventListener(
    "deviceready",
    () => {
        const StorageEncryptionStatus = window.StorageEncryptionStatus;

        StorageEncryptionStatus.isEncrypted().then((isEncrypted) => {
            log("isEncrypted", isEncrypted);
        });

        StorageEncryptionStatus.getEncryptionStatus().then(
            (encryptionStatus) => {
                log("encryptionStatus", encryptionStatus);
            }
        );
    },
    false
);
