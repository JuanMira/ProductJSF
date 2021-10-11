const firebaseConfig = {
    apiKey: "AIzaSyBlzj7luG45UKLjJHqxBTOSokSsulsPLw0",
    authDomain: "productgeek-4792f.firebaseapp.com",
    projectId: "productgeek-4792f",
    storageBucket: "productgeek-4792f.appspot.com",
    messagingSenderId: "787079278078",
    appId: "1:787079278078:web:f71076c6407f3a4f9a64af"
}

export const app = firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage()


