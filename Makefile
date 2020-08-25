MODULE_NAME ?= cordova-plugin-storage-encryption-status
APP_NAME ?= testapp
BUILD_DIR ?= /tmp/$(MODULE_NAME)
CONFIG_XML ?= $(BUILD_DIR)/config.xml
INDEX_JS ?= $(BUILD_DIR)/www/js/index.js
INDEX_HTML ?= $(BUILD_DIR)/www/index.html
ANDROID_MANIFEST ?= $(BUILD_DIR)/platforms/android/app/src/main/AndroidManifest.xml
IOS_PROJECT ?= $(BUILD_DIR)/platforms/ios/$(APP_NAME).xcodeproj

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)

.PHONY: init
init: $(CONFIG_XML)

$(CONFIG_XML):
	cordova create $(BUILD_DIR) com.test $(APP_NAME)
	cd $(BUILD_DIR) && cordova plugins add $(MODULE_NAME) --searchpath $(shell pwd)
	rm $(INDEX_JS)
	rm $(INDEX_HTML)

.PHONY: bundle
bundle: $(INDEX_JS)

$(INDEX_JS) $(INDEX_HTML): $(CONFIG_XML)
	cp example/index.js $(INDEX_JS)
	cp example/index.html $(INDEX_HTML)

$(ANDROID_MANIFEST):
	cd $(BUILD_DIR) && cordova platform add android

.PHONY: test-android
test-android: $(CONFIG_XML) $(ANDROID_MANIFEST) $(INDEX_JS)
	cd $(BUILD_DIR) && cordova build

.PHONY: run-android
run-android: $(CONFIG_XML) $(ANDROID_MANIFEST) $(INDEX_JS)
	cd $(BUILD_DIR) && cordova run android

$(IOS_PROJECT):
	cd $(BUILD_DIR) && cordova platform add ios

.PHONY: test-ios
test-ios: $(CONFIG_XML) $(IOS_PROJECT) $(INDEX_JS)
	cd $(BUILD_DIR) && cordova build

.PHONY: run-ios
run-ios: $(CONFIG_XML) $(IOS_PROJECT) $(INDEX_JS)
	cd $(BUILD_DIR) && cordova run ios

.PHONY: test
test: $(CONFIG_XML) $(ANDROID_MANIFEST) $(IOS_PROJECT) $(INDEX_JS)
	cd $(BUILD_DIR) && cordova build
