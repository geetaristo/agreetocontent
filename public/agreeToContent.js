const prevOnLoad = window.onload

function getAgreementCookie() {
    const name = "agreed=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {

        var c = ca[i]

        while (c.charAt(0) == ' ') c = c.substring(1) 

        if (c.indexOf(name) == 0) {
            /* return c.substring(name.length, c.length) */
            return true;
        }
    }
    return false;
}

function fadeOutOverlay( opacity ) {
  const newOpacity = opacity - 0.05;
  const overlay = document.getElementById('overlay')
  if(opacity <= 0) {
    document.body.removeChild(overlay)
    return
  }
  overlay.style.opacity = newOpacity
  setTimeout(function() {fadeOutOverlay(newOpacity)}, 10)
}

function continueYes() {
  document.cookie = 'agreed=true;'
  console.log('document.cookie = ', document.cookie)
  fadeOutOverlay(1);
}

function continueNo() {
  document.cookie = 'agreed=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  window.location = 'https://promujer.org/'
}

function getAgreement() {

  if(getAgreementCookie()) {
    console.log('document has been agreed to already');
    if(prevOnLoad) prevOnLoad()
    return;
  }

  const agreementMessage = ['<strong style="color:red;font-size:1.2em;">WARNING!</strong>',
                           '<br /><br />',
                           'This site contains uncensored photos of human child birth.',
                           '<br /><br />',
                           'Would you like to continue?<br /><br />',
                           '<span style="color:grey;font-size:0.8em;">By clicking yes, you also agree to our use of cookies.</span>'
                           ].join('')

  const overlayDiv = document.createElement('div')
  overlayDiv.id = 'overlay'
  overlayDiv.className = 'overlay'
  overlayDiv.style.padding= '20px'
  overlayDiv.style.position = 'fixed' 
  overlayDiv.style.width = '100%' 
  overlayDiv.style.height = '100%' 
  overlayDiv.style.top = 0 
  overlayDiv.style.left = 0
  overlayDiv.style.right = 0
  overlayDiv.style.bottom = 0
  overlayDiv.style.backgroundColor = 'rgba(0,0,0,0.5)'; 
  overlayDiv.style.zIndex = 2
  overlayDiv.style.cursor = 'pointer' 
  overlayDiv.style.textAlign = 'center'

  const agreementMessageBox = document.createElement('div')
  agreementMessageBox.id = 'agreementmessage'
  agreementMessageBox.className = 'agreementmessage'
  agreementMessageBox.style.width = '300px'
  /* agreementMessageBox.style.height = '200px' */
  agreementMessageBox.style.backgroundColor = 'rgba(255,255,255,1)'
  agreementMessageBox.style.padding = '25px'
  agreementMessageBox.style.margin = 'auto'
  agreementMessageBox.style.border = '1px solid black'
  agreementMessageBox.style.borderRadius = '5px'
  agreementMessageBox.style.boxShadow = '3px 5px'
  agreementMessageBox.style.fontFamily = '"Arial", sans-serif'
  const btnStyle = 'padding: 10px;border-radius: 4px;margin: 10px;box-shadow: 2px 2px;'
  agreementMessageBox.innerHTML = [ '<p>', agreementMessage, '</p>',
                                    ' <button style="', btnStyle, '" onclick="continueYes()">YES</button>',
                                    ' <button style="'+btnStyle+'"onclick="continueNo()">NO</button>'].join('')

  overlayDiv.appendChild(agreementMessageBox)

  const bod = document.body
  bod.appendChild(overlayDiv)

  if(prevOnLoad) prevOnLoad()
}

window.onload = getAgreement
