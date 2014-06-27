function trying(s) {
    var url = 'http://208.94.117.57';
    var XHR = window.XDomainRequest || window.XMLHttpRequest
    var xhr = new XHR();
    xhr.open('GET', url, true);
    // заміна onreadystatechange
    xhr.onload = function() {
        document.getElementById('latex').innerHTML = xhr.responseText
        document.getElementById('latex').value = s;
    }
    xhr.onerror = function() {
        alert("Error")
    }

    xhr.send()
}

function setv(s) {
    var obj = document.getElementById('formula');
    obj.innerHTML = s;
}
