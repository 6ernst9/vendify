package com.vendify.stores.config;

import com.vendify.stores.model.ContactLinks;
import com.vendify.stores.model.Store;
import com.vendify.stores.model.Theme;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import reactor.core.publisher.Mono;
import java.util.List;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MongoDataConfig implements CommandLineRunner {
    private final ReactiveMongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        var contactLinks1 = new ContactLinks("support@exclusive.com", "0712345678", "fb", "tw", "insta");
        var theme1 = new Theme("#00ff00", "#ffffff", "#000000", "#6b7280", "Inter", "6px", "10px", "solid");

        var contactLinks2 = new ContactLinks("support@essentials.com", "0712345678", "fb", "tw", "insta");
        var theme2 = new Theme("#ff0000", "#ffffff", "#000000", "#6b7280", "Roboto", "6px", "10px", "blur");

        var exclusiveStore = new Store("6839d4104106e209e93ea39c", 1L, "Exclusive", "https://firebasestorage.googleapis.com/v0/b/isproject-6332b.appspot.com/o/logos%2Fexclusive-logo.png?alt=media&token=4ed8ca78-fb09-4e5f-bd16-2af3e4f74f35", "exclusive", "https://firebasestorage.googleapis.com/v0/b/isproject-6332b.appspot.com/o/banners%2Fbanner.png?alt=media&token=48b75737-56ca-443b-94af-b69539c546fd", List.of("Electronics", "Beauty", "Fashion", "Fragrances"), theme1, contactLinks1);
        var essentialsStore = new Store("6839d4104106e209e93ea39d", 1L, "Essentials", "https://firebasestorage.googleapis.com/v0/b/isproject-6332b.appspot.com/o/logos%2Fessentials-logo.png?alt=media&token=ceb22a2e-eef2-41bb-b2f4-e5848da159f6", "essentials", null, List.of("Electronics", "Beauty", "Fashion", "Fragrances"), theme2, contactLinks2);

        var initFlow = mongoTemplate.dropCollection(Store.class)
                .thenMany(mongoTemplate.insertAll(List.of(exclusiveStore, essentialsStore)))
                .then()
                .onErrorResume(e -> {
                    log.error("MongoDB data initialization error: {}", e.getMessage());
                    return Mono.empty();
                });

        initFlow.subscribe();
    }
}
