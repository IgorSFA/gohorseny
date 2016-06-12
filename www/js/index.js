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
    "app1": {
        in: function ( ) {
            document.getElementById( 'app1' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'app1' ).classList.add( 'hidden' );
        }
    },
    "app2": {
        in: function ( ) {
            document.getElementById( 'app2' ).classList.remove( 'hidden' );
        },
        out: function ( ) {
            document.getElementById( 'app2' ).classList.add( 'hidden' );
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
        views[ 'app1' ].in();

        setTimeout( function () {
            app.transition('app1', 'app2');
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
    camera: function ( ) {
        console.log('ho');
    }
};