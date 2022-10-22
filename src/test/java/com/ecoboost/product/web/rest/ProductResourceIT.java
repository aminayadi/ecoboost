package com.ecoboost.product.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecoboost.product.IntegrationTest;
import com.ecoboost.product.domain.Product;
import com.ecoboost.product.repository.ProductRepository;
import com.ecoboost.product.service.dto.ProductDTO;
import com.ecoboost.product.service.mapper.ProductMapper;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ProductResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProductResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_IMGNAME = "AAAAAAAAAA";
    private static final String UPDATED_IMGNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    private static final Integer DEFAULT_VOLUME = 1;
    private static final Integer UPDATED_VOLUME = 2;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Integer DEFAULT_REDUCTION = 1;
    private static final Integer UPDATED_REDUCTION = 2;

    private static final Integer DEFAULT_PRICETOGO = 1;
    private static final Integer UPDATED_PRICETOGO = 2;

    private static final Integer DEFAULT_PRICENEJ = 1;
    private static final Integer UPDATED_PRICENEJ = 2;

    private static final Integer DEFAULT_PRICECOT = 1;
    private static final Integer UPDATED_PRICECOT = 2;

    private static final Integer DEFAULT_PRICESENEG = 1;
    private static final Integer UPDATED_PRICESENEG = 2;

    private static final Integer DEFAULT_PRICEGHAN = 1;
    private static final Integer UPDATED_PRICEGHAN = 2;

    private static final String DEFAULT_DEVISETOGO = "AAAAAAAAAA";
    private static final String UPDATED_DEVISETOGO = "BBBBBBBBBB";

    private static final String DEFAULT_DEVISENEJ = "AAAAAAAAAA";
    private static final String UPDATED_DEVISENEJ = "BBBBBBBBBB";

    private static final String DEFAULT_DEVISECOT = "AAAAAAAAAA";
    private static final String UPDATED_DEVISECOT = "BBBBBBBBBB";

    private static final String DEFAULT_DEVISESENEG = "AAAAAAAAAA";
    private static final String UPDATED_DEVISESENEG = "BBBBBBBBBB";

    private static final String DEFAULT_DEVISEGHAN = "AAAAAAAAAA";
    private static final String UPDATED_DEVISEGHAN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/products";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private MockMvc restProductMockMvc;

    private Product product;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createEntity() {
        Product product = new Product()
            .name(DEFAULT_NAME)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .imgname(DEFAULT_IMGNAME)
            .description(DEFAULT_DESCRIPTION)
            .rating(DEFAULT_RATING)
            .volume(DEFAULT_VOLUME)
            .code(DEFAULT_CODE)
            .reduction(DEFAULT_REDUCTION)
            .pricetogo(DEFAULT_PRICETOGO)
            .pricenej(DEFAULT_PRICENEJ)
            .pricecot(DEFAULT_PRICECOT)
            .priceseneg(DEFAULT_PRICESENEG)
            .priceghan(DEFAULT_PRICEGHAN)
            .devisetogo(DEFAULT_DEVISETOGO)
            .devisenej(DEFAULT_DEVISENEJ)
            .devisecot(DEFAULT_DEVISECOT)
            .deviseseneg(DEFAULT_DEVISESENEG)
            .deviseghan(DEFAULT_DEVISEGHAN);
        return product;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createUpdatedEntity() {
        Product product = new Product()
            .name(UPDATED_NAME)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .imgname(UPDATED_IMGNAME)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .volume(UPDATED_VOLUME)
            .code(UPDATED_CODE)
            .reduction(UPDATED_REDUCTION)
            .pricetogo(UPDATED_PRICETOGO)
            .pricenej(UPDATED_PRICENEJ)
            .pricecot(UPDATED_PRICECOT)
            .priceseneg(UPDATED_PRICESENEG)
            .priceghan(UPDATED_PRICEGHAN)
            .devisetogo(UPDATED_DEVISETOGO)
            .devisenej(UPDATED_DEVISENEJ)
            .devisecot(UPDATED_DEVISECOT)
            .deviseseneg(UPDATED_DEVISESENEG)
            .deviseghan(UPDATED_DEVISEGHAN);
        return product;
    }

    @BeforeEach
    public void initTest() {
        productRepository.deleteAll();
        product = createEntity();
    }

    @Test
    void createProduct() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();
        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);
        restProductMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate + 1);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProduct.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testProduct.getImgname()).isEqualTo(DEFAULT_IMGNAME);
        assertThat(testProduct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProduct.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testProduct.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testProduct.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testProduct.getReduction()).isEqualTo(DEFAULT_REDUCTION);
        assertThat(testProduct.getPricetogo()).isEqualTo(DEFAULT_PRICETOGO);
        assertThat(testProduct.getPricenej()).isEqualTo(DEFAULT_PRICENEJ);
        assertThat(testProduct.getPricecot()).isEqualTo(DEFAULT_PRICECOT);
        assertThat(testProduct.getPriceseneg()).isEqualTo(DEFAULT_PRICESENEG);
        assertThat(testProduct.getPriceghan()).isEqualTo(DEFAULT_PRICEGHAN);
        assertThat(testProduct.getDevisetogo()).isEqualTo(DEFAULT_DEVISETOGO);
        assertThat(testProduct.getDevisenej()).isEqualTo(DEFAULT_DEVISENEJ);
        assertThat(testProduct.getDevisecot()).isEqualTo(DEFAULT_DEVISECOT);
        assertThat(testProduct.getDeviseseneg()).isEqualTo(DEFAULT_DEVISESENEG);
        assertThat(testProduct.getDeviseghan()).isEqualTo(DEFAULT_DEVISEGHAN);
    }

    @Test
    void createProductWithExistingId() throws Exception {
        // Create the Product with an existing ID
        product.setId("existing_id");
        ProductDTO productDTO = productMapper.toDto(product);

        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllProducts() throws Exception {
        // Initialize the database
        productRepository.save(product);

        // Get all the productList
        restProductMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].imgname").value(hasItem(DEFAULT_IMGNAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].volume").value(hasItem(DEFAULT_VOLUME)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].reduction").value(hasItem(DEFAULT_REDUCTION)))
            .andExpect(jsonPath("$.[*].pricetogo").value(hasItem(DEFAULT_PRICETOGO)))
            .andExpect(jsonPath("$.[*].pricenej").value(hasItem(DEFAULT_PRICENEJ)))
            .andExpect(jsonPath("$.[*].pricecot").value(hasItem(DEFAULT_PRICECOT)))
            .andExpect(jsonPath("$.[*].priceseneg").value(hasItem(DEFAULT_PRICESENEG)))
            .andExpect(jsonPath("$.[*].priceghan").value(hasItem(DEFAULT_PRICEGHAN)))
            .andExpect(jsonPath("$.[*].devisetogo").value(hasItem(DEFAULT_DEVISETOGO)))
            .andExpect(jsonPath("$.[*].devisenej").value(hasItem(DEFAULT_DEVISENEJ)))
            .andExpect(jsonPath("$.[*].devisecot").value(hasItem(DEFAULT_DEVISECOT)))
            .andExpect(jsonPath("$.[*].deviseseneg").value(hasItem(DEFAULT_DEVISESENEG)))
            .andExpect(jsonPath("$.[*].deviseghan").value(hasItem(DEFAULT_DEVISEGHAN)));
    }

    @Test
    void getProduct() throws Exception {
        // Initialize the database
        productRepository.save(product);

        // Get the product
        restProductMockMvc
            .perform(get(ENTITY_API_URL_ID, product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(product.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.imgname").value(DEFAULT_IMGNAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.volume").value(DEFAULT_VOLUME))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.reduction").value(DEFAULT_REDUCTION))
            .andExpect(jsonPath("$.pricetogo").value(DEFAULT_PRICETOGO))
            .andExpect(jsonPath("$.pricenej").value(DEFAULT_PRICENEJ))
            .andExpect(jsonPath("$.pricecot").value(DEFAULT_PRICECOT))
            .andExpect(jsonPath("$.priceseneg").value(DEFAULT_PRICESENEG))
            .andExpect(jsonPath("$.priceghan").value(DEFAULT_PRICEGHAN))
            .andExpect(jsonPath("$.devisetogo").value(DEFAULT_DEVISETOGO))
            .andExpect(jsonPath("$.devisenej").value(DEFAULT_DEVISENEJ))
            .andExpect(jsonPath("$.devisecot").value(DEFAULT_DEVISECOT))
            .andExpect(jsonPath("$.deviseseneg").value(DEFAULT_DEVISESENEG))
            .andExpect(jsonPath("$.deviseghan").value(DEFAULT_DEVISEGHAN));
    }

    @Test
    void getNonExistingProduct() throws Exception {
        // Get the product
        restProductMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingProduct() throws Exception {
        // Initialize the database
        productRepository.save(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product
        Product updatedProduct = productRepository.findById(product.getId()).get();
        updatedProduct
            .name(UPDATED_NAME)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .imgname(UPDATED_IMGNAME)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .volume(UPDATED_VOLUME)
            .code(UPDATED_CODE)
            .reduction(UPDATED_REDUCTION)
            .pricetogo(UPDATED_PRICETOGO)
            .pricenej(UPDATED_PRICENEJ)
            .pricecot(UPDATED_PRICECOT)
            .priceseneg(UPDATED_PRICESENEG)
            .priceghan(UPDATED_PRICEGHAN)
            .devisetogo(UPDATED_DEVISETOGO)
            .devisenej(UPDATED_DEVISENEJ)
            .devisecot(UPDATED_DEVISECOT)
            .deviseseneg(UPDATED_DEVISESENEG)
            .deviseghan(UPDATED_DEVISEGHAN);
        ProductDTO productDTO = productMapper.toDto(updatedProduct);

        restProductMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProduct.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testProduct.getImgname()).isEqualTo(UPDATED_IMGNAME);
        assertThat(testProduct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProduct.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testProduct.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testProduct.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testProduct.getReduction()).isEqualTo(UPDATED_REDUCTION);
        assertThat(testProduct.getPricetogo()).isEqualTo(UPDATED_PRICETOGO);
        assertThat(testProduct.getPricenej()).isEqualTo(UPDATED_PRICENEJ);
        assertThat(testProduct.getPricecot()).isEqualTo(UPDATED_PRICECOT);
        assertThat(testProduct.getPriceseneg()).isEqualTo(UPDATED_PRICESENEG);
        assertThat(testProduct.getPriceghan()).isEqualTo(UPDATED_PRICEGHAN);
        assertThat(testProduct.getDevisetogo()).isEqualTo(UPDATED_DEVISETOGO);
        assertThat(testProduct.getDevisenej()).isEqualTo(UPDATED_DEVISENEJ);
        assertThat(testProduct.getDevisecot()).isEqualTo(UPDATED_DEVISECOT);
        assertThat(testProduct.getDeviseseneg()).isEqualTo(UPDATED_DEVISESENEG);
        assertThat(testProduct.getDeviseghan()).isEqualTo(UPDATED_DEVISEGHAN);
    }

    @Test
    void putNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(
                put(ENTITY_API_URL_ID, productDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProductWithPatch() throws Exception {
        // Initialize the database
        productRepository.save(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product using partial update
        Product partialUpdatedProduct = new Product();
        partialUpdatedProduct.setId(product.getId());

        partialUpdatedProduct
            .rating(UPDATED_RATING)
            .volume(UPDATED_VOLUME)
            .pricecot(UPDATED_PRICECOT)
            .devisetogo(UPDATED_DEVISETOGO)
            .deviseghan(UPDATED_DEVISEGHAN);

        restProductMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProduct.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProduct))
            )
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProduct.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testProduct.getImgname()).isEqualTo(DEFAULT_IMGNAME);
        assertThat(testProduct.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProduct.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testProduct.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testProduct.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testProduct.getReduction()).isEqualTo(DEFAULT_REDUCTION);
        assertThat(testProduct.getPricetogo()).isEqualTo(DEFAULT_PRICETOGO);
        assertThat(testProduct.getPricenej()).isEqualTo(DEFAULT_PRICENEJ);
        assertThat(testProduct.getPricecot()).isEqualTo(UPDATED_PRICECOT);
        assertThat(testProduct.getPriceseneg()).isEqualTo(DEFAULT_PRICESENEG);
        assertThat(testProduct.getPriceghan()).isEqualTo(DEFAULT_PRICEGHAN);
        assertThat(testProduct.getDevisetogo()).isEqualTo(UPDATED_DEVISETOGO);
        assertThat(testProduct.getDevisenej()).isEqualTo(DEFAULT_DEVISENEJ);
        assertThat(testProduct.getDevisecot()).isEqualTo(DEFAULT_DEVISECOT);
        assertThat(testProduct.getDeviseseneg()).isEqualTo(DEFAULT_DEVISESENEG);
        assertThat(testProduct.getDeviseghan()).isEqualTo(UPDATED_DEVISEGHAN);
    }

    @Test
    void fullUpdateProductWithPatch() throws Exception {
        // Initialize the database
        productRepository.save(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product using partial update
        Product partialUpdatedProduct = new Product();
        partialUpdatedProduct.setId(product.getId());

        partialUpdatedProduct
            .name(UPDATED_NAME)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .imgname(UPDATED_IMGNAME)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .volume(UPDATED_VOLUME)
            .code(UPDATED_CODE)
            .reduction(UPDATED_REDUCTION)
            .pricetogo(UPDATED_PRICETOGO)
            .pricenej(UPDATED_PRICENEJ)
            .pricecot(UPDATED_PRICECOT)
            .priceseneg(UPDATED_PRICESENEG)
            .priceghan(UPDATED_PRICEGHAN)
            .devisetogo(UPDATED_DEVISETOGO)
            .devisenej(UPDATED_DEVISENEJ)
            .devisecot(UPDATED_DEVISECOT)
            .deviseseneg(UPDATED_DEVISESENEG)
            .deviseghan(UPDATED_DEVISEGHAN);

        restProductMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProduct.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProduct))
            )
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProduct.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testProduct.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testProduct.getImgname()).isEqualTo(UPDATED_IMGNAME);
        assertThat(testProduct.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProduct.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testProduct.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testProduct.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testProduct.getReduction()).isEqualTo(UPDATED_REDUCTION);
        assertThat(testProduct.getPricetogo()).isEqualTo(UPDATED_PRICETOGO);
        assertThat(testProduct.getPricenej()).isEqualTo(UPDATED_PRICENEJ);
        assertThat(testProduct.getPricecot()).isEqualTo(UPDATED_PRICECOT);
        assertThat(testProduct.getPriceseneg()).isEqualTo(UPDATED_PRICESENEG);
        assertThat(testProduct.getPriceghan()).isEqualTo(UPDATED_PRICEGHAN);
        assertThat(testProduct.getDevisetogo()).isEqualTo(UPDATED_DEVISETOGO);
        assertThat(testProduct.getDevisenej()).isEqualTo(UPDATED_DEVISENEJ);
        assertThat(testProduct.getDevisecot()).isEqualTo(UPDATED_DEVISECOT);
        assertThat(testProduct.getDeviseseneg()).isEqualTo(UPDATED_DEVISESENEG);
        assertThat(testProduct.getDeviseghan()).isEqualTo(UPDATED_DEVISEGHAN);
    }

    @Test
    void patchNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, productDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();
        product.setId(UUID.randomUUID().toString());

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProductMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(productDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProduct() throws Exception {
        // Initialize the database
        productRepository.save(product);

        int databaseSizeBeforeDelete = productRepository.findAll().size();

        // Delete the product
        restProductMockMvc
            .perform(delete(ENTITY_API_URL_ID, product.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
