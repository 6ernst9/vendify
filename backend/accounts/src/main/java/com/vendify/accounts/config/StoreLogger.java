package com.vendify.accounts.config;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class StoreLogger {

    public static final String LOG_DIR = "logs";
    private static final DateTimeFormatter TIMESTAMP_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void log(String storeId, String message) {
        var timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
        var logMessage = "[" + timestamp + "] " + message;

        try {
            var dir = new File(LOG_DIR);
            if (!dir.exists()) dir.mkdirs();

            var logFile = new File(dir, "store-" + storeId + ".log");
            try (var writer = new BufferedWriter(new FileWriter(logFile, true))) {
                writer.write(logMessage);
                writer.newLine();
            }

        } catch (IOException e) {
            System.err.println("Failed to write log for store " + storeId + ": " + e.getMessage());
        }
    }
}
