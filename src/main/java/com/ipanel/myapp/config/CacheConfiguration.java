package com.ipanel.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.ipanel.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.ipanel.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.ipanel.myapp.domain.User.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Authority.class.getName());
            createCache(cm, com.ipanel.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.ipanel.myapp.domain.Inventory.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Vendor.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Purchases.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Purchases.class.getName() + ".items");
            createCache(cm, com.ipanel.myapp.domain.PurchaseItems.class.getName());
            createCache(cm, com.ipanel.myapp.domain.CustomerDetails.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Sales.class.getName());
            createCache(cm, com.ipanel.myapp.domain.Sales.class.getName() + ".items");
            createCache(cm, com.ipanel.myapp.domain.SalesItems.class.getName());
            createCache(cm, com.ipanel.myapp.domain.ReturnsData.class.getName());
            createCache(cm, com.ipanel.myapp.domain.ReturnsData.class.getName() + ".items");
            createCache(cm, com.ipanel.myapp.domain.ReturnItems.class.getName());
            createCache(cm, com.ipanel.myapp.domain.UserDetails.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
