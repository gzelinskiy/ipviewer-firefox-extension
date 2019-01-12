var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) { // xhrRequest.DONE == 4
        if (xhr.status == 200) {
            var responseArray = JSON.parse(xhr.responseText);

            if (responseArray && (typeof (responseArray) == 'object') && (responseArray instanceof Array) && (responseArray.length > 0)) {
                var ip = "";
                for (var i = 0; i < responseArray.length; i++) {
                    if (responseArray[i].type && responseArray[i].type === "A" && responseArray[i].value) {
                        ip = responseArray[i].value;
                    }
                }

                //Define styles
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '.ipviewer { position: fixed; bottom: 0px; font-size: 12px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; cursor: default; z-index: 9999; line-height: 1; vertical-align: baseline; user-select: none; background: rgb(241, 237, 237); padding: 5px; border-width: 1px 1px 0px; border-style: solid solid solid; border-color: rgb(145, 145, 145) rgb(145, 145, 145) rgb(145, 145, 145); border-image: initial; border-bottom: 0px; outline: 0px; margin: 0px; } .ipviewer_left { left: 1% } .ipviewer_right { right: 1% } ';
                document.getElementsByTagName('head')[0].appendChild(style);

                //Define element
                var body = document.getElementsByTagName("body")[0];
                var div = document.createElement("div");
                div.setAttribute("class", "ipviewer ipviewer_right");
                div.onmouseover = function () {
                    if (div.getAttribute("class").indexOf("ipviewer_right") > -1) {
                        div.setAttribute("class", "ipviewer ipviewer_left");
                    } else if (div.getAttribute("class").indexOf("ipviewer_left") > -1) {
                        div.setAttribute("class", "ipviewer ipviewer_right");
                    }
                };

                var textNode = document.createTextNode(ip);
               
                div.appendChild(textNode);
                body.appendChild(div);
                //console.log(ip);
            }
        }
    }
};

xhr.open('GET', 'https://dns-api.org/A/' + location.host, true);

xhr.send();