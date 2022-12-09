package com.ecoboost.gateway.repository;

import com.ecoboost.gateway.domain.UserExtra;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the UserExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraRepository extends ReactiveMongoRepository<UserExtra, String> {
    @Query("{}")
    Flux<UserExtra> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<UserExtra> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<UserExtra> findOneWithEagerRelationships(String id);
}
