let installSWBtn = document.getElementById('installSW');
let beforeinstallpromptSpan = document.getElementById('beforeinstallprompt');
let A2HS = document.getElementById('A2HS');
let beforeinstallprompt = document.getElementById('beforeinstallprompt');

const log = console.log;

function installSW() {
  log(`Installing SW...`);
  // Check that service workers are registered
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/sw.js');

}

function addToHomescreen() {
  log(`Adding to homescreen`);

  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        gtag('event', 'accept', { event_category: 'A2HS' });
      } else {
        console.log('User dismissed the A2HS prompt');
        gtag('event', 'dismiss', { event_category: 'A2HS' });
      }
      deferredPrompt = null;
    });
}

installSWBtn.addEventListener('click', installSW);

A2HS.addEventListener('click', addToHomescreen);

window.addEventListener('beforeinstallprompt', (e) => {
  log(`beforeinstallprompt`);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  A2HS.disabled = false;
  beforeinstallpromptSpan.innerText = "Received";
});

// Creates a map between custom dimension names and their index.
// This is particularly useful if you define lots of custom dimensions.
var customDimensions = {
  SERVICE_WORKER_STATUS: 'dimension2'
};

// Creates the tracker object.
// ga('create', 'UA-114121901-3', 'auto');

// Sets the service worker status on the tracker,
// so its value is included in all future hits.
gtag('set', customDimensions.SERVICE_WORKER_STATUS, getServiceWorkerStatus());

// Postpones sending any hits until after the page has fully loaded.
// This prevents analytics requests from delaying the loading of the page.
window.addEventListener('load', function() {
  // Sends a pageview for the initial pageload.
  gtag('send', 'pageview');

  // Sends an event with the time to first paint data.
  sendTimeToFirstPaint();
});

function getServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.controller ? 'controlled' : 'supported';
  } else {
    return 'unsupported';
  }
}

function getTimeToFirstPaintIfSupported() {
  // Ignores browsers that don't support the Performance Timing API.
  if (window.performance && window.performance.timing) {
    var navTiming = window.performance.timing;
    var navStart = navTiming.navigationStart;
    var fpTime;

    // If chrome, get first paint time from `chrome.loadTimes`.
    if (window.chrome && window.chrome.loadTimes) {
      fpTime = window.chrome.loadTimes().firstPaintTime * 1000;
    }
    // If IE/Edge, use the prefixed `msFirstPaint` property.
    // See http://msdn.microsoft.com/ff974719
    else if (navTiming.msFirstPaint) {
      fpTime = navTiming.msFirstPaint;
    }

    if (fpTime && navStart) {
      return fpTime - navStart;
    }
  }
}

function sendTimeToFirstPaint() {
  var timeToFirstPaint = getTimeToFirstPaintIfSupported();

  log(`sendTimeToFirstPaint() = ${Math.round(timeToFirstPaint)}`);

  if (timeToFirstPaint) {
    gtag('event', 'firstpaint', {
      event_category: 'Performance',
      // Rounds to the nearest millisecond since
      // event values in Google Analytics must be integers.
      value: Math.round(timeToFirstPaint),
      // Sends this as a non-interaction event,
      // so it doesn't affect bounce rate.
      non_interaction: true

      // Sets the current service worker status as the value of
      // `dimension1` for this event.
      // dimension1: getServiceWorkerStatus()
    });
  }
}

// // Creates the tracker object.
// ga('create', 'UA-XXXXX-Y', 'auto');

// // Sends a pageview for the initial pageload.
// ga('send', 'pageview');

// Sends an event with the time to first paint data.
// sendTimeToFirstPaint();