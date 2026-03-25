importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDtWQUwr_p0uRM8-9uUFAetWG9CPmykrwo",
  authDomain: "cn-news-86ceb.firebaseapp.com",
  projectId: "cn-news-86ceb",
  databaseURL: "https://cn-news-86ceb-default-rtdb.firebaseio.com",
  storageBucket: "cn-news-86ceb.firebasestorage.app",
  messagingSenderId: "612886681954",
  appId: "1:612886681954:web:9eaf0090f129aaf486743b",
  measurementId: "G-LQMJVDX010"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message received:', payload);
  const notificationTitle = payload.notification?.title || 'CN News';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: 'https://raw.githubusercontent.com/jeevrajdhakar1-hub/casininet-site/refs/heads/main/images/IMG_0945.png',
    badge: 'https://raw.githubusercontent.com/jeevrajdhakar1-hub/casininet-site/refs/heads/main/images/IMG_0945.png',
    image: payload.notification?.image || '',
    data: { url: payload.data?.url || 'https://casininet.com' }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
