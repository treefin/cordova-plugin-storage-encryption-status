package com.treefin.cordova.storageencryptionstatus;

import android.annotation.SuppressLint;
import android.app.admin.DevicePolicyManager;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;

public class StorageEncryptionStatus extends CordovaPlugin {
    private static final String TAG = "StorageEncryptionStatus";
    private static final String ACTION_IS_ENCRYPTED = "isEncrypted";
    private static final String ACTION_GET_ENCRYPTION_STATUS = "getEncryptionStatus";

    private DevicePolicyManager devicePolicyManager;

    @Override
    protected void pluginInitialize() {
        devicePolicyManager =
                (DevicePolicyManager) cordova.getActivity()
                        .getApplication()
                        .getApplicationContext()
                        .getSystemService(Context.DEVICE_POLICY_SERVICE);
    }

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) {
        try {
            JSONObject result = new JSONObject();

            switch (action) {
                case ACTION_IS_ENCRYPTED:
                    result.put("isEncrypted", isEncrypted());
                    break;

                case ACTION_GET_ENCRYPTION_STATUS:
                    result.put("encryptionStatus", getEncryptionStatus().getEncryptionStatusCode());
                    break;

                default:
                    return false;
            }

            callbackContext.success(result);
            return true;
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            callbackContext.error(e.getMessage());
            return false;
        }
    }

    private boolean isEncrypted() {
        final EncryptionStatus encryptionStatus = getEncryptionStatus();

        return encryptionStatus == EncryptionStatus.ENCRYPTION_STATUS_ACTIVE
                || encryptionStatus == EncryptionStatus.ENCRYPTION_STATUS_ACTIVE_PER_USER;
    }

    @SuppressLint("NewApi")
    private EncryptionStatus getEncryptionStatus() {
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.HONEYCOMB) {
            return EncryptionStatus.fromDevicePolicyManagerStatus(devicePolicyManager.getStorageEncryptionStatus());
        }

        return EncryptionStatus.ENCRYPTION_STATUS_UNSUPPORTED;
    }
}
