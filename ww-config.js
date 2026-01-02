export default {
  options: {
    displayAllowedValues: ['flex', 'inline-flex']
  },
  editor: {
    label: {
      en: 'Toast Notification',
      pt: 'Notificacao Toast'
    },
    icon: 'bell'
  },
  triggerEvents: [
    {
      name: 'show',
      label: { en: 'On toast show' },
      event: {
        type: 'success',
        title: '',
        message: ''
      },
      default: true
    },
    {
      name: 'hide',
      label: { en: 'On toast hide' },
      event: {
        type: 'success',
        closedBy: 'auto'
      }
    },
    {
      name: 'close',
      label: { en: 'On close button click' },
      event: {
        type: 'success'
      }
    }
  ],
  actions: [
    {
      label: { en: 'Show toast' },
      action: 'showToast'
    },
    {
      label: { en: 'Hide toast' },
      action: 'hideToast'
    },
    {
      label: { en: 'Show success toast' },
      action: 'showSuccess',
      args: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'message',
          type: 'string'
        }
      ]
    },
    {
      label: { en: 'Show warning toast' },
      action: 'showWarning',
      args: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'message',
          type: 'string'
        }
      ]
    },
    {
      label: { en: 'Show error toast' },
      action: 'showError',
      args: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'message',
          type: 'string'
        }
      ]
    }
  ],
  properties: {
    // === CONTENT SECTION ===
    toastType: {
      label: { en: 'Toast Type' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'success',
      options: {
        options: [
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'A string: "success", "warning", or "error"'
      },
      propertyHelp: {
        tooltip: 'The type of toast notification - changes icon and colors automatically'
      }
      /* wwEditor:end */
    },
    title: {
      label: { en: 'Title' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Saved Successfully',
      options: {
        placeholder: 'Enter toast title'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The title text of the toast'
      },
      propertyHelp: {
        tooltip: 'Main title displayed in the toast notification'
      }
      /* wwEditor:end */
    },
    message: {
      label: { en: 'Message' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Your changes have been saved successfully',
      options: {
        placeholder: 'Enter toast message'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'The message text of the toast'
      },
      propertyHelp: {
        tooltip: 'Description message displayed below the title'
      }
      /* wwEditor:end */
    },

    // === BEHAVIOR SECTION ===
    duration: {
      label: { en: 'Duration (ms)' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 5000,
      options: {
        min: 1000,
        max: 30000,
        step: 500
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Duration in milliseconds (1000-30000)'
      },
      propertyHelp: {
        tooltip: 'How long the toast stays visible before auto-hiding (in milliseconds)'
      }
      /* wwEditor:end */
    },
    showCloseButton: {
      label: { en: 'Show Close Button' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Show or hide the close button'
      },
      propertyHelp: {
        tooltip: 'Display an X button to manually close the toast'
      }
      /* wwEditor:end */
    },
    showProgressBar: {
      label: { en: 'Show Progress Bar' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Show or hide the progress bar'
      },
      propertyHelp: {
        tooltip: 'Display a progress bar showing remaining time'
      }
      /* wwEditor:end */
    },
    pauseOnHover: {
      label: { en: 'Pause on Hover' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'Pause timer when hovering'
      },
      propertyHelp: {
        tooltip: 'Pause the auto-hide timer when mouse hovers over the toast'
      }
      /* wwEditor:end */
    },

    // === POSITION SECTION ===
    position: {
      label: { en: 'Position' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'top-right',
      options: {
        options: [
          { value: 'top-left', label: 'Top Left' },
          { value: 'top-center', label: 'Top Center' },
          { value: 'top-right', label: 'Top Right' },
          { value: 'bottom-left', label: 'Bottom Left' },
          { value: 'bottom-center', label: 'Bottom Center' },
          { value: 'bottom-right', label: 'Bottom Right' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Position on screen: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right'
      },
      propertyHelp: {
        tooltip: 'Where the toast appears on the screen'
      }
      /* wwEditor:end */
    },
    offsetX: {
      label: { en: 'Horizontal Offset' },
      type: 'Length',
      section: 'settings',
      bindable: true,
      defaultValue: '20px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 100 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Horizontal distance from edge'
      },
      propertyHelp: {
        tooltip: 'Distance from the left or right edge of the screen'
      }
      /* wwEditor:end */
    },
    offsetY: {
      label: { en: 'Vertical Offset' },
      type: 'Length',
      section: 'settings',
      bindable: true,
      defaultValue: '20px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 100 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Vertical distance from edge'
      },
      propertyHelp: {
        tooltip: 'Distance from the top or bottom edge of the screen'
      }
      /* wwEditor:end */
    },

    // === ANIMATION SECTION ===
    animationType: {
      label: { en: 'Animation Type' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'slide-fade',
      options: {
        options: [
          { value: 'slide-fade', label: 'Slide + Fade' },
          { value: 'fade', label: 'Fade Only' },
          { value: 'slide', label: 'Slide Only' },
          { value: 'none', label: 'None' }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Animation style: slide-fade, fade, slide, or none'
      },
      propertyHelp: {
        tooltip: 'The animation style when toast appears and disappears'
      }
      /* wwEditor:end */
    },
    animationDuration: {
      label: { en: 'Animation Duration (ms)' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 300,
      options: {
        min: 100,
        max: 1000,
        step: 50
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Animation duration in milliseconds'
      },
      propertyHelp: {
        tooltip: 'How long the enter/exit animation takes'
      }
      /* wwEditor:end */
    },

    // === STYLE SECTION ===
    toastWidth: {
      label: { en: 'Toast Width' },
      type: 'Length',
      section: 'style',
      bindable: true,
      responsive: true,
      defaultValue: '360px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 200, max: 600 },
          { value: '%', label: '%', min: 20, max: 100 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Width of the toast container'
      },
      propertyHelp: {
        tooltip: 'The width of the toast notification'
      }
      /* wwEditor:end */
    },
    borderRadius: {
      label: { en: 'Border Radius' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '8px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 30 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Border radius of the toast'
      },
      propertyHelp: {
        tooltip: 'Corner roundness of the toast'
      }
      /* wwEditor:end */
    },
    padding: {
      label: { en: 'Padding' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '16px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 8, max: 32 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Internal padding of the toast'
      },
      propertyHelp: {
        tooltip: 'Spacing inside the toast container'
      }
      /* wwEditor:end */
    },
    backgroundColor: {
      label: { en: 'Background Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#1a2332',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Background color of the toast'
      },
      propertyHelp: {
        tooltip: 'Main background color of the toast'
      }
      /* wwEditor:end */
    },
    titleColor: {
      label: { en: 'Title Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color of the title text'
      },
      propertyHelp: {
        tooltip: 'Text color for the toast title'
      }
      /* wwEditor:end */
    },
    messageColor: {
      label: { en: 'Message Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#a0aec0',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color of the message text'
      },
      propertyHelp: {
        tooltip: 'Text color for the toast message'
      }
      /* wwEditor:end */
    },
    titleFontSize: {
      label: { en: 'Title Font Size' },
      type: 'Length',
      section: 'style',
      bindable: true,
      responsive: true,
      defaultValue: '16px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 12, max: 24 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Font size of the title'
      },
      propertyHelp: {
        tooltip: 'Text size for the toast title'
      }
      /* wwEditor:end */
    },
    messageFontSize: {
      label: { en: 'Message Font Size' },
      type: 'Length',
      section: 'style',
      bindable: true,
      responsive: true,
      defaultValue: '14px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 10, max: 20 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Font size of the message'
      },
      propertyHelp: {
        tooltip: 'Text size for the toast message'
      }
      /* wwEditor:end */
    },
    iconSize: {
      label: { en: 'Icon Size' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '24px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 16, max: 48 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Size of the status icon'
      },
      propertyHelp: {
        tooltip: 'Size of the success/warning/error icon'
      }
      /* wwEditor:end */
    },
    boxShadow: {
      label: { en: 'Box Shadow' },
      type: 'Text',
      section: 'style',
      bindable: true,
      defaultValue: '0 4px 12px rgba(0, 0, 0, 0.3)',
      options: {
        placeholder: 'e.g., 0 4px 12px rgba(0,0,0,0.3)'
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'CSS box-shadow value'
      },
      propertyHelp: {
        tooltip: 'Shadow effect around the toast'
      }
      /* wwEditor:end */
    },
    borderWidth: {
      label: { en: 'Accent Border Width' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '4px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 0, max: 10 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Width of the colored accent border'
      },
      propertyHelp: {
        tooltip: 'Width of the left colored border that indicates toast type'
      }
      /* wwEditor:end */
    },
    progressBarHeight: {
      label: { en: 'Progress Bar Height' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '3px',
      options: {
        unitChoices: [
          { value: 'px', label: 'px', min: 2, max: 8 }
        ]
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Height of the progress bar'
      },
      propertyHelp: {
        tooltip: 'Thickness of the progress bar at the bottom'
      }
      /* wwEditor:end */
    },

    // === TYPE-SPECIFIC COLORS ===
    successColor: {
      label: { en: 'Success Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#22c55e',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color for success type'
      },
      propertyHelp: {
        tooltip: 'Accent color used for success toast type'
      }
      /* wwEditor:end */
    },
    warningColor: {
      label: { en: 'Warning Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#eab308',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color for warning type'
      },
      propertyHelp: {
        tooltip: 'Accent color used for warning toast type'
      }
      /* wwEditor:end */
    },
    errorColor: {
      label: { en: 'Error Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ef4444',
      options: {
        nullable: true
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'string',
        tooltip: 'Color for error type'
      },
      propertyHelp: {
        tooltip: 'Accent color used for error toast type'
      }
      /* wwEditor:end */
    }
  }
};
