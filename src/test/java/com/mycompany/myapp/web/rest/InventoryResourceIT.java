package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IpanelApp;
import com.mycompany.myapp.domain.Inventory;
import com.mycompany.myapp.repository.InventoryRepository;

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

import com.mycompany.myapp.domain.enumeration.Category;
/**
 * Integration tests for the {@link InventoryResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InventoryResourceIT {

    private static final String DEFAULT_ITEM_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ITEM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_NAME = "BBBBBBBBBB";

    private static final Category DEFAULT_CATEGORY = Category.CAT1;
    private static final Category UPDATED_CATEGORY = Category.CAT2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Integer DEFAULT_REORDER_LEVEL = 1;
    private static final Integer UPDATED_REORDER_LEVEL = 2;

    private static final Long DEFAULT_SELLING_PRICE = 1L;
    private static final Long UPDATED_SELLING_PRICE = 2L;

    private static final Long DEFAULT_BUYING_PRICE = 1L;
    private static final Long UPDATED_BUYING_PRICE = 2L;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInventoryMockMvc;

    private Inventory inventory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inventory createEntity(EntityManager em) {
        Inventory inventory = new Inventory()
            .itemCode(DEFAULT_ITEM_CODE)
            .itemName(DEFAULT_ITEM_NAME)
            .category(DEFAULT_CATEGORY)
            .description(DEFAULT_DESCRIPTION)
            .quantity(DEFAULT_QUANTITY)
            .reorderLevel(DEFAULT_REORDER_LEVEL)
            .sellingPrice(DEFAULT_SELLING_PRICE)
            .buyingPrice(DEFAULT_BUYING_PRICE);
        return inventory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inventory createUpdatedEntity(EntityManager em) {
        Inventory inventory = new Inventory()
            .itemCode(UPDATED_ITEM_CODE)
            .itemName(UPDATED_ITEM_NAME)
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .quantity(UPDATED_QUANTITY)
            .reorderLevel(UPDATED_REORDER_LEVEL)
            .sellingPrice(UPDATED_SELLING_PRICE)
            .buyingPrice(UPDATED_BUYING_PRICE);
        return inventory;
    }

    @BeforeEach
    public void initTest() {
        inventory = createEntity(em);
    }

    @Test
    @Transactional
    public void createInventory() throws Exception {
        int databaseSizeBeforeCreate = inventoryRepository.findAll().size();
        // Create the Inventory
        restInventoryMockMvc.perform(post("/api/inventories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inventory)))
            .andExpect(status().isCreated());

        // Validate the Inventory in the database
        List<Inventory> inventoryList = inventoryRepository.findAll();
        assertThat(inventoryList).hasSize(databaseSizeBeforeCreate + 1);
        Inventory testInventory = inventoryList.get(inventoryList.size() - 1);
        assertThat(testInventory.getItemCode()).isEqualTo(DEFAULT_ITEM_CODE);
        assertThat(testInventory.getItemName()).isEqualTo(DEFAULT_ITEM_NAME);
        assertThat(testInventory.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testInventory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testInventory.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testInventory.getReorderLevel()).isEqualTo(DEFAULT_REORDER_LEVEL);
        assertThat(testInventory.getSellingPrice()).isEqualTo(DEFAULT_SELLING_PRICE);
        assertThat(testInventory.getBuyingPrice()).isEqualTo(DEFAULT_BUYING_PRICE);
    }

    @Test
    @Transactional
    public void createInventoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inventoryRepository.findAll().size();

        // Create the Inventory with an existing ID
        inventory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInventoryMockMvc.perform(post("/api/inventories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inventory)))
            .andExpect(status().isBadRequest());

        // Validate the Inventory in the database
        List<Inventory> inventoryList = inventoryRepository.findAll();
        assertThat(inventoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInventories() throws Exception {
        // Initialize the database
        inventoryRepository.saveAndFlush(inventory);

        // Get all the inventoryList
        restInventoryMockMvc.perform(get("/api/inventories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inventory.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemCode").value(hasItem(DEFAULT_ITEM_CODE)))
            .andExpect(jsonPath("$.[*].itemName").value(hasItem(DEFAULT_ITEM_NAME)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].reorderLevel").value(hasItem(DEFAULT_REORDER_LEVEL)))
            .andExpect(jsonPath("$.[*].sellingPrice").value(hasItem(DEFAULT_SELLING_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].buyingPrice").value(hasItem(DEFAULT_BUYING_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getInventory() throws Exception {
        // Initialize the database
        inventoryRepository.saveAndFlush(inventory);

        // Get the inventory
        restInventoryMockMvc.perform(get("/api/inventories/{id}", inventory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inventory.getId().intValue()))
            .andExpect(jsonPath("$.itemCode").value(DEFAULT_ITEM_CODE))
            .andExpect(jsonPath("$.itemName").value(DEFAULT_ITEM_NAME))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.reorderLevel").value(DEFAULT_REORDER_LEVEL))
            .andExpect(jsonPath("$.sellingPrice").value(DEFAULT_SELLING_PRICE.intValue()))
            .andExpect(jsonPath("$.buyingPrice").value(DEFAULT_BUYING_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingInventory() throws Exception {
        // Get the inventory
        restInventoryMockMvc.perform(get("/api/inventories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInventory() throws Exception {
        // Initialize the database
        inventoryRepository.saveAndFlush(inventory);

        int databaseSizeBeforeUpdate = inventoryRepository.findAll().size();

        // Update the inventory
        Inventory updatedInventory = inventoryRepository.findById(inventory.getId()).get();
        // Disconnect from session so that the updates on updatedInventory are not directly saved in db
        em.detach(updatedInventory);
        updatedInventory
            .itemCode(UPDATED_ITEM_CODE)
            .itemName(UPDATED_ITEM_NAME)
            .category(UPDATED_CATEGORY)
            .description(UPDATED_DESCRIPTION)
            .quantity(UPDATED_QUANTITY)
            .reorderLevel(UPDATED_REORDER_LEVEL)
            .sellingPrice(UPDATED_SELLING_PRICE)
            .buyingPrice(UPDATED_BUYING_PRICE);

        restInventoryMockMvc.perform(put("/api/inventories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInventory)))
            .andExpect(status().isOk());

        // Validate the Inventory in the database
        List<Inventory> inventoryList = inventoryRepository.findAll();
        assertThat(inventoryList).hasSize(databaseSizeBeforeUpdate);
        Inventory testInventory = inventoryList.get(inventoryList.size() - 1);
        assertThat(testInventory.getItemCode()).isEqualTo(UPDATED_ITEM_CODE);
        assertThat(testInventory.getItemName()).isEqualTo(UPDATED_ITEM_NAME);
        assertThat(testInventory.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testInventory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testInventory.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testInventory.getReorderLevel()).isEqualTo(UPDATED_REORDER_LEVEL);
        assertThat(testInventory.getSellingPrice()).isEqualTo(UPDATED_SELLING_PRICE);
        assertThat(testInventory.getBuyingPrice()).isEqualTo(UPDATED_BUYING_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingInventory() throws Exception {
        int databaseSizeBeforeUpdate = inventoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInventoryMockMvc.perform(put("/api/inventories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inventory)))
            .andExpect(status().isBadRequest());

        // Validate the Inventory in the database
        List<Inventory> inventoryList = inventoryRepository.findAll();
        assertThat(inventoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInventory() throws Exception {
        // Initialize the database
        inventoryRepository.saveAndFlush(inventory);

        int databaseSizeBeforeDelete = inventoryRepository.findAll().size();

        // Delete the inventory
        restInventoryMockMvc.perform(delete("/api/inventories/{id}", inventory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Inventory> inventoryList = inventoryRepository.findAll();
        assertThat(inventoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
