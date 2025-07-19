package com.vendify.products.config;

import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.r2dbc.connection.init.CompositeDatabasePopulator;
import org.springframework.r2dbc.connection.init.ConnectionFactoryInitializer;
import org.springframework.r2dbc.connection.init.ResourceDatabasePopulator;

@Configuration
public class ConnectionInitializer {
    @Bean
    public ConnectionFactoryInitializer productsInitializer(ConnectionFactory connectionFactory) {
        var initializer = new ConnectionFactoryInitializer();
        initializer.setConnectionFactory(connectionFactory);
        var populator = new CompositeDatabasePopulator();
        populator.addPopulators(new ResourceDatabasePopulator(new ClassPathResource("db/schema.sql")));
        populator.addPopulators(new ResourceDatabasePopulator(new ClassPathResource("db/sales.sql")));
        populator.addPopulators(new ResourceDatabasePopulator(new ClassPathResource("db/data.sql")));
        initializer.setDatabasePopulator(populator);
        return initializer;
    }
}