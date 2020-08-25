#import "StorageEncryptionStatus.h"

#ifndef __IPHONE_8_0
void* kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly = NULL;
#endif

@implementation StorageEncryptionStatus

- (void)isEncrypted:(CDVInvokedUrlCommand *)command {
    CDVPluginResult* pluginResult = nil;
    
    EncryptionStatus encryptionStatus = [self determineEncryptionStatus];
    
    switch (encryptionStatus) {
        case EncryptionStatusUnsupported:
            pluginResult = [self makeIsEncryptedResult:NO];
            break;
        
        case EncryptionStatusInactive:
            pluginResult = [self makeIsEncryptedResult:NO];
            break;
            
        case EncryptionStatusActivePerUser:
            pluginResult = [self makeIsEncryptedResult:YES];
            break;
            
        default:
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getEncryptionStatus:(CDVInvokedUrlCommand *)command {
    EncryptionStatus encryptionStatus = [self determineEncryptionStatus];
    NSDictionary *resultData = @{@"encryptionStatus": [NSNumber numberWithInteger:encryptionStatus]};
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultData];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (EncryptionStatus)determineEncryptionStatus {
    BOOL isAPIAvailable = (kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly != NULL);
    
    // Not available prior to iOS 8 - safe to return false rather than throwing exception
    if (isAPIAvailable) {
        
        // From http://pastebin.com/T9YwEjnL
        NSData* secret = [@"Device has passcode set?" dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary *attributes = @{
            (__bridge id)kSecClass: (__bridge id)kSecClassGenericPassword,
            (__bridge id)kSecAttrService: @"LocalDeviceServices",
            (__bridge id)kSecAttrAccount: @"NoAccount",
            (__bridge id)kSecValueData: secret,
            (__bridge id)kSecAttrAccessible: (__bridge id)kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly
        };
        
        // You can't add duplicates so this will fail with errSecDuplicateItem
        // if the item is already on the keychain (which could throw off our check if
        // kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly was not set)
        
        OSStatus status = SecItemAdd((__bridge CFDictionaryRef)attributes, NULL);
        if (status == errSecSuccess) { // item added okay, passcode has been set
            NSDictionary *query = @{
                (__bridge id)kSecClass: (__bridge id)kSecClassGenericPassword,
                (__bridge id)kSecAttrService: @"LocalDeviceServices",
                (__bridge id)kSecAttrAccount: @"NoAccount"
            };
            
            status = SecItemDelete((__bridge CFDictionaryRef)query);
            return EncryptionStatusActivePerUser;
        } else if (status == errSecDecode || status == errSecNotAvailable) { // errSecDecode seems to be the error thrown on a device with no passcode set
            return EncryptionStatusInactive;
        }
    }
    
    return EncryptionStatusUnsupported;
}

- (CDVPluginResult*)makeIsEncryptedResult:(BOOL)isEncrypted {
    NSDictionary *resultData = @{@"isEncrypted": [NSNumber numberWithBool:isEncrypted]};
    return [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:resultData];
}

@end
