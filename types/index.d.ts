/**
 * All possible states that can be returned by StorageEncryptionStatus.getEncryptionStatus().
 *
 * See [DevicePolicyManager docs](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#getStorageEncryptionStatus())
 * for more information on the meaning of enum values on Android.
 *
 * On iOS, only the values `'ENCRYPTION_STATUS_UNSUPPORTED'`, `'ENCRYPTION_STATUS_INACTIVE'`,
 * and `'ENCRYPTION_STATUS_ACTIVE_PER_USER'` are used.
 */
interface StorageEncryptionStatusValue {
    /**
     * Indicates that encryption is not supported.
     */
    readonly ENCRYPTION_STATUS_UNSUPPORTED: "ENCRYPTION_STATUS_UNSUPPORTED";
    /**
     * Indicates that encryption is supported, but is not currently active.
     */
    readonly ENCRYPTION_STATUS_INACTIVE: "ENCRYPTION_STATUS_INACTIVE";
    /**
     * Indicates that encryption is not currently active, but is currently being activated.
     */
    readonly ENCRYPTION_STATUS_ACTIVATING: "ENCRYPTION_STATUS_ACTIVATING";
    /**
     * Indicates that encryption is active.
     */
    readonly ENCRYPTION_STATUS_ACTIVE: "ENCRYPTION_STATUS_ACTIVE";
    /**
     * Indicates that encryption is active, but an encryption key has not been set by the user.
     */
    readonly ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY: "ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY";
    /**
     * Indicates that encryption is active and the encryption key is tied to the user or profile.
     */
    readonly ENCRYPTION_STATUS_ACTIVE_PER_USER: "ENCRYPTION_STATUS_ACTIVE_PER_USER";
}

interface StorageEncryptionStatus {
    /**
     * All possible states that can be returned by StorageEncryptionStatus.getEncryptionStatus().
     *
     * See [DevicePolicyManager docs](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#getStorageEncryptionStatus())
     * for more information on the meaning of enum values on Android.
     *
     * On iOS, only the values `'ENCRYPTION_STATUS_UNSUPPORTED'`, `'ENCRYPTION_STATUS_INACTIVE'`,
     * and `'ENCRYPTION_STATUS_ACTIVE_PER_USER'` are used.
     */
    readonly statusValues: StorageEncryptionStatusValue;

    /**
     * Whether device's storage is encrypted.
     *
     * @returns a `Promise` that fulfills with the device's encryption status
     *
     * @example
     * cordova.plugins.storageEncryptionStatus.isEncrypted().then((isEncrypted) => {
     *    console.log(`isEncrypted: ${isEncrypted}`);
     *    // => isEncrypted: true
     * });
     */
    isEncrypted(): Promise<boolean>;

    /**
     * Gets the device's detailed encryption status.
     *
     * @returns a `Promise` that fulfills with the device's encryption status as one of the
     * constants from the `statusValues` enum
     *
     * @example
     * cordova.plugins.storageEncryptionStatus.getEncryptionStatus().then((encryptionStatus) => {
     *     console.log(`encryptionStatus: ${encryptionStatus}`);
     *     // => encryptionStatus: ENCRYPTION_STATUS_ACTIVE_PER_USER
     * });
     */
    getEncryptionStatus(): Promise<
        StorageEncryptionStatusValue[keyof StorageEncryptionStatusValue]
    >;
}

interface CordovaPlugins {
    storageEncryptionStatus: StorageEncryptionStatus;
}
