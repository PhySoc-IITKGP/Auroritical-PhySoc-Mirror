const showToast = (message, type = "info", options = {}) => {
  const {
    actionText,
    onAction,
    cancelText = "Dismiss",
    duration = 3000,
  } = options;

  const accents = {
    info: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)" },
    success: { color: "#4ade80", bg: "rgba(74, 222, 128, 0.12)" },
    error: { color: "#f87171", bg: "rgba(248, 113, 113, 0.12)" },
    warning: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)" },
  };

  const icons = {
    info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  const accent = accents[type] || accents.info;
  const iconSvg = icons[type] || icons.info;

  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
  const actionBtnId = `toast-action-${uniqueId}`;
  const closeBtnId = `toast-close-${uniqueId}`;

  const html = `
    <div style="
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f8fafc;
      width: 100%;
    ">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: ${accent.color};
        background: ${accent.bg};
      ">
        ${iconSvg}
      </div>

      <div style="flex: 1; padding-top: 2px;">
        <div style="font-size: 13.5px; font-weight: 500; line-height: 1.45; color: #f1f5f9;">
          ${message}
        </div>

        ${
          actionText
            ? `
          <div style="margin-top: 10px; display: flex; gap: 8px; align-items: center;">
            <button id="${actionBtnId}" style="
              background: #f8fafc;
              color: #0f172a;
              border: none;
              padding: 5px 12px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 600;
              transition: opacity 0.15s;
            ">
              ${actionText}
            </button>

            <button id="${closeBtnId}" style="
              background: transparent;
              color: #94a3b8;
              border: none;
              padding: 5px 10px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 500;
              transition: color 0.15s;
            ">
              ${cancelText}
            </button>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;

  const toastInstance = Toastify({
    text: html,
    duration: duration,
    gravity: "top",
    position: "center",
    escapeMarkup: false,
    stopOnFocus: true,
    style: {
      background: "#0f172a",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.25)",
      borderRadius: "12px",
      padding: "14px 16px",
      minWidth: "320px",
      maxWidth: "420px",
    },
  });

  toastInstance.showToast();

  if (actionText) {
    setTimeout(() => {
      const actionBtn = document.getElementById(actionBtnId);
      const closeBtn = document.getElementById(closeBtnId);

      if (actionBtn) {
        actionBtn.onclick = () => {
          if (typeof onAction === "function") {
            onAction();
          }
          toastInstance.hideToast();
        };
      }

      if (closeBtn) {
        closeBtn.onclick = () => {
          toastInstance.hideToast();
        };
      }
    }, 50);
  }
};
