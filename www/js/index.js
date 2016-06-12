/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var views = {
    "load__screen": {
        in: function ( ) {
            document.getElementById( 'load__screen' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'load__screen' ).classList.add( 'hidden' );
        }
    },
    "face__login": {
        in: function ( ) {
            document.getElementById( 'face__login' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'face__login' ).classList.add( 'hidden' );
        }
    },
    "master__login": {
        in: function ( ) {
            document.getElementById( 'master__login' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'master__login' ).classList.add( 'hidden' );
        }
    },
    "validate__phone": {
        in: function ( ) {
            document.getElementById( 'validate__phone' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'validate__phone' ).classList.add( 'hidden' );
        }
    },
    "main__screen": {
        in: function ( ) {
            document.getElementById( 'main__screen' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'main__screen' ).classList.add( 'hidden' );
        }
    },
    "payment__done": {
        in: function ( ) {
            document.getElementById( 'payment__done' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'payment__done' ).classList.add( 'hidden' );
        }
    },
    "insert__buy": {
        in: function ( ) {
            document.getElementById( 'insert__buy' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'insert__buy' ).classList.add( 'hidden' );
        }
    },
    "sold__item": {
        in: function ( ) {
            document.getElementById( 'sold__item' ).classList.remove( 'hidden' );
            setTimeout( function () {
                navigator.notification.alert("Hoje é aniversário de Natalia, deseje parabéns para ela!", 
                    function(){ }, "Olá Cauê", "Obrigado");
            }, 3000 );
        },
        out: function ( ) {
            document.getElementById( 'sold__item' ).classList.add( 'hidden' );
        }
    }
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log( 'renderme' );
        views[ 'load__screen' ].in();

        setTimeout( function () {
            app.transition('load__screen', 'face__login');
        }, 800 );

        //app.pushNotification();
    },
    pushNotification: function () {
        var push = PushNotification.init({
          "android": {
            "senderID": undefined
          },
          "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
          },
          "windows": {}
        });

        push.on('registration', function(data) {
          console.log('registration event: ' + data.registrationId);

          var oldRegId = localStorage.getItem('registrationId');
          if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('registrationId', data.registrationId);
            // Post registrationId to your app server as the value has changed
          }

          var parentElement = document.getElementById('registration');
          var listeningElement = parentElement.querySelector('.waiting');
          var receivedElement = parentElement.querySelector('.received');

          listeningElement.setAttribute('style', 'display:none;');
          receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
          console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
          console.log('notification event');
          navigator.notification.alert(
            data.message,         // message
            null,                 // callback
            data.title,           // title
            'Ok'                  // buttonName
          );
        });
    },
    transition: function ( from, dest ) {
        var fromEl = document.getElementById( from );
        var toEl = document.getElementById( dest );

        views[ from ].out();
        setTimeout( function () {
            views[ dest ].in();
        }, 400 );
    },
    cameraBuy: function ( ) {
        event.preventDefault();
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 100,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 1     // 0=JPG 1=PNG
                        };
        navigator.camera.getPicture(
            function(imageData) {
                app.transition( 'insert__buy', 'sold__item' );
            },
            function() {
                app.showAlert('Error taking picture', 'Error');
            },
            options);

        return false;
    },
    loginFb: function ( ) {
        app.transition( 'face__login', 'master__login' );
    },
    loginMaster: function ( ) {
        app.transition( 'master__login', 'main__screen' );
    },
    openPhone: function () {
        app.transition( 'face__login', 'insert__buy' );
    },
    goHome: function ( from ) {
        app.transition( from, 'main__screen' );
    }
};