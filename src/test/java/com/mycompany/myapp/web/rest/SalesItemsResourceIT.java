package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IpanelApp;
import com.mycompany.myapp.domain.Sales;
import com.mycompany.myapp.domain.SalesItems;
import com.mycompany.myapp.repository.SalesItemsRepository;

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
 * Integration tests for the {@link SalesItemsResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SalesItemsResourceIT {

    private static final Float DEFAULT_UNIT_PRICE = 1F;
    private static final Float UPDATED_UNIT_PRICE = 2F;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    @Autowired
    private SalesItemsRepository salesItemsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSalesItemsMockMvc;

    private SalesItems salesItems;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalesItems createEntity(EntityManager em) {
        SalesItems salesItems = new SalesItems()
            .unitPrice(DEFAULT_UNIT_PRICE)
            .quantity(DEFAULT_QUANTITY)
            .total(DEFAULT_TOTAL);
        return salesItems;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalesItems createUpdatedEntity(EntityManager em) {
        SalesItems salesItems = new SalesItems()
            .unitPrice(UPDATED_UNIT_PRICE)
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);
        return salesItems;
    }

    @BeforeEach
    public void initTest() {
        salesItems = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalesItems() throws Exception {
        int databaseSizeBeforeCreate = salesItemsRepository.findAll().size();
        // Create the SalesItems
        restSalesItemsMockMvc.perform(post("/api/sales-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salesItems)))
            .andExpect(status().isCreated());

        // Validate the SalesItems in the database
        List<SalesItems> salesItemsList = salesItemsRepository.findAll();
        assertThat(salesItemsList).hasSize(databaseSizeBeforeCreate + 1);
        SalesItems testSalesItems = salesItemsList.get(salesItemsList.size() - 1);
        assertThat(testSalesItems.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testSalesItems.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testSalesItems.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createSalesItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesItemsRepository.findAll().size();

        // Create the SalesItems with an existing ID
        salesItems.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesItemsMockMvc.perform(post("/api/sales-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salesItems)))
            .andExpect(status().isBadRequest());

        // Validate the SalesItems in the database
        List<SalesItems> salesItemsList = salesItemsRepository.findAll();
        assertThat(salesItemsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSalesItems() throws Exception {
        // Initialize the database
        salesItemsRepository.saveAndFlush(salesItems);

        // Get all the salesItemsList
        restSalesItemsMockMvc.perform(get("/api/sales-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesItems.getId().intValue())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }

    @Test
    @Transactional
    public void getSalesItems() throws Exception {
        // Initialize the database
        salesItemsRepository.saveAndFlush(salesItems);

        // Get the salesItems
        restSalesItemsMockMvc.perform(get("/api/sales-items/{id}", salesItems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(salesItems.getId().intValue()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSalesItems() throws Exception {
        // Get the salesItems
        restSalesItemsMockMvc.perform(get("/api/sales-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalesItems() throws Exception {
        // Initialize the database
        salesItemsRepository.saveAndFlush(salesItems);

        int databaseSizeBeforeUpdate = salesItemsRepository.findAll().size();

        // Update the salesItems
        SalesItems updatedSalesItems = salesItemsRepository.findById(salesItems.getId()).get();
        // Disconnect from session so that the updates on updatedSalesItems are not directly saved in db
        em.detach(updatedSalesItems);
        updatedSalesItems
            .unitPrice(UPDATED_UNIT_PRICE)
            .quantity(UPDATED_QUANTITY)
            .total(UPDATED_TOTAL);

        restSalesItemsMockMvc.perform(put("/api/sales-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSalesItems)))
            .andExpect(status().isOk());

        // Validate the SalesItems in the database
        List<SalesItems> salesItemsList = salesItemsRepository.findAll();
        assertThat(salesItemsList).hasSize(databaseSizeBeforeUpdate);
        SalesItems testSalesItems = salesItemsList.get(salesItemsList.size() - 1);
        assertThat(testSalesItems.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testSalesItems.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testSalesItems.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingSalesItems() throws Exception {
        int databaseSizeBeforeUpdate = salesItemsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalesItemsMockMvc.perform(put("/api/sales-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salesItems)))
            .andExpect(status().isBadRequest());

        // Validate the SalesItems in the database
        List<SalesItems> salesItemsList = salesItemsRepository.findAll();
        assertThat(salesItemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSalesItems() throws Exception {
        // Initialize the database
        salesItemsRepository.saveAndFlush(salesItems);

        int databaseSizeBeforeDelete = salesItemsRepository.findAll().size();

        // Delete the salesItems
        restSalesItemsMockMvc.perform(delete("/api/sales-items/{id}", salesItems.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SalesItems> salesItemsList = salesItemsRepository.findAll();
        assertThat(salesItemsList).hasSize(databaseSizeBeforeDelete - 1);
    }


}
