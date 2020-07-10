package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IpanelApp;
import com.mycompany.myapp.domain.ReturnItems;
import com.mycompany.myapp.repository.ReturnItemsRepository;

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
 * Integration tests for the {@link ReturnItemsResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReturnItemsResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private ReturnItemsRepository returnItemsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReturnItemsMockMvc;

    private ReturnItems returnItems;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReturnItems createEntity(EntityManager em) {
        ReturnItems returnItems = new ReturnItems()
            .quantity(DEFAULT_QUANTITY);
        return returnItems;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReturnItems createUpdatedEntity(EntityManager em) {
        ReturnItems returnItems = new ReturnItems()
            .quantity(UPDATED_QUANTITY);
        return returnItems;
    }

    @BeforeEach
    public void initTest() {
        returnItems = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnItems() throws Exception {
        int databaseSizeBeforeCreate = returnItemsRepository.findAll().size();
        // Create the ReturnItems
        restReturnItemsMockMvc.perform(post("/api/return-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnItems)))
            .andExpect(status().isCreated());

        // Validate the ReturnItems in the database
        List<ReturnItems> returnItemsList = returnItemsRepository.findAll();
        assertThat(returnItemsList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnItems testReturnItems = returnItemsList.get(returnItemsList.size() - 1);
        assertThat(testReturnItems.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createReturnItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnItemsRepository.findAll().size();

        // Create the ReturnItems with an existing ID
        returnItems.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnItemsMockMvc.perform(post("/api/return-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnItems)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnItems in the database
        List<ReturnItems> returnItemsList = returnItemsRepository.findAll();
        assertThat(returnItemsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReturnItems() throws Exception {
        // Initialize the database
        returnItemsRepository.saveAndFlush(returnItems);

        // Get all the returnItemsList
        restReturnItemsMockMvc.perform(get("/api/return-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnItems.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @Test
    @Transactional
    public void getReturnItems() throws Exception {
        // Initialize the database
        returnItemsRepository.saveAndFlush(returnItems);

        // Get the returnItems
        restReturnItemsMockMvc.perform(get("/api/return-items/{id}", returnItems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(returnItems.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingReturnItems() throws Exception {
        // Get the returnItems
        restReturnItemsMockMvc.perform(get("/api/return-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnItems() throws Exception {
        // Initialize the database
        returnItemsRepository.saveAndFlush(returnItems);

        int databaseSizeBeforeUpdate = returnItemsRepository.findAll().size();

        // Update the returnItems
        ReturnItems updatedReturnItems = returnItemsRepository.findById(returnItems.getId()).get();
        // Disconnect from session so that the updates on updatedReturnItems are not directly saved in db
        em.detach(updatedReturnItems);
        updatedReturnItems
            .quantity(UPDATED_QUANTITY);

        restReturnItemsMockMvc.perform(put("/api/return-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnItems)))
            .andExpect(status().isOk());

        // Validate the ReturnItems in the database
        List<ReturnItems> returnItemsList = returnItemsRepository.findAll();
        assertThat(returnItemsList).hasSize(databaseSizeBeforeUpdate);
        ReturnItems testReturnItems = returnItemsList.get(returnItemsList.size() - 1);
        assertThat(testReturnItems.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnItems() throws Exception {
        int databaseSizeBeforeUpdate = returnItemsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReturnItemsMockMvc.perform(put("/api/return-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnItems)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnItems in the database
        List<ReturnItems> returnItemsList = returnItemsRepository.findAll();
        assertThat(returnItemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReturnItems() throws Exception {
        // Initialize the database
        returnItemsRepository.saveAndFlush(returnItems);

        int databaseSizeBeforeDelete = returnItemsRepository.findAll().size();

        // Delete the returnItems
        restReturnItemsMockMvc.perform(delete("/api/return-items/{id}", returnItems.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReturnItems> returnItemsList = returnItemsRepository.findAll();
        assertThat(returnItemsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
