export function otpValidator(otp, otpLength) {
    console.log(` ===> ${otp} and ${otpLength}`)
    if (!otp) return "OTP can't be empty."
    if (otp.length < otpLength) return `OTP must be ${otpLength}`
    return ''
}