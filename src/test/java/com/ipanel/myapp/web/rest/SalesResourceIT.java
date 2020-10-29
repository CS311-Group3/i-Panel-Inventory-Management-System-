package com.ipanel.myapp.web.rest;

import com.ipanel.myapp.IpanelApp;
import com.ipanel.myapp.domain.Sales;
import com.ipanel.myapp.repository.SalesRepository;

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
 * Integration tests for the {@link SalesResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SalesResourceIT {

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    private static final Float DEFAULT_SERVICE_CHARGES = 1F;
    private static final Float UPDATED_SERVICE_CHARGES = 2F;

    private static final LocalDate DEFAULT_DATE_OF_SALE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_SALE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSalesMockMvc;

    private Sales sales;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sales createEntity(EntityManager em) {
        Sales sales = new Sales()
            .total(DEFAULT_TOTAL)
            .serviceCharges(DEFAULT_SERVICE_CHARGES)
            .dateOfSale(DEFAULT_DATE_OF_SALE);
        return sales;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sales createUpdatedEntity(EntityManager em) {
        Sales sales = new Sales()
            .total(UPDATED_TOTAL)
            .serviceCharges(UPDATED_SERVICE_CHARGES)
            .dateOfSale(UPDATED_DATE_OF_SALE);
        return sales;
    }

    @BeforeEach
    public void initTest() {
        sales = createEntity(em);
    }

    @Test
    @Transactional
    public void createSales() throws Exception {
        int databaseSizeBeforeCreate = salesRepository.findAll().size();
        // Create the Sales
        restSalesMockMvc.perform(post("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sales)))
            .andExpect(status().isCreated());

        // Validate the Sales in the database
        List<Sales> salesList = salesRepository.findAll();
        assertThat(salesList).hasSize(databaseSizeBeforeCreate + 1);
        Sales testSales = salesList.get(salesList.size() - 1);
        assertThat(testSales.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testSales.getServiceCharges()).isEqualTo(DEFAULT_SERVICE_CHARGES);
        assertThat(testSales.getDateOfSale()).isEqualTo(DEFAULT_DATE_OF_SALE);
    }

    @Test
    @Transactional
    public void createSalesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesRepository.findAll().size();

        // Create the Sales with an existing ID
        sales.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesMockMvc.perform(post("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sales)))
            .andExpect(status().isBadRequest());

        // Validate the Sales in the database
        List<Sales> salesList = salesRepository.findAll();
        assertThat(salesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSales() throws Exception {
        // Initialize the database
        salesRepository.saveAndFlush(sales);

        // Get all the salesList
        restSalesMockMvc.perform(get("/api/sales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sales.getId().intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].serviceCharges").value(hasItem(DEFAULT_SERVICE_CHARGES.doubleValue())))
            .andExpect(jsonPath("$.[*].dateOfSale").value(hasItem(DEFAULT_DATE_OF_SALE.toString())));
    }

    @Test
    @Transactional
    public void getSales() throws Exception {
        // Initialize the database
        salesRepository.saveAndFlush(sales);

        // Get the sales
        restSalesMockMvc.perform(get("/api/sales/{id}", sales.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sales.getId().intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.serviceCharges").value(DEFAULT_SERVICE_CHARGES.doubleValue()))
            .andExpect(jsonPath("$.dateOfSale").value(DEFAULT_DATE_OF_SALE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSales() throws Exception {
        // Get the sales
        restSalesMockMvc.perform(get("/api/sales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSales() throws Exception {
        // Initialize the database
        salesRepository.saveAndFlush(sales);

        int databaseSizeBeforeUpdate = salesRepository.findAll().size();

        // Update the sales
        Sales updatedSales = salesRepository.findById(sales.getId()).get();
        // Disconnect from session so that the updates on updatedSales are not directly saved in db
        em.detach(updatedSales);
        updatedSales
            .total(UPDATED_TOTAL)
            .serviceCharges(UPDATED_SERVICE_CHARGES)
            .dateOfSale(UPDATED_DATE_OF_SALE);

        restSalesMockMvc.perform(put("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSales)))
            .andExpect(status().isOk());

        // Validate the Sales in the database
        List<Sales> salesList = salesRepository.findAll();
        assertThat(salesList).hasSize(databaseSizeBeforeUpdate);
        Sales testSales = salesList.get(salesList.size() - 1);
        assertThat(testSales.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testSales.getServiceCharges()).isEqualTo(UPDATED_SERVICE_CHARGES);
        assertThat(testSales.getDateOfSale()).isEqualTo(UPDATED_DATE_OF_SALE);
    }

    @Test
    @Transactional
    public void updateNonExistingSales() throws Exception {
        int databaseSizeBeforeUpdate = salesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalesMockMvc.perform(put("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sales)))
            .andExpect(status().isBadRequest());

        // Validate the Sales in the database
        List<Sales> salesList = salesRepository.findAll();
        assertThat(salesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSales() throws Exception {
        // Initialize the database
        salesRepository.saveAndFlush(sales);

        int databaseSizeBeforeDelete = salesRepository.findAll().size();

        // Delete the sales
        restSalesMockMvc.perform(delete("/api/sales/{id}", sales.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sales> salesList = salesRepository.findAll();
        assertThat(salesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
