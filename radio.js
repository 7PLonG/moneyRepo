// ==UserScript==
// @name         广播挂件
// @namespace    https://greasyfork.org/users/385498
// @version      0.1
// @description  直引到中国之声
// @author       syb | 7P_LonG
// @include *
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    const tipid = 'radio-text';//提示框id
    const wintip = `<div id="radio-wrapper"
	style="position: fixed;right: 10px;top: 50px;background: #eee;
		width: 50px;height: 50px;z-index:99999;border:1px solid #999;">
	<p class="btn-ctrl" style="background: greenyellow;">play</p>
	<p id="radio-text"></p>
	<audio id="radio-player" src="" preload="auto" ></audio>
</div>`;
    const win = document.createElement('div');
    win.innerHTML = wintip;
    document.getElementsByTagName('body')[0].append(win);
    const show = (e) => {
        e = e.toString();
        document.getElementById(tipid).textContent = e;
    };
    const srcArr = [
        '//rtmpcnr001.cnr.cn/live/zgzs/playlist.m3u8',
        '//lhttp.qingting.fm/live/386/64k.mp3'
    ];
    let isOn = false;
    const wrapper = document.getElementById("radio-wrapper");
    const audio = document.getElementById('radio-player');
    const btn = wrapper.querySelector(".btn-ctrl");
    audio.src = srcArr[0];
    //如官方链接报错，直接移除到下一个资源。
    //[1]为三方备用资源，有延时
    //支持edge,chrome,firefox
    audio.addEventListener('error', function (e) {
        audio.src = srcArr.shift();
        if (isOn) {
            audio.play()
        }
    });
	
    btn.addEventListener('click', function () {
        isOn = true;
        if (audio.paused === true) {
            audio.play()
        } else {
            audio.pause()
            btn.textContent = 'play';
        }
        setTimeout(function () {
            if (!audio.paused) {
                btn.textContent = 'stop';
            }
        }, 1000)
    });
})();
