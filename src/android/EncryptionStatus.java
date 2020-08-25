package com.treefin.cordova.storageencryptionstatus;

import android.app.admin.DevicePolicyManager;

enum EncryptionStatus {
    ENCRYPTION_STATUS_UNSUPPORTED,
    ENCRYPTION_STATUS_INACTIVE,
    ENCRYPTION_STATUS_ACTIVATING,
    ENCRYPTION_STATUS_ACTIVE,
    ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY,
    ENCRYPTION_STATUS_ACTIVE_PER_USER;

    static EncryptionStatus fromDevicePolicyManagerStatus(final int status) {
        switch (status) {
            case DevicePolicyManager.ENCRYPTION_STATUS_INACTIVE:
                return ENCRYPTION_STATUS_INACTIVE;
            case DevicePolicyManager.ENCRYPTION_STATUS_ACTIVATING:
                return ENCRYPTION_STATUS_ACTIVATING;
            case DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE:
                return ENCRYPTION_STATUS_ACTIVE;
            case DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY:
                return ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY;
            case DevicePolicyManager.ENCRYPTION_STATUS_ACTIVE_PER_USER:
                return ENCRYPTION_STATUS_ACTIVE_PER_USER;
            default:
                return ENCRYPTION_STATUS_UNSUPPORTED;
        }
    }

    int getEncryptionStatusCode() {
        switch (this) {
            case ENCRYPTION_STATUS_INACTIVE:
                return 1;
            case ENCRYPTION_STATUS_ACTIVATING:
                return 2;
            case ENCRYPTION_STATUS_ACTIVE:
                return 3;
            case ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY:
                return 4;
            case ENCRYPTION_STATUS_ACTIVE_PER_USER:
                return 5;
            default:
                return 0;
        }
    }
}
