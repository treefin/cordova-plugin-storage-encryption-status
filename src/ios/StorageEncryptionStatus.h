#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>

typedef NS_ENUM(NSInteger, EncryptionStatus) {
    EncryptionStatusUnsupported = 0,
    EncryptionStatusInactive = 1,
    EncryptionStatusActivePerUser = 5
};

@interface StorageEncryptionStatus : CDVPlugin

- (void)isEncrypted:(CDVInvokedUrlCommand*)command;

- (void)getEncryptionStatus:(CDVInvokedUrlCommand*)command;

@end
