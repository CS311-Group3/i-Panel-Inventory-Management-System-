package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IpanelApp;
import com.mycompany.myapp.domain.Purchases;
import com.mycompany.myapp.repository.PurchasesRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PurchasesResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PurchasesResourceIT {

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    private static final Float DEFAULT_DISCOUNTS = 1F;
    private static final Float UPDATED_DISCOUNTS = 2F;

    private static final LocalDate DEFAULT_DATE_OF_PURCHASE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_PURCHASE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PurchasesRepository purchasesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchasesMockMvc;

    private Purchases purchases;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Purchases createEntity(EntityManager em) {
        Purchases purchases = new Purchases()
            .total(DEFAULT_TOTAL)
            .discounts(DEFAULT_DISCOUNTS)
            .dateOfPurchase(DEFAULT_DATE_OF_PURCHASE);
        return purchases;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Purchases createUpdatedEntity(EntityManager em) {
        Purchases purchases = new Purchases()
            .total(UPDATED_TOTAL)
            .discounts(UPDATED_DISCOUNTS)
            .dateOfPurchase(UPDATED_DATE_OF_PURCHASE);
        return purchases;
    }

    @BeforeEach
    public void initTest() {
        purchases = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchases() throws Exception {
        int databaseSizeBeforeCreate = purchasesRepository.findAll().size();
        // Create the Purchases
        restPurchasesMockMvc.perform(post("/api/purchases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchases)))
            .andExpect(status().isCreated());

        // Validate the Purchases in the database
        List<Purchases> purchasesList = purchasesRepository.findAll();
        assertThat(purchasesList).hasSize(databaseSizeBeforeCreate + 1);
        Purchases testPurchases = purchasesList.get(purchasesList.size() - 1);
        assertThat(testPurchases.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testPurchases.getDiscounts()).isEqualTo(DEFAULT_DISCOUNTS);
        assertThat(testPurchases.getDateOfPurchase()).isEqualTo(DEFAULT_DATE_OF_PURCHASE);
    }

    @Test
    @Transactional
    public void createPurchasesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchasesRepository.findAll().size();

        // Create the Purchases with an existing ID
        purchases.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchasesMockMvc.perform(post("/api/purchases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchases)))
            .andExpect(status().isBadRequest());

        // Validate the Purchases in the database
        List<Purchases> purchasesList = purchasesRepository.findAll();
        assertThat(purchasesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPurchases() throws Exception {
        // Initialize the database
        purchasesRepository.saveAndFlush(purchases);

        // Get all the purchasesList
        restPurchasesMockMvc.perform(get("/api/purchases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchases.getId().intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].discounts").value(hasItem(DEFAULT_DISCOUNTS.doubleValue())))
            .andExpect(jsonPath("$.[*].dateOfPurchase").value(hasItem(DEFAULT_DATE_OF_PURCHASE.toString())));
    }

    @Test
    @Transactional
    public void getPurchases() throws Exception {
        // Initialize the database
        purchasesRepository.saveAndFlush(purchases);

        // Get the purchases
        restPurchasesMockMvc.perform(get("/api/purchases/{id}", purchases.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchases.getId().intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.discounts").value(DEFAULT_DISCOUNTS.doubleValue()))
            .andExpect(jsonPath("$.dateOfPurchase").value(DEFAULT_DATE_OF_PURCHASE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPurchases() throws Exception {
        // Get the purchases
        restPurchasesMockMvc.perform(get("/api/purchases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchases() throws Exception {
        // Initialize the database
        purchasesRepository.saveAndFlush(purchases);

        int databaseSizeBeforeUpdate = purchasesRepository.findAll().size();

        // Update the purchases
        Purchases updatedPurchases = purchasesRepository.findById(purchases.getId()).get();
        // Disconnect from session so that the updates on updatedPurchases are not directly saved in db
        em.detach(updatedPurchases);
        updatedPurchases
            .total(UPDATED_TOTAL)
            .discounts(UPDATED_DISCOUNTS)
            .dateOfPurchase(UPDATED_DATE_OF_PURCHASE);

        restPurchasesMockMvc.perform(put("/api/purchases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchases)))
            .andExpect(status().isOk());

        // Validate the Purchases in the database
        List<Purchases> purchasesList = purchasesRepository.findAll();
        assertThat(purchasesList).hasSize(databaseSizeBeforeUpdate);
        Purchases testPurchases = purchasesList.get(purchasesList.size() - 1);
        assertThat(testPurchases.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testPurchases.getDiscounts()).isEqualTo(UPDATED_DISCOUNTS);
        assertThat(testPurchases.getDateOfPurchase()).isEqualTo(UPDATED_DATE_OF_PURCHASE);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchases() throws Exception {
        int databaseSizeBeforeUpdate = purchasesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchasesMockMvc.perform(put("/api/purchases")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchases)))
            .andExpect(status().isBadRequest());

        // Validate the Purchases in the database
        List<Purchases> purchasesList = purchasesRepository.findAll();
        assertThat(purchasesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchases() throws Exception {
        // Initialize the database
        purchasesRepository.saveAndFlush(purchases);

        int databaseSizeBeforeDelete = purchasesRepository.findAll().size();

        // Delete the purchases
        restPurchasesMockMvc.perform(delete("/api/purchases/{id}", purchases.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Purchases> purchasesList = purchasesRepository.findAll();
        assertThat(purchasesList).hasSize(databaseSizeBeforeDelete - 1);
    }


    @Test
    @Transactional
    public void getPurchasesByName() throws Exception{
        purchasesRepository.saveAndFlush(purchases);
        purchasesRepository.deleteAll();
        Purchases p1 = new Purchases();
        p1.setDateOfPurchase(LocalDate.now());
        Purchases p2 = new Purchases();
        p2.setDateOfPurchase(LocalDate.now());

        purchasesRepository.save(p1);
        purchasesRepository.save(p2);

        List<Purchases> test = purchasesRepository.getAllByDateOfPurchaseOrderByIdDesc(LocalDate.now());

        assertThat(test.size()).isEqualTo(2);


    }
}
