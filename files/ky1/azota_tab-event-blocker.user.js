// ==UserScript==
// @name         Tab & Fullscreen Event Blocker (Fixed)
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Block all browser events when switching tabs, apps, or exiting fullscreen
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('Tab & Fullscreen Blocker: Initializing...');

    // 1. Override addEventListener
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

    // Cập nhật danh sách các sự kiện cần chặn (Đã thêm nhóm Fullscreen)
    const blockedEvents = [
        // Tab & Focus events
        'visibilitychange', 'webkitvisibilitychange', 'mozvisibilitychange', 'msvisibilitychange',
        'blur', 'focus', 'focusin', 'focusout',
        'pagehide', 'pageshow', 'beforeunload', 'unload',
        // Window events
        'resize', 'orientationchange', 'mouseleave',
        // Fullscreen events (NGUYÊN NHÂN LỖI CỦA BẠN NẰM Ở ĐÂY)
        'fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange', 'fullscreenerror'
    ];

    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (blockedEvents.includes(type.toLowerCase())) {
            // console.log(`Blocked event listener: ${type}`); // Bật dòng này nếu muốn debug
            return function() {};
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    EventTarget.prototype.removeEventListener = function(type, listener, options) {
        if (blockedEvents.includes(type.toLowerCase())) {
            return;
        }
        return originalRemoveEventListener.call(this, type, listener, options);
    };

    // 2. Override các thuộc tính kiểm tra trạng thái hiển thị
    // Giả lập rằng web luôn hiển thị và đang focus
    const propsToSpoof = [
        { obj: document, prop: 'visibilityState', value: 'visible' },
        { obj: document, prop: 'hidden', value: false },
        { obj: document, prop: 'webkitHidden', value: false },
        { obj: document, prop: 'mozHidden', value: false },
        { obj: document, prop: 'msHidden', value: false },
        { obj: document, prop: 'hasFocus', value: () => true, type: 'function' }
    ];

    // Xử lý cả window.document nếu khác document
    if (window.document !== document) {
        propsToSpoof.push(
            { obj: window.document, prop: 'visibilityState', value: 'visible' },
            { obj: window.document, prop: 'hidden', value: false }
        );
    }

    propsToSpoof.forEach(item => {
        try {
            Object.defineProperty(item.obj, item.prop, {
                get: item.type === 'function' ? () => item.value : () => item.value,
                configurable: false,
                enumerable: true
            });
        } catch (e) {
            // Bỏ qua nếu không thể ghi đè
        }
    });

    // 3. Chặn gán sự kiện trực tiếp qua "on..." (Ví dụ: window.onblur = ...)
    const blockOnProperties = [
        'onvisibilitychange', 'onblur', 'onfocus', 'onpagehide', 'onpageshow',
        'onbeforeunload', 'onunload', 'onresize',
        // Thêm nhóm Fullscreen vào đây nữa
        'onfullscreenchange', 'onwebkitfullscreenchange', 'onmozfullscreenchange', 'onmsfullscreenchange'
    ];

    blockOnProperties.forEach(prop => {
        try {
            Object.defineProperty(window, prop, {
                set: function() { return; },
                get: function() { return null; },
                configurable: false
            });
            Object.defineProperty(document, prop, {
                set: function() { return; },
                get: function() { return null; },
                configurable: false
            });
        } catch (e) {}
    });

    // 4. Chặn dispatchEvent (Ngăn web tự bắn sự kiện để kiểm tra)
    const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
    EventTarget.prototype.dispatchEvent = function(event) {
        if (event.type && blockedEvents.includes(event.type.toLowerCase())) {
            return true; // Giả vờ thành công nhưng không làm gì cả
        }
        return originalDispatchEvent.call(this, event);
    };

    // 5. Hack nâng cao: Giả lập MatchMedia (Một số web dùng cái này để check fullscreen)
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = function(query) {
        const mql = originalMatchMedia.call(this, query);
        // Nếu web check display-mode: fullscreen, luôn trả về true nếu cần thiết (hoặc chặn sự kiện change)
        if (query.includes('display-mode') || query.includes('fullscreen')) {
            Object.defineProperty(mql, 'addEventListener', {
                value: function(type, listener) {
                    if (type === 'change') return; // Chặn sự kiện thay đổi trạng thái media
                    return EventTarget.prototype.addEventListener.call(this, type, listener);
                }
            });
            Object.defineProperty(mql, 'addListener', { // Support cũ
                value: function(listener) { return; }
            });
        }
        return mql;
    };

    console.log('Tab & Fullscreen Blocker: Active');
})();