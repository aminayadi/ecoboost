package com.ecoboost.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import com.ecoboost.gateway.IntegrationTest;
import com.ecoboost.gateway.domain.UserExtra;
import com.ecoboost.gateway.repository.UserExtraRepository;
import com.ecoboost.gateway.service.UserExtraService;
import com.ecoboost.gateway.service.dto.UserExtraDTO;
import com.ecoboost.gateway.service.mapper.UserExtraMapper;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Integration tests for the {@link UserExtraResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class UserExtraResourceIT {

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/user-extras";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private UserExtraRepository userExtraRepository;

    @Mock
    private UserExtraRepository userExtraRepositoryMock;

    @Autowired
    private UserExtraMapper userExtraMapper;

    @Mock
    private UserExtraService userExtraServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private UserExtra userExtra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExtra createEntity() {
        UserExtra userExtra = new UserExtra().phone(DEFAULT_PHONE);
        return userExtra;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExtra createUpdatedEntity() {
        UserExtra userExtra = new UserExtra().phone(UPDATED_PHONE);
        return userExtra;
    }

    @BeforeEach
    public void initTest() {
        userExtraRepository.deleteAll().block();
        userExtra = createEntity();
    }

    @Test
    void createUserExtra() throws Exception {
        int databaseSizeBeforeCreate = userExtraRepository.findAll().collectList().block().size();
        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeCreate + 1);
        UserExtra testUserExtra = userExtraList.get(userExtraList.size() - 1);
        assertThat(testUserExtra.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    void createUserExtraWithExistingId() throws Exception {
        // Create the UserExtra with an existing ID
        userExtra.setId("existing_id");
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        int databaseSizeBeforeCreate = userExtraRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllUserExtrasAsStream() {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        List<UserExtra> userExtraList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(UserExtraDTO.class)
            .getResponseBody()
            .map(userExtraMapper::toEntity)
            .filter(userExtra::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(userExtraList).isNotNull();
        assertThat(userExtraList).hasSize(1);
        UserExtra testUserExtra = userExtraList.get(0);
        assertThat(testUserExtra.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    void getAllUserExtras() {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        // Get all the userExtraList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(userExtra.getId()))
            .jsonPath("$.[*].phone")
            .value(hasItem(DEFAULT_PHONE));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserExtrasWithEagerRelationshipsIsEnabled() {
        when(userExtraServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(userExtraServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUserExtrasWithEagerRelationshipsIsNotEnabled() {
        when(userExtraServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(userExtraRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getUserExtra() {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        // Get the userExtra
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, userExtra.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(userExtra.getId()))
            .jsonPath("$.phone")
            .value(is(DEFAULT_PHONE));
    }

    @Test
    void getNonExistingUserExtra() {
        // Get the userExtra
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingUserExtra() throws Exception {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();

        // Update the userExtra
        UserExtra updatedUserExtra = userExtraRepository.findById(userExtra.getId()).block();
        updatedUserExtra.phone(UPDATED_PHONE);
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(updatedUserExtra);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, userExtraDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
        UserExtra testUserExtra = userExtraList.get(userExtraList.size() - 1);
        assertThat(testUserExtra.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    void putNonExistingUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, userExtraDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateUserExtraWithPatch() throws Exception {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();

        // Update the userExtra using partial update
        UserExtra partialUpdatedUserExtra = new UserExtra();
        partialUpdatedUserExtra.setId(userExtra.getId());

        partialUpdatedUserExtra.phone(UPDATED_PHONE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedUserExtra.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedUserExtra))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
        UserExtra testUserExtra = userExtraList.get(userExtraList.size() - 1);
        assertThat(testUserExtra.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    void fullUpdateUserExtraWithPatch() throws Exception {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();

        // Update the userExtra using partial update
        UserExtra partialUpdatedUserExtra = new UserExtra();
        partialUpdatedUserExtra.setId(userExtra.getId());

        partialUpdatedUserExtra.phone(UPDATED_PHONE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedUserExtra.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedUserExtra))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
        UserExtra testUserExtra = userExtraList.get(userExtraList.size() - 1);
        assertThat(testUserExtra.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    void patchNonExistingUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, userExtraDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamUserExtra() throws Exception {
        int databaseSizeBeforeUpdate = userExtraRepository.findAll().collectList().block().size();
        userExtra.setId(UUID.randomUUID().toString());

        // Create the UserExtra
        UserExtraDTO userExtraDTO = userExtraMapper.toDto(userExtra);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(userExtraDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the UserExtra in the database
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteUserExtra() {
        // Initialize the database
        userExtraRepository.save(userExtra).block();

        int databaseSizeBeforeDelete = userExtraRepository.findAll().collectList().block().size();

        // Delete the userExtra
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, userExtra.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<UserExtra> userExtraList = userExtraRepository.findAll().collectList().block();
        assertThat(userExtraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
