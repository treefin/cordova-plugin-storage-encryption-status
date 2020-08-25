const cordova = require("cordova");

const ENCRYPTION_STATUS_REVERSE = {
    0: "ENCRYPTION_STATUS_UNSUPPORTED",
    1: "ENCRYPTION_STATUS_INACTIVE",
    2: "ENCRYPTION_STATUS_ACTIVATING",
    3: "ENCRYPTION_STATUS_ACTIVE",
    4: "ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY",
    5: "ENCRYPTION_STATUS_ACTIVE_PER_USER",
};

/**
 * Enum for all possible encryption status values.
 *
 * @readonly
 * @enum {string}
 */
const ENCRYPTION_STATUS = Object.freeze({
    /**
     * Indicates that encryption is not supported.
     */
    ENCRYPTION_STATUS_UNSUPPORTED: "ENCRYPTION_STATUS_UNSUPPORTED",
    /**
     * Indicates that encryption is supported, but is not currently active.
     */
    ENCRYPTION_STATUS_INACTIVE: "ENCRYPTION_STATUS_INACTIVE",
    /**
     * Indicates that encryption is not currently active, but is currently being activated.
     */
    ENCRYPTION_STATUS_ACTIVATING: "ENCRYPTION_STATUS_ACTIVATING",
    /**
     * Indicates that encryption is active.
     */
    ENCRYPTION_STATUS_ACTIVE: "ENCRYPTION_STATUS_ACTIVE",
    /**
     * Indicates that encryption is active, but an encryption key has not been set by the user.
     */
    ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY:
        "ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY",
    /**
     * Indicates that encryption is active and the encryption key is tied to the user or profile.
     */
    ENCRYPTION_STATUS_ACTIVE_PER_USER: "ENCRYPTION_STATUS_ACTIVE_PER_USER",
});

const storageEncryptionStatus = {
    states: ENCRYPTION_STATUS,

    /**
     * Determines the device's encryption status as a boolean.
     *
     * @returns {Promise.<boolean>} - the device's encryption status as a boolean
     */
    isEncrypted() {
        return new Promise((resolve, reject) => {
            cordova.exec(
                (result) => {
                    resolve(result.isEncrypted);
                },
                reject,
                "StorageEncryptionStatus",
                "isEncrypted",
                []
            );
        });
    },

    /**
     * Determines device's encryption status as one the encryption status enum values.
     * Note: not all platforms will use all provided enum constants.
     *
     * @returns {Promise.<string>} - the device's encryption status as a constant value
     */
    getEncryptionStatus() {
        return new Promise((resolve, reject) => {
            cordova.exec(
                (result) => {
                    resolve(ENCRYPTION_STATUS_REVERSE[result.encryptionStatus]);
                },
                reject,
                "StorageEncryptionStatus",
                "getEncryptionStatus",
                []
            );
        });
    },
};

module.exports = storageEncryptionStatus;
