package com.ipanel.myapp.web.rest;

import com.ipanel.myapp.IpanelApp;
import com.ipanel.myapp.domain.PurchaseItems;
import com.ipanel.myapp.repository.PurchaseItemsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PurchaseItemsResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PurchaseItemsResourceIT {

    private static final Float DEFAULT_UNIT_PRICE = 1F;
    private static final Float UPDATED_UNIT_PRICE = 2F;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    @Autowired
    private PurchaseItemsRepository purchaseItemsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchaseItemsMockMvc;

    private PurchaseItems purchaseItems;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseItems createEntity(EntityManager em) {
        PurchaseItems purchaseItems = new PurchaseItems()
            .unitPrice(DEFAULT_UNIT_PRICE)
            .quantity(DEFAULT_QUANTITY)
            .total(DEFAULT_TOTAL);
        return purchaseItems;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseItems createUpdatedEntity(EntityManager em) {
        PurchaseItems purchaseItems = new PurchaseItems()
            .unitPrice(UPDATED_UNIT_PRICE)
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);
        return purchaseItems;
    }

    @BeforeEach
    public void initTest() {
        purchaseItems = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseItems() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemsRepository.findAll().size();
        // Create the PurchaseItems
        restPurchaseItemsMockMvc.perform(post("/api/purchase-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItems)))
            .andExpect(status().isCreated());

        // Validate the PurchaseItems in the database
        List<PurchaseItems> purchaseItemsList = purchaseItemsRepository.findAll();
        assertThat(purchaseItemsList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseItems testPurchaseItems = purchaseItemsList.get(purchaseItemsList.size() - 1);
        assertThat(testPurchaseItems.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testPurchaseItems.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testPurchaseItems.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createPurchaseItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemsRepository.findAll().size();

        // Create the PurchaseItems with an existing ID
        purchaseItems.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseItemsMockMvc.perform(post("/api/purchase-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItems)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItems in the database
        List<PurchaseItems> purchaseItemsList = purchaseItemsRepository.findAll();
        assertThat(purchaseItemsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemsRepository.saveAndFlush(purchaseItems);

        // Get all the purchaseItemsList
        restPurchaseItemsMockMvc.perform(get("/api/purchase-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseItems.getId().intValue())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }

    @Test
    @Transactional
    public void getPurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemsRepository.saveAndFlush(purchaseItems);

        // Get the purchaseItems
        restPurchaseItemsMockMvc.perform(get("/api/purchase-items/{id}", purchaseItems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseItems.getId().intValue()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseItems() throws Exception {
        // Get the purchaseItems
        restPurchaseItemsMockMvc.perform(get("/api/purchase-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemsRepository.saveAndFlush(purchaseItems);

        int databaseSizeBeforeUpdate = purchaseItemsRepository.findAll().size();

        // Update the purchaseItems
        PurchaseItems updatedPurchaseItems = purchaseItemsRepository.findById(purchaseItems.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseItems are not directly saved in db
        em.detach(updatedPurchaseItems);
        updatedPurchaseItems
            .unitPrice(UPDATED_UNIT_PRICE)
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);

        restPurchaseItemsMockMvc.perform(put("/api/purchase-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseItems)))
            .andExpect(status().isOk());

        // Validate the PurchaseItems in the database
        List<PurchaseItems> purchaseItemsList = purchaseItemsRepository.findAll();
        assertThat(purchaseItemsList).hasSize(databaseSizeBeforeUpdate);
        PurchaseItems testPurchaseItems = purchaseItemsList.get(purchaseItemsList.size() - 1);
        assertThat(testPurchaseItems.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testPurchaseItems.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testPurchaseItems.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseItems() throws Exception {
        int databaseSizeBeforeUpdate = purchaseItemsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseItemsMockMvc.perform(put("/api/purchase-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItems)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItems in the database
        List<PurchaseItems> purchaseItemsList = purchaseItemsRepository.findAll();
        assertThat(purchaseItemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemsRepository.saveAndFlush(purchaseItems);

        int databaseSizeBeforeDelete = purchaseItemsRepository.findAll().size();

        // Delete the purchaseItems
        restPurchaseItemsMockMvc.perform(delete("/api/purchase-items/{id}", purchaseItems.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseItems> purchaseItemsList = purchaseItemsRepository.findAll();
        assertThat(purchaseItemsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
