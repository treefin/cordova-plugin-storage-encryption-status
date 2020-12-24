# Cordova plugin to determine the encryption status of device's storage

[![NPM version][npm-version]][npm-url] [![NPM downloads][npm-downloads]][npm-url]

## Index

<!-- MarkdownTOC levels="2" autolink="true" -->

-   [Supported Platforms](#supported-platforms)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [Tested Devices](#tested-devices)

<!-- /MarkdownTOC -->

## Supported Platforms

-   iOS
-   Android

## Installation

```bash
$ cordova plugin add cordova-plugin-storage-encryption-status
```

## Usage

```js
const storageEncryptionStatus = cordova.plugins.storageEncryptionStatus;

storageEncryptionStatus.isEncrypted().then((isEncrypted) => {
    console.log(`isEncrypted: ${isEncrypted}`);
    // => isEncrypted: true
});

storageEncryptionStatus.getEncryptionStatus().then((encryptionStatus) => {
    console.log(`encryptionStatus: ${encryptionStatus}`);
    // => encryptionStatus: ENCRYPTION_STATUS_ACTIVE_PER_USER
});
```

You can find a working example in the `example/` directory of this project. To build it,
run `npm test`. A working project will be generated in `/tmp/cordova-plugin-storage-encryption-status`.
From there, you can start the example app via `cordova run android` or `cordova run ios`.

## API

### storageEncryptionStatus.isEncrypted()

Whether device's storage is encrypted. Returns a `Promise` that fulfills with the device's encryption status as a `boolean`.

### storageEncryptionStatus.getEncryptionStatus()

Determines the device's detailed encryption status. Returns a `Promise` that fulfills with the device's encryption status as one the encryption status enum values (see [`storageEncryptionStatus.statusValues`](#storageEncryptionStatusstatusValues)).

### storageEncryptionStatus.statusValues

An a lookup hashmap (as a plain JS `object`) for all the possible values that can be returned by `StorageEncryptionStatus.getEncryptionStatus()`.

See [DevicePolicyManager docs](<https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#getStorageEncryptionStatus()>) for more information on the meaning of enum values on Android.

On iOS, only the values `'ENCRYPTION_STATUS_UNSUPPORTED'`, `'ENCRYPTION_STATUS_INACTIVE'`, and `'ENCRYPTION_STATUS_ACTIVE_PER_USER'` are used.

#### ENCRYPTION_STATUS_UNSUPPORTED: "ENCRYPTION_STATUS_UNSUPPORTED"

Indicates that encryption is not supported.

#### ENCRYPTION_STATUS_INACTIVE: "ENCRYPTION_STATUS_INACTIVE"

Indicates that encryption is supported, but is not currently active.

#### ENCRYPTION_STATUS_ACTIVATING: "ENCRYPTION_STATUS_ACTIVATING"

Indicates that encryption is not currently active, but is currently being activated.

#### ENCRYPTION_STATUS_ACTIVE: "ENCRYPTION_STATUS_ACTIVE"

Indicates that encryption is active.

#### ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY: "ENCRYPTION_STATUS_ACTIVE_DEFAULT_KEY"

Indicates that encryption is active, but an encryption key has not been set by the user.

#### ENCRYPTION_STATUS_ACTIVE_PER_USER: "ENCRYPTION_STATUS_ACTIVE_PER_USER"

Indicates that encryption is active and the encryption key is tied to the user or profile.

## Tested Devices

-   Nexus 5 (Android 6, 7, 8)
-   Moto G7 Plus (Android 10)
-   Huawei P20 lite (Android 8)
-   Sony Xperia Z1 (Android 5.1)
-   iPhone X (iOS 13.3.1, iOS 13.6.1)
-   iPhone 6 (iOS 12.4.2)

[npm-url]: https://www.npmjs.com/package/cordova-plugin-storage-encryption-status
[npm-version]: https://img.shields.io/npm/v/cordova-plugin-storage-encryption-status.svg
[npm-downloads]: https://img.shields.io/npm/dm/cordova-plugin-storage-encryption-status.svg
