package de.konstantinullrich.whois

import de.konstantinullrich.whois.servelets.WhoIsServlet
import de.konstantinullrich.whois.utils.HelConfig
import de.konstantinullrich.whois.utils.WhoIs
import org.eclipse.jetty.server.Handler
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.server.handler.ContextHandlerCollection
import org.eclipse.jetty.servlet.ServletContextHandler
import org.eclipse.jetty.servlet.ServletHolder
import org.eclipse.jetty.webapp.WebAppContext

class HelServer(private val config: HelConfig) {
    private val server: Server = Server(config.port)
    private val whoIs: WhoIs = WhoIs(config.whoIsServer)

    init {
        val handlers = arrayListOf<Handler>()
        val contexts = ContextHandlerCollection()

        handlers.add(getWebApp())
        handlers.add(getRestHandler())

        contexts.handlers = handlers.toTypedArray()
        server.handler = contexts
    }

    private fun getWebApp(): WebAppContext {
        val webapp = WebAppContext()
        webapp.contextPath = "/"

        webapp.war = config.webAppPath

        return webapp
    }

    private fun getRestHandler(): ServletContextHandler {
        val restContext = ServletContextHandler()
        restContext.contextPath = "/api"

        restContext.addServlet(ServletHolder(WhoIsServlet(whoIs)), "/whois")

        return restContext
    }

    fun start() {
        server.start()
    }

//    companion object {
//        @JvmStatic
//
//    }
}

fun main(args: Array<String>) {
    val helConfig = if (args.isEmpty()) HelConfig() else HelConfig.fromFile(args[0])
    val server = HelServer(helConfig)
    println("------------------- WhoIs Web-Server -------------------")
    server.start()
}
