package de.konstantinullrich.whois.utils

enum class ErrorType(val error: String) {
    MALFORMED("MALFORMED"),
    NOT_FOUND("NOT_FOUND")
}

class ErrorMessage(val error: ErrorType, val message: String)