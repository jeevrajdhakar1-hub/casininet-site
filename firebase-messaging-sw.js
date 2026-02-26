
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Apne Naye Firebase Project ki Config yahan chipkayein
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase ko initialize karein
firebase.initializeApp(firebaseConfig);

// Messaging service activate karein
const messaging = firebase.messaging();

// Jab App background mein ho, tab notification dikhane ka logic
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message received: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'images/IMG_0945.jpg', // Aapka logo
    badge: 'images/IMG_0945.jpg',
    data: {
      url: payload.data.url || '/' // Click karne par kahan le jana hai
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification par click karne par website khulne ka logic
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
