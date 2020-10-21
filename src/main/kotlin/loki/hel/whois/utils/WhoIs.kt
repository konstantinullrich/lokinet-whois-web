package loki.hel.whois.utils

import org.apache.commons.net.whois.WhoisClient

class WhoIs(private val whoIsServer: String) {
    private fun parseWhoIs(whoIsResult: String): WhoIsResult {
        val result = WhoIsResult()
        val lines = whoIsResult.split("\n")
        for (line in lines) {
            val parts = line.split(":")
            if (parts.size == 2) {
                val key = parts[0].trim { it <= ' ' }
                val value = parts[1].trim { it <= ' ' }
                when (key) {
                    "expiration_height" -> result.expirationHeight = Integer.parseInt(value)
                    "name_hash" -> result.nameHash = value
                    "owner" -> result.owner = value
                    "txid" -> result.txId = value
                    "type" -> result.type = Integer.parseInt(value)
                    "update_height" -> result.updateHeight = Integer.parseInt(value)
                    "current-address" -> result.currentAddress = value
                    else -> {
                    }
                }
            }
        }
        return result
    }

    fun getWhois(domainName: String): WhoIsResult {
        var result = ""
        val whois = WhoisClient()
        try {
            whois.connect(whoIsServer)
            val whoisData: String = whois.query(domainName)
            result = whoisData
            whois.disconnect()
        } catch (e: Exception) {
            e.printStackTrace()
        }

        if (result.startsWith("; no results for")) throw NoSuchElementException()

        return parseWhoIs(result)
    }
}