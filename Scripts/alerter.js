﻿//Live
if (!localStorage.setItem("ice_poseidon_live", false)) localStorage.setItem("ice_poseidon_live", false);
if (!localStorage.setItem("sam_pepper_live", false)) localStorage.setItem("sam_pepper_live", false);
if (!localStorage.setItem("tracksuit_andy_live", false)) localStorage.setItem("tracksuit_andy_live", false);
if (!localStorage.setItem("ebz_live", false)) localStorage.setItem("ebz_live", false);
if (!localStorage.setItem("onlyusemeblade_live", false)) localStorage.setItem("onlyusemeblade_live", false);
if (!localStorage.setItem("marie_live", false)) localStorage.setItem("marie_live", false);
if (!localStorage.setItem("hypeman_vince_live", false)) localStorage.setItem("hypeman_vince_live", false);
if (!localStorage.setItem("asian_andy_live", false)) localStorage.setItem("asian_andy_live", false);
if (!localStorage.setItem("bjorn_live", false)) localStorage.setItem("bjorn_live", false);
if (!localStorage.setItem("gray_live", false)) localStorage.setItem("gray_live", false);
if (!localStorage.setItem("kiedom_live", false)) localStorage.setItem("kiedom_live", false);
if (!localStorage.setItem("sweeterin_live", false)) localStorage.setItem("sweeterin_live", false);
if (!localStorage.setItem("mexicanandy_live", false)) localStorage.setItem("mexicanandy_live", false);
if (!localStorage.setItem("anything4views_live", false)) localStorage.setItem("anything4views_live", false);
if (!localStorage.setItem("hyphonix_live", false)) localStorage.setItem("hyphonix_live", false);
if (!localStorage.setItem("mizkif_live", false)) localStorage.setItem("mizkif_live", false);
if (!localStorage.setItem("vexxed_live", false)) localStorage.setItem("vexxed_live", false);
//Toggles
if (!localStorage.ice_poseidon_enabled) localStorage.setItem("ice_poseidon_enabled", "true");
if (!localStorage.sam_pepper_enabled) localStorage.setItem("sam_pepper_enabled", "true");
if (!localStorage.tracksuit_andy_enabled) localStorage.setItem("tracksuit_andy_enabled", "true");
if (!localStorage.ebz_enabled) localStorage.setItem("ebz_enabled", "true");
if (!localStorage.onlyusemeblade_enabled) localStorage.setItem("onlyusemeblade_enabled", "true");
if (!localStorage.marie_enabled) localStorage.setItem("marie_enabled", "true");
if (!localStorage.hypeman_vince_enabled) localStorage.setItem("hypeman_vince_enabled", "true");
if (!localStorage.asian_andy_enabled) localStorage.setItem("asian_andy_enabled", "true");
if (!localStorage.bjorn_enabled) localStorage.setItem("bjorn_enabled", "true");
if (!localStorage.gray_enabled) localStorage.setItem("gray_enabled", "true");
if (!localStorage.kiedom_enabled) localStorage.setItem("kiedom_enabled", "true");
if (!localStorage.sweeterin_enabled) localStorage.setItem("sweeterin_enabled", "true");
if (!localStorage.mexicanandy_enabled) localStorage.setItem("mexicanandy_enabled", "true");
if (!localStorage.anything4views_enabled) localStorage.setItem("anything4views_enabled", "true");
if (!localStorage.hyphonix_enabled) localStorage.setItem("hyphonix_enabled", "true");
if (!localStorage.mizkif_enabled) localStorage.setItem("mizkif_enabled", "true");
if (!localStorage.vexxed_enabled) localStorage.setItem("vexxed_enabled", "true");
//Settings
if (!localStorage.notification_enabled) localStorage.setItem("notification_enabled", "true");
if (!localStorage.sound_enabled) localStorage.setItem("sound_enabled", "true");
if (!localStorage.time_enabled) localStorage.setItem("time_enabled", "true");
if (!localStorage.icon_enabled) localStorage.setItem("icon_enabled", "true");
if (!localStorage.interaction_enabled) localStorage.setItem("interaction_enabled", "true");
if (!localStorage.volume) localStorage.setItem("volume", "40");

const SOUND_EFFECT = new Audio('sounds/online.mp3');
var myAlarm = {
    delayInMinutes: 1,
    periodInMinutes:1
}

chrome.alarms.create("timer1", myAlarm);
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "timer1") {
        console.clear();
        search();
    }
});
 
chrome.notifications.onClicked.addListener(function(notification, byUser) {
    chrome.tabs.create({url: "https://www.iceposeidon.com/"});
    chrome.notifications.clear(notification);
});


function onInstall() {
    console.log("Extension Installed");
}

function onUpdate() {
    console.log("Extension Updated");
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        //console.log(data.streamers.length)
        var i;
        for(i = 0; i < data.streamers.length; i++){
            temp1 = data.streamers[number].id;
            id = temp1.toString();
            localStorage.setItem(id+"_live", true);
        }
    })
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
        onInstall();
    } else {
        onUpdate();
    }
    localStorage['version'] = currVersion;
}

search();
function search() {
    //console.clear() 
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit

        if(data.success == true){
            console.log("success")
            console.log(data.streamers.length)
            var i;
            for(i = 0; i < data.streamers.length; i++){
                check(i);
            }
            function check(number){
                //Removes Non ascii chars like emoji
                name = data.streamers[number].name.replace(/[^\x00-\x7F]/g, "");
                temp1 = data.streamers[number].id
                id = temp1.toString();
                console.log("Name: " + name)
                //console.log("Id: "+id)
                console.log("Live: "+data.streamers[number].liveData.live)
                console.log("Variable: "+localStorage.getItem(id+"_live"))
                console.log(" ")

                if(data.streamers[number].liveData.live === false){
                    localStorage.setItem(id+"_live", false);
                }
                if(data.streamers[number].liveData.live === true){
                    if(localStorage.getItem(id+"_live") === "false"){
                        if(localStorage.getItem(id+"_enabled") === "true"){
                            if (localStorage.getItem("notification_enabled") === "true") {
                                const time = /(..)(:..)/.exec(new Date());
                                const hour = time[1] % 12 || 12;
                                const period = time[1] < 12 ? 'AM' : 'PM';
                                //Enable disable time shit
                                if (localStorage.getItem("time_enabled") === "true"){
                                    var time2 = (' (' + hour + time[2] + ' ' + period + ')')
                                }
                                else{
                                    var time2 = "";
                                }
                                //Customised images
                                if(localStorage.getItem("icon_enabled") === "true"){
                                    var image = "/icon/people/"+id+".png";
                                }
                                else{
                                    var image = "/icon/people/default.png"
                                }
                                if(localStorage.getItem("interaction_enabled") === "true"){
                                    var notification={
                                        type : "basic",
                                        iconUrl : image,
                                        message : name+ "is live",
                                        title: 'Cx Network Notifier'+ time2,
                                        requireInteraction: true,
                                    }
                                    chrome.notifications.create(notification);
                                }
                                else{
                                    var notification={
                                        type : "basic",
                                        iconUrl : image,
                                        message : name+ "is live",
                                        title: 'Cx Network Notifier'+time2,
                                        requireInteraction: false,
                                    }
                                    chrome.notifications.create(notification);
                                }
                            }
                            if (localStorage.getItem("sound_enabled") === "true") {
                                const volume = (localStorage.getItem("volume") / 100);

                                SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
                                SOUND_EFFECT.play();
                            }
                        }
                        else{
                            if (localStorage.getItem("sound_enabled") === "true") {
                                const volume = (localStorage.getItem("volume") / 100);

                                SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
                                SOUND_EFFECT.play();
                            }
                        }
                        localStorage.setItem(id+"_live", true);
                    }
                }
            } 
        }
    else{
        console.log("failed")
    }
    });
}
