<template>
  <div class="ww-toast-wrapper">
    <div
      v-if="isVisible || isEditing"
      class="toast-container"
      :class="[positionClass, animationClass, { 'is-visible': isVisible }]"
      :style="containerStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      role="alert"
      aria-live="polite"
    >
      <div class="toast-content" :style="contentStyle">
        <!-- Accent Border -->
        <div class="toast-accent" :style="accentStyle"></div>

        <!-- Icon -->
        <div class="toast-icon" :style="iconContainerStyle">
          <!-- Success Icon -->
          <svg v-if="currentType === 'success'" viewBox="0 0 24 24" fill="none" :style="iconStyle">
            <circle cx="12" cy="12" r="10" :fill="typeColor" fill-opacity="0.2"/>
            <path d="M8 12l2.5 2.5L16 9" :stroke="typeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <!-- Warning Icon -->
          <svg v-else-if="currentType === 'warning'" viewBox="0 0 24 24" fill="none" :style="iconStyle">
            <circle cx="12" cy="12" r="10" :fill="typeColor" fill-opacity="0.2"/>
            <path d="M12 8v4m0 4h.01" :stroke="typeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <!-- Error Icon -->
          <svg v-else viewBox="0 0 24 24" fill="none" :style="iconStyle">
            <circle cx="12" cy="12" r="10" :fill="typeColor" fill-opacity="0.2"/>
            <path d="M15 9l-6 6m0-6l6 6" :stroke="typeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Text Content -->
        <div class="toast-text">
          <div class="toast-title" :style="titleStyle">{{ currentTitle }}</div>
          <div class="toast-message" :style="messageStyle">{{ currentMessage }}</div>
        </div>

        <!-- Close Button -->
        <button
          v-if="showCloseButton"
          class="toast-close"
          :style="closeButtonStyle"
          @click="handleClose"
          aria-label="Close notification"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div v-if="showProgressBar && !isPaused" class="toast-progress" :style="progressContainerStyle">
        <div class="toast-progress-bar" :style="progressBarStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

export default {
  name: 'ToastNotification',
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      required: true
    }
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // === EDITOR STATE ===
    const isEditing = computed(() => {
      /* wwEditor:start */
      return props.wwEditorState && props.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // === COMPONENT VARIABLES ===
    const { value: isVisible, setValue: setIsVisible } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isVisible',
      type: 'boolean',
      defaultValue: false
    });

    const { value: currentType, setValue: setCurrentType } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentType',
      type: 'string',
      defaultValue: computed(() => (props.content && props.content.toastType) || 'success')
    });

    const { value: currentTitle, setValue: setCurrentTitle } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentTitle',
      type: 'string',
      defaultValue: computed(() => (props.content && props.content.title) || 'Notification')
    });

    const { value: currentMessage, setValue: setCurrentMessage } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentMessage',
      type: 'string',
      defaultValue: computed(() => (props.content && props.content.message) || '')
    });

    // === LOCAL STATE ===
    const isPaused = ref(false);
    const progress = ref(100);
    const timeoutId = ref(null);
    const intervalId = ref(null);
    const remainingTime = ref(0);
    const startTime = ref(0);

    // === COMPUTED PROPERTIES ===
    const duration = computed(() => (props.content && props.content.duration) || 5000);
    const showCloseButton = computed(() => (props.content && props.content.showCloseButton) !== false);
    const showProgressBar = computed(() => (props.content && props.content.showProgressBar) !== false);
    const pauseOnHover = computed(() => (props.content && props.content.pauseOnHover) !== false);
    const position = computed(() => (props.content && props.content.position) || 'top-right');
    const animationType = computed(() => (props.content && props.content.animationType) || 'slide-fade');
    const animationDurationMs = computed(() => (props.content && props.content.animationDuration) || 300);

    const typeColor = computed(() => {
      const type = currentType.value || (props.content && props.content.toastType) || 'success';
      switch (type) {
        case 'success':
          return (props.content && props.content.successColor) || '#22c55e';
        case 'warning':
          return (props.content && props.content.warningColor) || '#eab308';
        case 'error':
          return (props.content && props.content.errorColor) || '#ef4444';
        default:
          return (props.content && props.content.successColor) || '#22c55e';
      }
    });

    const positionClass = computed(() => `position-${position.value}`);

    const animationClass = computed(() => `animation-${animationType.value}`);

    // === STYLES ===
    const containerStyle = computed(() => {
      const offsetX = (props.content && props.content.offsetX) || '20px';
      const offsetY = (props.content && props.content.offsetY) || '20px';
      const pos = position.value;

      const style = {
        '--animation-duration': `${animationDurationMs.value}ms`,
        '--toast-width': (props.content && props.content.toastWidth) || '360px',
        zIndex: 999999
      };

      // Position styles
      if (pos.includes('top')) style.top = offsetY;
      if (pos.includes('bottom')) style.bottom = offsetY;
      if (pos.includes('left') && !pos.includes('center')) style.left = offsetX;
      if (pos.includes('right')) style.right = offsetX;
      if (pos.includes('center')) {
        style.left = '50%';
        style.transform = 'translateX(-50%)';
      }

      return style;
    });

    const contentStyle = computed(() => ({
      backgroundColor: (props.content && props.content.backgroundColor) || '#1a2332',
      borderRadius: (props.content && props.content.borderRadius) || '8px',
      padding: (props.content && props.content.padding) || '16px',
      boxShadow: (props.content && props.content.boxShadow) || '0 4px 12px rgba(0, 0, 0, 0.3)',
      width: (props.content && props.content.toastWidth) || '360px',
      maxWidth: '100%'
    }));

    const accentStyle = computed(() => ({
      backgroundColor: typeColor.value,
      width: (props.content && props.content.borderWidth) || '4px',
      borderRadius: `${(props.content && props.content.borderRadius) || '8px'} 0 0 ${(props.content && props.content.borderRadius) || '8px'}`
    }));

    const iconContainerStyle = computed(() => ({
      flexShrink: 0
    }));

    const iconStyle = computed(() => ({
      width: (props.content && props.content.iconSize) || '24px',
      height: (props.content && props.content.iconSize) || '24px'
    }));

    const titleStyle = computed(() => ({
      color: (props.content && props.content.titleColor) || '#ffffff',
      fontSize: (props.content && props.content.titleFontSize) || '16px',
      fontWeight: '600',
      marginBottom: '4px'
    }));

    const messageStyle = computed(() => ({
      color: (props.content && props.content.messageColor) || '#a0aec0',
      fontSize: (props.content && props.content.messageFontSize) || '14px',
      lineHeight: '1.4'
    }));

    const closeButtonStyle = computed(() => ({
      color: (props.content && props.content.messageColor) || '#a0aec0'
    }));

    const progressContainerStyle = computed(() => ({
      height: (props.content && props.content.progressBarHeight) || '3px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: `0 0 ${(props.content && props.content.borderRadius) || '8px'} ${(props.content && props.content.borderRadius) || '8px'}`,
      overflow: 'hidden',
      marginTop: '-1px'
    }));

    const progressBarStyle = computed(() => ({
      width: `${progress.value}%`,
      height: '100%',
      backgroundColor: typeColor.value,
      transition: isPaused.value ? 'none' : 'width 100ms linear'
    }));

    // === TIMER FUNCTIONS ===
    const startTimer = () => {
      if (isEditing.value) return;

      clearTimers();

      remainingTime.value = duration.value;
      startTime.value = Date.now();
      progress.value = 100;

      // Update progress every 100ms
      intervalId.value = setInterval(() => {
        if (!isPaused.value) {
          const elapsed = Date.now() - startTime.value;
          const remaining = Math.max(0, duration.value - elapsed);
          progress.value = (remaining / duration.value) * 100;

          if (remaining <= 0) {
            hideToast('auto');
          }
        }
      }, 100);
    };

    const pauseTimer = () => {
      if (!pauseOnHover.value) return;

      isPaused.value = true;
      remainingTime.value = (progress.value / 100) * duration.value;
    };

    const resumeTimer = () => {
      if (!pauseOnHover.value || !isVisible.value) return;

      isPaused.value = false;
      startTime.value = Date.now() - (duration.value - remainingTime.value);
    };

    const clearTimers = () => {
      if (timeoutId.value) {
        clearTimeout(timeoutId.value);
        timeoutId.value = null;
      }
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
      }
    };

    // === ACTIONS ===
    const showToast = () => {
      if (isEditing.value) return;

      // Reset to content values
      setCurrentType((props.content && props.content.toastType) || 'success');
      setCurrentTitle((props.content && props.content.title) || 'Notification');
      setCurrentMessage((props.content && props.content.message) || '');

      setIsVisible(true);
      isPaused.value = false;
      startTimer();

      emit('trigger-event', {
        name: 'show',
        event: {
          type: currentType.value,
          title: currentTitle.value,
          message: currentMessage.value
        }
      });
    };

    const hideToast = (closedBy = 'manual') => {
      if (isEditing.value) return;

      clearTimers();
      setIsVisible(false);

      emit('trigger-event', {
        name: 'hide',
        event: {
          type: currentType.value,
          closedBy
        }
      });
    };

    const showSuccess = (title, message) => {
      if (isEditing.value) return;

      setCurrentType('success');
      setCurrentTitle(title || (props.content && props.content.title) || 'Success');
      setCurrentMessage(message || (props.content && props.content.message) || '');

      setIsVisible(true);
      isPaused.value = false;
      startTimer();

      emit('trigger-event', {
        name: 'show',
        event: {
          type: 'success',
          title: currentTitle.value,
          message: currentMessage.value
        }
      });
    };

    const showWarning = (title, message) => {
      if (isEditing.value) return;

      setCurrentType('warning');
      setCurrentTitle(title || (props.content && props.content.title) || 'Warning');
      setCurrentMessage(message || (props.content && props.content.message) || '');

      setIsVisible(true);
      isPaused.value = false;
      startTimer();

      emit('trigger-event', {
        name: 'show',
        event: {
          type: 'warning',
          title: currentTitle.value,
          message: currentMessage.value
        }
      });
    };

    const showError = (title, message) => {
      if (isEditing.value) return;

      setCurrentType('error');
      setCurrentTitle(title || (props.content && props.content.title) || 'Error');
      setCurrentMessage(message || (props.content && props.content.message) || '');

      setIsVisible(true);
      isPaused.value = false;
      startTimer();

      emit('trigger-event', {
        name: 'show',
        event: {
          type: 'error',
          title: currentTitle.value,
          message: currentMessage.value
        }
      });
    };

    // === EVENT HANDLERS ===
    const handleClose = () => {
      emit('trigger-event', {
        name: 'close',
        event: {
          type: currentType.value
        }
      });
      hideToast('close-button');
    };

    const handleMouseEnter = () => {
      if (pauseOnHover.value) {
        pauseTimer();
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover.value) {
        resumeTimer();
      }
    };

    // === WATCHERS ===
    // Watch for content changes to update current values when not visible
    watch(() => props.content && props.content.toastType, (newType) => {
      if (!isVisible.value && newType) {
        setCurrentType(newType);
      }
    });

    watch(() => props.content && props.content.title, (newTitle) => {
      if (!isVisible.value && newTitle) {
        setCurrentTitle(newTitle);
      }
    });

    watch(() => props.content && props.content.message, (newMessage) => {
      if (!isVisible.value && newMessage) {
        setCurrentMessage(newMessage);
      }
    });

    // === CLEANUP ===
    onBeforeUnmount(() => {
      clearTimers();
    });

    return {
      // State
      isVisible,
      isEditing,
      isPaused,
      progress,
      currentType,
      currentTitle,
      currentMessage,

      // Computed
      showCloseButton,
      showProgressBar,
      typeColor,
      positionClass,
      animationClass,
      animationDurationMs,

      // Styles
      containerStyle,
      contentStyle,
      accentStyle,
      iconContainerStyle,
      iconStyle,
      titleStyle,
      messageStyle,
      closeButtonStyle,
      progressContainerStyle,
      progressBarStyle,

      // Methods
      handleClose,
      handleMouseEnter,
      handleMouseLeave,

      // Actions (exposed for workflows)
      showToast,
      hideToast,
      showSuccess,
      showWarning,
      showError
    };
  }
};
</script>

<style scoped lang="scss">
.ww-toast-wrapper {
  width: 0;
  height: 0;
  overflow: visible;
  position: relative;
  z-index: 999999 !important;
}

.toast-container {
  position: fixed;
  z-index: 999999 !important;
  pointer-events: auto;
  opacity: 0;
  transition: opacity var(--animation-duration, 300ms) ease;
  isolation: isolate;

  &.is-visible {
    opacity: 1;
  }

  // Animation classes
  &.animation-slide-fade.is-visible,
  &.animation-slide.is-visible {
    &.position-top-right,
    &.position-bottom-right {
      animation: slideInRight var(--animation-duration, 300ms) ease forwards;
    }

    &.position-top-left,
    &.position-bottom-left {
      animation: slideInLeft var(--animation-duration, 300ms) ease forwards;
    }

    &.position-top-center {
      animation: slideInTop var(--animation-duration, 300ms) ease forwards;
    }

    &.position-bottom-center {
      animation: slideInBottom var(--animation-duration, 300ms) ease forwards;
    }
  }

  &.animation-fade.is-visible {
    animation: fadeIn var(--animation-duration, 300ms) ease forwards;
  }
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.toast-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding-top: 2px;
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  word-wrap: break-word;
}

.toast-message {
  word-wrap: break-word;
}

.toast-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.toast-progress {
  width: 100%;
  margin-top: 0;
}

.toast-progress-bar {
  transform-origin: left;
}

// === ANIMATIONS ===
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

// === RESPONSIVE ===
@media (max-width: 480px) {
  .toast-container {
    left: 10px !important;
    right: 10px !important;
    transform: none !important;

    &.position-top-center,
    &.position-bottom-center {
      left: 10px !important;
      right: 10px !important;
    }
  }

  .toast-content {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
