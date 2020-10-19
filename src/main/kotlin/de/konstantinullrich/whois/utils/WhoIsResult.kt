package de.konstantinullrich.whois.utils

data class WhoIsResult(
    var expirationHeight: Int? = null,
    var nameHash: String? = null,
    var owner: String? = null,
    var txId: String? = null,
    var type: Int? = null,
    var updateHeight: Int? = null,
    var currentAddress: String? = null
)
