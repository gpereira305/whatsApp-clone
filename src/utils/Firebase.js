import firebase from 'firebase';
// const firebase = require('firebase');
require('firebase/firestore');




export class Firebase {

    constructor(){

        this._config = { 
                apiKey: "AIzaSyCRE82jaNWo2_tUNm5zm-EvSd-QbzdHWp4",
                authDomain: "whatsapp-clone-e9f8e.firebaseapp.com",
                projectId: "whatsapp-clone-e9f8e",
                // storageBucket: "whatsapp-clone-e9f8e.appspot.com",
                storageBucket: "gs://whatsapp-clone-e9f8e.appspot.com",
                messagingSenderId: "255709543738",
                appId: "1:255709543738:web:dbc2fbd036b6849e89e403",
                measurementId: "G-3T6SZW4R30"
              
        }

        this.init();
    }

    init(){

        if(!window._initializedFirebase){ 
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        }
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage(); 
    }

    initAuth(){
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {
                let token = result.credential.accessToken;
                let user = result.user;
                s({user, token});

            }).catch(err => {
                f(err);
            });
        });
    }

}