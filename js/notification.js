const PROMPT_KEY = "physoc_notif_prompt_time";
const WEEK = 7 * 24 * 60 * 60 * 1000;

const shouldShowPrompt = () => {
  const permission = Notification.permission;

  if (permission === "granted") return false;

  const last = localStorage.getItem(PROMPT_KEY);

  if (!last) return true;

  const lastTime = Number(last);
  if (isNaN(lastTime)) return true;

  return Date.now() - lastTime > WEEK;
};

const markPromptShown = () => {
  localStorage.setItem(PROMPT_KEY, String(Date.now()));
};

const notificationPrompt = () => {
  setTimeout(() => {
    if (!shouldShowPrompt()) return;

    const permission = Notification.permission;

    if (permission === "denied") {
      showToast(
        "Notifications are blocked. You can still try enabling again.",
        "error",
        {
          actionText: "Try Again",
          cancelText: "Later",
          onAction: () => requestPermission(),
          duration: 8000,
        },
      );

      localStorage.setItem(PROMPT_KEY, String(Date.now()));
      return;
    }

    localStorage.setItem(PROMPT_KEY, String(Date.now()));

    showToast("Stay updated with PhySoc events & seminars", "info", {
      actionText: "Enable",
      cancelText: "Later",
      onAction: () => requestPermission(),
      duration: 8000,
    });
  }, 1500);
};

window.notificationPrompt = notificationPrompt;

export { shouldShowPrompt, markPromptShown };
