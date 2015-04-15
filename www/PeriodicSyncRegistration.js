/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

var exec = require('cordova/exec');

function PeriodicSyncRegistration(options) {
    options = options || {};
    this.tag = options.tag || "";
    this.minPeriod = options.minPeriod || 0;
    this.networkState = SyncNetworkState.online;
    if (typeof options.networkState != 'undefined') { //This is necessary since the default is nonzero - would overwrite custom 0 value with ||
	this.networkState = options.networkState;
    }
    this.powerState = options.powerState || SyncPowerState.auto;
    this._timestamp = options._timestamp || Date.now();
}

PeriodicSyncRegistration.prototype.unregister = function() {
    var tag = this.tag;
    return new Promise(function(resolve, reject) {
	function success(didUnregister) {
	    resolve(!!didUnregister);
	}
	exec(success, null, "BackgroundSync", "unregister", [tag, "periodic"]);
    });
};

module.exports = PeriodicSyncRegistration;