package loki.hel.whois.servelets

import com.google.gson.Gson
import loki.hel.whois.utils.ErrorMessage
import loki.hel.whois.utils.ErrorType
import loki.hel.whois.utils.WhoIs
import org.apache.http.NameValuePair
import org.apache.http.client.utils.URLEncodedUtils
import java.io.PrintWriter
import java.nio.charset.Charset
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class WhoIsServlet(private val whoIs: WhoIs) : HttpServlet() {

    override fun doGet(request: HttpServletRequest?, response: HttpServletResponse?) {
        request ?: return
        response ?: return

        response.addHeader("Access-Control-Allow-Origin", "*")
        response.addHeader("Access-Control-Allow-Credentials", "true")
        response.addHeader("Access-Control-Allow-Methods", "GET")
        response.addHeader("Access-Control-Allow-Headers", "Content-Type")

        var query = ""
        val responseWriter: PrintWriter = response.writer
        response.contentType = "application/json"
        response.characterEncoding = "UTF-8"

        if (request.queryString.isNullOrBlank()) {
            response.status = 400
            responseWriter.print(
                    Gson().toJson(
                            ErrorMessage(
                                    error = ErrorType.MALFORMED,
                                    message = "It seems you forget the 'q' parameter."
                            )
                    )
            )
            return
        }
        val params: List<NameValuePair> = URLEncodedUtils.parse(
                request.queryString, Charset.forName("UTF-8")
        )
        for (param in params) {
            if (param.name == "q") query = param.value
        }

        if (query.isBlank()) {
            response.status = 400
            responseWriter.print(
                    Gson().toJson(
                            ErrorMessage(
                                    error = ErrorType.MALFORMED,
                                    message = "You're query is to short."
                            )
                    )
            )
            return
        }
        try {
            val result = whoIs.getWhois(query)
            responseWriter.print(
                    Gson().toJson(
                            result
                    )
            )
        } catch (e: NoSuchElementException) {
            response.status = 404
            responseWriter.print(
                    Gson().toJson(
                            ErrorMessage(
                                    error = ErrorType.NOT_FOUND,
                                    message = "This LNS does not exist"
                            )
                    )
            )
        }

    }
}
