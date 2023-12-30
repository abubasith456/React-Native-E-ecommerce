export function passwordValidator(password) {
    if (!password) return "Password can't be empty."
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    return ''
}

export function confirmPasswordValidator(password, confirmPassword) {
    if (password != confirmPassword) {
        return "Password Not Matching!"
    }
    return ''
}