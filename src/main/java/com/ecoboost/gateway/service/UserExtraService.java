package com.ecoboost.gateway.service;

import com.ecoboost.gateway.domain.UserExtra;
import com.ecoboost.gateway.repository.UserExtraRepository;
import com.ecoboost.gateway.service.dto.UserExtraDTO;
import com.ecoboost.gateway.service.mapper.UserExtraMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link UserExtra}.
 */
@Service
public class UserExtraService {

    private final Logger log = LoggerFactory.getLogger(UserExtraService.class);

    private final UserExtraRepository userExtraRepository;

    private final UserExtraMapper userExtraMapper;

    public UserExtraService(UserExtraRepository userExtraRepository, UserExtraMapper userExtraMapper) {
        this.userExtraRepository = userExtraRepository;
        this.userExtraMapper = userExtraMapper;
    }

    /**
     * Save a userExtra.
     *
     * @param userExtraDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<UserExtraDTO> save(UserExtraDTO userExtraDTO) {
        log.debug("Request to save UserExtra : {}", userExtraDTO);
        return userExtraRepository.save(userExtraMapper.toEntity(userExtraDTO)).map(userExtraMapper::toDto);
    }

    /**
     * Update a userExtra.
     *
     * @param userExtraDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<UserExtraDTO> update(UserExtraDTO userExtraDTO) {
        log.debug("Request to update UserExtra : {}", userExtraDTO);
        return userExtraRepository.save(userExtraMapper.toEntity(userExtraDTO)).map(userExtraMapper::toDto);
    }

    /**
     * Partially update a userExtra.
     *
     * @param userExtraDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<UserExtraDTO> partialUpdate(UserExtraDTO userExtraDTO) {
        log.debug("Request to partially update UserExtra : {}", userExtraDTO);

        return userExtraRepository
            .findById(userExtraDTO.getId())
            .map(existingUserExtra -> {
                userExtraMapper.partialUpdate(existingUserExtra, userExtraDTO);

                return existingUserExtra;
            })
            .flatMap(userExtraRepository::save)
            .map(userExtraMapper::toDto);
    }

    /**
     * Get all the userExtras.
     *
     * @return the list of entities.
     */
    public Flux<UserExtraDTO> findAll() {
        log.debug("Request to get all UserExtras");
        return userExtraRepository.findAll().map(userExtraMapper::toDto);
    }

    /**
     * Get all the userExtras with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<UserExtraDTO> findAllWithEagerRelationships(Pageable pageable) {
        return userExtraRepository.findAllWithEagerRelationships(pageable).map(userExtraMapper::toDto);
    }

    /**
     * Returns the number of userExtras available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return userExtraRepository.count();
    }

    /**
     * Get one userExtra by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<UserExtraDTO> findOne(String id) {
        log.debug("Request to get UserExtra : {}", id);
        return userExtraRepository.findOneWithEagerRelationships(id).map(userExtraMapper::toDto);
    }

    /**
     * Delete the userExtra by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete UserExtra : {}", id);
        return userExtraRepository.deleteById(id);
    }
}
