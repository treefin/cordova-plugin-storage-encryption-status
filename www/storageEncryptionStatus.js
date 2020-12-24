const cordova = require("cordova");

const ENCRYPTION_STATUS_FROM_NUMBER = [
    "ENCRYPTION_STATUS_UNSUPPORTED",
    "ENCRYPTION_STATUS_INACTIVE",
    "ENCRYPTION_STATUS_ACTIVATING",
    "ENCRYPTION_STATUS_ACTIVE",
    "ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY",
    "ENCRYPTION_STATUS_ACTIVE_PER_USER",
];

/**
 * All possible values that can be returned by StorageEncryptionStatus.getEncryptionStatus().
 *
 * See [DevicePolicyManager docs](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#getStorageEncryptionStatus())
 * for more information on the meaning of enum values on Android.
 *
 * On iOS, only the values `'ENCRYPTION_STATUS_UNSUPPORTED'`, `'ENCRYPTION_STATUS_INACTIVE'`,
 * and `'ENCRYPTION_STATUS_ACTIVE_PER_USER'` are used.
 *
 * @readonly
 * @enum {string}
 */
const ENCRYPTION_STATUS_VALUES = Object.freeze({
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
    /**
     * All possible values that can be returned by StorageEncryptionStatus.getEncryptionStatus().
     *
     * See [DevicePolicyManager docs](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#getStorageEncryptionStatus())
     * for more information on the meaning of enum values on Android.
     *
     * On iOS, only the values `'ENCRYPTION_STATUS_UNSUPPORTED'`, `'ENCRYPTION_STATUS_INACTIVE'`,
     * and `'ENCRYPTION_STATUS_ACTIVE_PER_USER'` are used.
     */
    statusValues: ENCRYPTION_STATUS_VALUES,

    /**
     * Whether device's storage is encrypted.
     *
     * @returns {Promise.<boolean>} - a Promise that fulfills with the device's encryption status
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
     * Determines the device's detailed encryption status.
     *
     * @returns {Promise.<string>} - a Promise that fulfills with the device's encryption status as one of the
     * constants from the `statusValues` enum
     */
    getEncryptionStatus() {
        return new Promise((resolve, reject) => {
            cordova.exec(
                (result) => {
                    resolve(
                        ENCRYPTION_STATUS_FROM_NUMBER[result.encryptionStatus]
                    );
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
