document.addEventListener('DOMContentLoaded', function() {
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const plaintextInput = document.getElementById('plaintext');
    const keyInput = document.getElementById('key');
    const ivInput = document.getElementById('iv');
    const resultTextarea = document.getElementById('result');
    const paddedKeyDisplay = document.getElementById('paddedKeyDisplay');
    const paddedIvDisplay = document.getElementById('paddedIvDisplay');

    encryptBtn.addEventListener('click', function() {
        const plaintext = plaintextInput.value;
        const key = keyInput.value;
        const iv = ivInput.value;

        const paddedKey = padString(key, 16); // 假设使用 AES-128
        const paddedIv = padString(iv, 16);

        // 显示填充后的 KEY 和 IV
        paddedKeyDisplay.textContent = paddedKey;
        paddedIvDisplay.textContent = paddedIv;

        // 使用 CryptoJS 进行加密 (需要引入 CryptoJS 库)
        try {
            const ciphertext = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(paddedKey), {
                iv: CryptoJS.enc.Utf8.parse(paddedIv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();

            resultTextarea.value = ciphertext;
        } catch (error) {
            console.error("加密错误:", error);
            resultTextarea.value = "加密错误，请检查输入!";
        }
    });

    decryptBtn.addEventListener('click', function() {
        const ciphertext = plaintextInput.value;
        const key = keyInput.value;
        const iv = ivInput.value;

        const paddedKey = padString(key, 16);
        const paddedIv = padString(iv, 16);

        // 显示填充后的 KEY 和 IV
        paddedKeyDisplay.textContent = paddedKey;
        paddedIvDisplay.textContent = paddedIv;

        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(paddedKey), {
                iv: CryptoJS.enc.Utf8.parse(paddedIv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

            resultTextarea.value = decryptedText;
        } catch (error) {
            console.error("解密错误:", error);
            resultTextarea.value = "解密错误，请检查输入!";
        }
    });

    function padString(str, length) {
        while (str.length < length) {
            str += '0';
        }
        return str;
    }
}); 