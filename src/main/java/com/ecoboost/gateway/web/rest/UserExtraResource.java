package com.ecoboost.gateway.web.rest;

import com.ecoboost.gateway.repository.UserExtraRepository;
import com.ecoboost.gateway.service.UserExtraService;
import com.ecoboost.gateway.service.dto.UserExtraDTO;
import com.ecoboost.gateway.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link com.ecoboost.gateway.domain.UserExtra}.
 */
@RestController
@RequestMapping("/api")
public class UserExtraResource {

    private final Logger log = LoggerFactory.getLogger(UserExtraResource.class);

    private static final String ENTITY_NAME = "userExtra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserExtraService userExtraService;

    private final UserExtraRepository userExtraRepository;

    public UserExtraResource(UserExtraService userExtraService, UserExtraRepository userExtraRepository) {
        this.userExtraService = userExtraService;
        this.userExtraRepository = userExtraRepository;
    }

    /**
     * {@code POST  /user-extras} : Create a new userExtra.
     *
     * @param userExtraDTO the userExtraDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userExtraDTO, or with status {@code 400 (Bad Request)} if the userExtra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-extras")
    public Mono<ResponseEntity<UserExtraDTO>> createUserExtra(@RequestBody UserExtraDTO userExtraDTO) throws URISyntaxException {
        log.debug("REST request to save UserExtra : {}", userExtraDTO);
        if (userExtraDTO.getId() != null) {
            throw new BadRequestAlertException("A new userExtra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return userExtraService
            .save(userExtraDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/user-extras/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /user-extras/:id} : Updates an existing userExtra.
     *
     * @param id the id of the userExtraDTO to save.
     * @param userExtraDTO the userExtraDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtraDTO,
     * or with status {@code 400 (Bad Request)} if the userExtraDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userExtraDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-extras/{id}")
    public Mono<ResponseEntity<UserExtraDTO>> updateUserExtra(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody UserExtraDTO userExtraDTO
    ) throws URISyntaxException {
        log.debug("REST request to update UserExtra : {}, {}", id, userExtraDTO);
        if (userExtraDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userExtraDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return userExtraRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return userExtraService
                    .update(userExtraDTO)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.getId()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /user-extras/:id} : Partial updates given fields of an existing userExtra, field will ignore if it is null
     *
     * @param id the id of the userExtraDTO to save.
     * @param userExtraDTO the userExtraDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtraDTO,
     * or with status {@code 400 (Bad Request)} if the userExtraDTO is not valid,
     * or with status {@code 404 (Not Found)} if the userExtraDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the userExtraDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-extras/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<UserExtraDTO>> partialUpdateUserExtra(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody UserExtraDTO userExtraDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserExtra partially : {}, {}", id, userExtraDTO);
        if (userExtraDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userExtraDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return userExtraRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<UserExtraDTO> result = userExtraService.partialUpdate(userExtraDTO);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, res.getId()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /user-extras} : get all the userExtras.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userExtras in body.
     */
    @GetMapping("/user-extras")
    public Mono<List<UserExtraDTO>> getAllUserExtras(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all UserExtras");
        return userExtraService.findAll().collectList();
    }

    /**
     * {@code GET  /user-extras} : get all the userExtras as a stream.
     * @return the {@link Flux} of userExtras.
     */
    @GetMapping(value = "/user-extras", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<UserExtraDTO> getAllUserExtrasAsStream() {
        log.debug("REST request to get all UserExtras as a stream");
        return userExtraService.findAll();
    }

    /**
     * {@code GET  /user-extras/:id} : get the "id" userExtra.
     *
     * @param id the id of the userExtraDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userExtraDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-extras/{id}")
    public Mono<ResponseEntity<UserExtraDTO>> getUserExtra(@PathVariable String id) {
        log.debug("REST request to get UserExtra : {}", id);
        Mono<UserExtraDTO> userExtraDTO = userExtraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userExtraDTO);
    }

    /**
     * {@code DELETE  /user-extras/:id} : delete the "id" userExtra.
     *
     * @param id the id of the userExtraDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-extras/{id}")
    public Mono<ResponseEntity<Void>> deleteUserExtra(@PathVariable String id) {
        log.debug("REST request to delete UserExtra : {}", id);
        return userExtraService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity
                        .noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id))
                        .build()
                )
            );
    }
}
