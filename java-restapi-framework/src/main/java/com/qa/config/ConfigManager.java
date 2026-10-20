package com.qa.config;

import java.io.InputStream;
import java.util.Properties;

public class ConfigManager {
    private static Properties prop = new Properties();

    static {
        try (InputStream input = ConfigManager.class.getClassLoader().getResourceAsStream("config-qa.properties")) {
            if (input != null) {
                prop.load(input);
            } else {
                throw new RuntimeException("config-qa.properties not found in classpath");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to load configuration properties: " + e.getMessage());
        }
    }

    public static String getProperty(String key) {
        return prop.getProperty(key);
    }
}
