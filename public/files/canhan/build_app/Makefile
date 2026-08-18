SHELL := /bin/bash

FLUTTER ?= flutter
PLATFORM ?= macos
BUILD_MODE ?= release
ENV_FILE ?= .env

# Generate --dart-define flags dynamically for each key=value in ENV_FILE
ifneq (,$(wildcard $(ENV_FILE)))
  include $(ENV_FILE)
  export $(shell [ -f $(ENV_FILE) ] && grep -v '^\#' $(ENV_FILE) | grep '=' | cut -d= -f1)
  ENV_DART_DEFINES := $(shell [ -f $(ENV_FILE) ] && awk '!/^[[:space:]]*\#/ && /=/ { idx=index($$0, "="); if(idx > 1) { k=substr($$0, 1, idx-1); v=substr($$0, idx+1); gsub(/^[[:space:]]+|[[:space:]]+$$/, "", k); gsub(/^[[:space:]]+|[[:space:]]+$$/, "", v); sub(/^"/, "", v); sub(/"$$/, "", v); sub(/^\047/, "", v); sub(/\047$$/, "", v); if(k != "") printf "--dart-define=%s=%s ", k, v } }' $(ENV_FILE))
  DART_DEFINES ?= $(ENV_DART_DEFINES)
else
  DART_DEFINES ?=
endif

.DEFAULT_GOAL := help

.PHONY: help deps clean doctor devices check-ios-target env-check verify-dart-define \
	start start-macos start-ios start-ios-sim start-aos start-android start-windows \
	build build-macos build-ios build-aos build-android build-windows build-all

help:
	@echo "Flutter Makefile commands"
	@echo ""
	@echo "Setup & Environment:"
	@echo "  make deps               # flutter pub get"
	@echo "  make doctor             # flutter doctor -v"
	@echo "  make devices            # flutter devices"
	@echo "  make clean              # flutter clean"
	@echo "  make env-check          # kiem tra cac key .env va AdMob hien tai"
	@echo "  make verify-dart-define # xac minh --dart-define da duoc app doc thanh cong"
	@echo ""
	@echo "Run app (kem inject .env / $(DART_DEFINES)):"
	@echo "  make start PLATFORM=macos|ios|aos|windows"
	@echo "  make start-macos"
	@echo "  make start-ios          # run on connected iOS device/simulator"
	@echo "  make start-ios-sim      # open Simulator then run iOS"
	@echo "  make start-aos          # Android (AOS), co the chon thiet bi"
	@echo "    AOS_DEVICE=<deviceId> make start-aos  # chon nhanh theo device id"
	@echo "  make start-windows"
	@echo ""
	@echo "Build app (kem inject .env / $(DART_DEFINES)):"
	@echo "  make build PLATFORM=macos|ios|aos|windows"
	@echo "  make build-macos"
	@echo "  make build-ios          # --no-codesign"
	@echo "  make build-aos          # apk + appbundle"
	@echo "  make build-windows"
	@echo "  make build-all"

env-check:
	@echo "=== Kiem tra cau hinh moi truong (.env & AdMob) ==="
	@if [ -f "$(ENV_FILE)" ]; then \
		echo "Found $(ENV_FILE):"; \
		echo "  DART_DEFINES: $(DART_DEFINES)"; \
		echo "  ADMOB_APP_ID_ANDROID:                  $${ADMOB_APP_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_APP_ID_IOS:                      $${ADMOB_APP_ID_IOS:-<not set>}"; \
		echo "  ADMOB_BANNER_ID_ANDROID:              $${ADMOB_BANNER_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_BANNER_ID_IOS:                  $${ADMOB_BANNER_ID_IOS:-<not set>}"; \
		echo "  ADMOB_NATIVE_ID_ANDROID:              $${ADMOB_NATIVE_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_NATIVE_ID_IOS:                  $${ADMOB_NATIVE_ID_IOS:-<not set>}"; \
		echo "  ADMOB_INTERSTITIAL_ID_ANDROID:        $${ADMOB_INTERSTITIAL_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_INTERSTITIAL_ID_IOS:            $${ADMOB_INTERSTITIAL_ID_IOS:-<not set>}"; \
		echo "  ADMOB_REWARDED_ID_ANDROID:            $${ADMOB_REWARDED_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_REWARDED_ID_IOS:                $${ADMOB_REWARDED_ID_IOS:-<not set>}"; \
		echo "  ADMOB_REWARDED_INTERSTITIAL_ID_ANDROID:$${ADMOB_REWARDED_INTERSTITIAL_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_REWARDED_INTERSTITIAL_ID_IOS:    $${ADMOB_REWARDED_INTERSTITIAL_ID_IOS:-<not set>}"; \
		echo "  ADMOB_APP_OPEN_ID_ANDROID:            $${ADMOB_APP_OPEN_ID_ANDROID:-<not set>}"; \
		echo "  ADMOB_APP_OPEN_ID_IOS:                $${ADMOB_APP_OPEN_ID_IOS:-<not set>}"; \
	else \
		echo "Khong tim thay file $(ENV_FILE). He thong se tu dong fallback ve Google Test IDs."; \
		echo "Goi y: Copy file mau bang lenh 'cp .env.example .env' va dien cac key production."; \
	fi

verify-dart-define:
	@echo "=== Kiem tra doc --dart-define tu .env vao Flutter App ==="
	@echo "DART_DEFINES:"
	@echo "  $(DART_DEFINES)"
	@if [ -z "$(DART_DEFINES)" ]; then \
		echo "Chu y: Khong co DART_DEFINES nao duoc tao (khong tim thay $(ENV_FILE))."; \
	fi
	$(FLUTTER) test $(DART_DEFINES) test/features/ads/dart_define_verification_test.dart

deps:
	$(FLUTTER) pub get

clean:
	$(FLUTTER) clean

doctor:
	$(FLUTTER) doctor -v

devices:
	$(FLUTTER) devices

check-ios-target:
	@devices_json="$$($(FLUTTER) devices --machine 2>/dev/null)"; \
	if ! echo "$$devices_json" | grep -Eq '"targetPlatform"[[:space:]]*:[[:space:]]*"ios"'; then \
		echo "Khong tim thay thiet bi iOS vat ly hoac may ao iOS dang san sang."; \
		echo "Goi y: mo may ao bang 'make start-ios-sim' roi chay lai 'make start-ios'."; \
		exit 1; \
	fi

start: start-$(PLATFORM)

start-macos:
	$(FLUTTER) run -d macos $(DART_DEFINES)

start-ios: check-ios-target
	@ios_id="$$(($(FLUTTER) devices 2>/dev/null) | awk -F'•' '/• ios[[:space:]]*•/ {gsub(/^[[:space:]]+|[[:space:]]+$$/, "", $$2); print $$2; exit}')"; \
	if [ -z "$$ios_id" ]; then \
		echo "Khong tim thay iOS device id du hop le de chay app."; \
		exit 1; \
	fi; \
	LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 $(FLUTTER) run -d "$$ios_id" $(DART_DEFINES)

start-ios-sim:
	open -a Simulator
	$(MAKE) start-ios

start-aos:
	@android_rows="$$(($(FLUTTER) devices 2>/dev/null) | awk -F'•' '/•[[:space:]]*android/ {name=$$1; id=$$2; platform=$$3; gsub(/^[[:space:]]+|[[:space:]]+$$/, "", name); gsub(/^[[:space:]]+|[[:space:]]+$$/, "", id); gsub(/^[[:space:]]+|[[:space:]]+$$/, "", platform); if (id != "") printf "%s\t%s\t%s\n", id, name, platform }')"; \
	if [ -z "$$android_rows" ]; then \
		echo "Khong tim thay thiet bi Android san sang."; \
		exit 1; \
	fi; \
	if [ -n "$$AOS_DEVICE" ]; then \
		if ! echo "$$android_rows" | awk -F'\t' '{print $$1}' | grep -Fxq "$$AOS_DEVICE"; then \
			echo "AOS_DEVICE='$$AOS_DEVICE' khong nam trong danh sach Android devices hien co."; \
			echo "Chay 'make devices' de xem device id hop le."; \
			exit 1; \
		fi; \
		selected_android="$$AOS_DEVICE"; \
	else \
		android_count="$$(echo "$$android_rows" | awk 'NF{count++} END{print count+0}')"; \
		if [ "$$android_count" -eq 1 ]; then \
			selected_android="$$(echo "$$android_rows" | awk -F'\t' 'NR==1 {print $$1; exit}')"; \
		elif [ -t 0 ]; then \
			echo "Phat hien $$android_count thiet bi Android. Hay chon 1 thiet bi:"; \
			i=1; \
			while IFS=$$'\t' read -r dev_id dev_name dev_platform; do \
				echo "  [$$i] $$dev_name ($$dev_id, $$dev_platform)"; \
				i=$$((i+1)); \
			done <<< "$$android_rows"; \
			read -r -p "Nhap so thu tu (1-$$android_count): " choice_idx; \
			if ! [[ "$$choice_idx" =~ ^[0-9]+$$ ]] || [ "$$choice_idx" -lt 1 ] || [ "$$choice_idx" -gt "$$android_count" ]; then \
				echo "Lua chon khong hop le."; \
				exit 1; \
			fi; \
			selected_android="$$(echo "$$android_rows" | awk -F'\t' -v idx="$$choice_idx" 'NR==idx {print $$1; exit}')"; \
		else \
			echo "Co nhieu thiet bi Android nhung shell khong tuong tac (non-interactive)."; \
			echo "Hay chi dinh ro device id: AOS_DEVICE=<deviceId> make start-aos"; \
			exit 1; \
		fi; \
	fi; \
	echo "Dang chay tren Android device: $$selected_android"; \
	$(FLUTTER) run -d "$$selected_android" $(DART_DEFINES)

start-android: start-aos

start-windows:
	$(FLUTTER) run -d windows $(DART_DEFINES)

build: build-$(PLATFORM)

build-macos:
	$(FLUTTER) build macos --$(BUILD_MODE) $(DART_DEFINES)

build-ios:
	$(FLUTTER) build ios --$(BUILD_MODE) --no-codesign $(DART_DEFINES)

build-aos:
	@build_number="$$(date +%s)"; \
	echo "Build Android voi build-number=$$build_number va DART_DEFINES=$(DART_DEFINES)"; \
	$(FLUTTER) build apk --$(BUILD_MODE) --build-number="$$build_number" $(DART_DEFINES); \
	$(FLUTTER) build appbundle --$(BUILD_MODE) --build-number="$$build_number" $(DART_DEFINES)

build-android: build-aos

build-windows:
	$(FLUTTER) build windows --$(BUILD_MODE) $(DART_DEFINES)

build-all: build-macos build-ios build-aos build-windows
