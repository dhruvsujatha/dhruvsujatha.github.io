function copyGpgKey() {
    const gpgKeyText = document.querySelector('.output').textContent;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = gpgKeyText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = '<p>GPG Key copied to clipboard!</p>';
    document.body.appendChild(alert);

    setTimeout(() => {
        document.body.removeChild(alert);
    }, 2000);
}

function downloadGpgKey() {
    const gpgKeyText = document.querySelector('.output').textContent;
    const blob = new Blob([gpgKeyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dsujatha_gpg.key';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function viewGpgKey() {
    const url = `https://pgp.mit.edu/pks/lookup?op=get&search=0x5C63285281E6995F`;
    const newWindow = window.open(url, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('Failed to open new window. Please check your pop-up blocker settings.');
    }
}

function loadFile() {
    fetch('https://dsujatha.xyz/public/dsujatha_gpg.key')
        .then(response => response.text())
        .then(content => {
            displayFileContent(content);
        })
        .catch(error => {
            console.error('Error loading file:', error);
        });
}

function displayFileContent(content) {
    const outputDiv = document.querySelector('.output');
    outputDiv.textContent = content;
}

// Load the file on page load (optional)
window.onload = function() {
    loadFile();
};
