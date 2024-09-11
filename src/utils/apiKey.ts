export const generateKey = (length: number = 32) => {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    const allChars =  upperCase + lowerCase + numbers + specialChars;

    let key = ''

    for (let i = 0; i < length ; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length)
        key += allChars[randomIndex]
    }

    return key
}