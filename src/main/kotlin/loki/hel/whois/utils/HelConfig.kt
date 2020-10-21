package loki.hel.whois.utils

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import java.io.File

class HelConfig {
    var port: Int = 8080
    var webAppPath: String = ""
    var whoIsServer: String = "public.loki.foundation"

    companion object {
        fun fromFile(path: String): HelConfig {
            val file = File(path)
            if (!file.exists()) throw NoSuchElementException("The config-file does not exist \nPath: $path")
            return fromFile(file)
        }

        fun fromFile(file: File): HelConfig {
            val helConfig = HelConfig()
            val conf: Config = ConfigFactory.parseFile(file)

            if (conf.hasPath("port")) helConfig.port = conf.getInt("port")
            if (conf.hasPath("webAppPath")) helConfig.webAppPath = conf.getString("webAppPath")

            return helConfig
        }
    }
}
