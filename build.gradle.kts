import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

plugins {
    kotlin("jvm") version "1.4.10"
    application
    war
    id("com.github.johnrengelman.shadow") version "6.0.0"
}

group = "loki.hel"
version = "0.0.1"

val jettyVersion = "9.4.8.v20171121"
val slf4jVersion = "1.8.0-beta4"
val gsonVersion = "2.8.6"
val typesafeVersion = "1.4.0"
val httpComponentsVersion = "4.5"
val commonsNetVersion = "3.7.2"

repositories {
    mavenCentral()
    jcenter()
    maven("https://dl.bintray.com/kotlin/kotlinx")
}

dependencies {
    testImplementation(kotlin("test-junit"))
    implementation("org.eclipse.jetty:jetty-server:$jettyVersion")
    implementation("org.eclipse.jetty:jetty-webapp:$jettyVersion")
    implementation("org.eclipse.jetty.websocket:websocket-servlet:$jettyVersion")
    implementation("org.eclipse.jetty.websocket:javax-websocket-server-impl:$jettyVersion")
    implementation("org.slf4j:slf4j-api:$slf4jVersion")
    implementation("org.slf4j:slf4j-simple:$slf4jVersion")
    implementation("com.google.code.gson:gson:$gsonVersion")
    implementation("com.typesafe:config:$typesafeVersion")
    implementation("commons-net:commons-net:$commonsNetVersion")
    implementation("org.apache.httpcomponents:httpclient:$httpComponentsVersion")
}

application {
    mainClassName = "loki.hel.whois.HelServerKt"
}

tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "1.8"
}

tasks.war {
    from("./frontend/build")
}

tasks.withType<ShadowJar> {
    manifest.attributes.apply {
        put("Implementation-Title", "Whois LokiNet Server")
        put("Main-Class", "loki.hel.whois.HelServerKt")
    }
}