document.addEventListener(
    "deviceready",
    () => {
        const storageEncryptionStatus = cordova.plugins.storageEncryptionStatus;

        storageEncryptionStatus.isEncrypted().then((isEncrypted) => {
            log("isEncrypted", isEncrypted);
        });

        storageEncryptionStatus
            .getEncryptionStatus()
            .then((encryptionStatus) =>
                log("encryptionStatus", encryptionStatus)
            );
    },
    false
);

const consoleEl = document.getElementById("console");

function log(...args) {
    console.log(...args);

    const argsAsSting = args
        .map((arg) => {
            if (arg instanceof Error) {
                return `Error: ${arg.message}`;
            } else {
                return String(JSON.stringify(arg));
            }
        })
        .join(" ");

    consoleEl.textContent += `> ${argsAsSting}\n`;
}
