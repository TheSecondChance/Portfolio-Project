let alarmInterval = null;

function createAlarm() {
  if (alarmInterval !== null) {
    chrome.alarms.create("popupReminder", { periodInMinutes: alarmInterval });
  }
}

chrome.runtime.onInstalled.addListener(() => {
  createAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "popupReminder") {
    chrome.windows.create({
      url: "./question/question.html",
      type: "popup",
      width: 600,
      height: 400,
    });
    createAlarm();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "setAlarmInterval") {
    if (message.interval === 0) {
      chrome.alarms.clear("popupReminder");
      alarmInterval = null;
    } else {
      alarmInterval = message.interval;
      createAlarm();
    }
  }
});
