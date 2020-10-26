package com.ipanel.myapp.web.rest;

import com.ipanel.myapp.IpanelApp;
import com.ipanel.myapp.domain.ReturnsData;
import com.ipanel.myapp.repository.ReturnsDataRepository;

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
 * Integration tests for the {@link ReturnsDataResource} REST controller.
 */
@SpringBootTest(classes = IpanelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReturnsDataResourceIT {

    private static final LocalDate DEFAULT_DATE_OF_RETURN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_RETURN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ReturnsDataRepository returnsDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReturnsDataMockMvc;

    private ReturnsData returnsData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReturnsData createEntity(EntityManager em) {
        ReturnsData returnsData = new ReturnsData()
            .dateOfReturn(DEFAULT_DATE_OF_RETURN);
        return returnsData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReturnsData createUpdatedEntity(EntityManager em) {
        ReturnsData returnsData = new ReturnsData()
            .dateOfReturn(UPDATED_DATE_OF_RETURN);
        return returnsData;
    }

    @BeforeEach
    public void initTest() {
        returnsData = createEntity(em);
    }

    @Test
    @Transactional
    public void createReturnsData() throws Exception {
        int databaseSizeBeforeCreate = returnsDataRepository.findAll().size();
        // Create the ReturnsData
        restReturnsDataMockMvc.perform(post("/api/returns-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnsData)))
            .andExpect(status().isCreated());

        // Validate the ReturnsData in the database
        List<ReturnsData> returnsDataList = returnsDataRepository.findAll();
        assertThat(returnsDataList).hasSize(databaseSizeBeforeCreate + 1);
        ReturnsData testReturnsData = returnsDataList.get(returnsDataList.size() - 1);
        assertThat(testReturnsData.getDateOfReturn()).isEqualTo(DEFAULT_DATE_OF_RETURN);
    }

    @Test
    @Transactional
    public void createReturnsDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = returnsDataRepository.findAll().size();

        // Create the ReturnsData with an existing ID
        returnsData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReturnsDataMockMvc.perform(post("/api/returns-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnsData)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnsData in the database
        List<ReturnsData> returnsDataList = returnsDataRepository.findAll();
        assertThat(returnsDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReturnsData() throws Exception {
        // Initialize the database
        returnsDataRepository.saveAndFlush(returnsData);

        // Get all the returnsDataList
        restReturnsDataMockMvc.perform(get("/api/returns-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(returnsData.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateOfReturn").value(hasItem(DEFAULT_DATE_OF_RETURN.toString())));
    }

    @Test
    @Transactional
    public void getReturnsData() throws Exception {
        // Initialize the database
        returnsDataRepository.saveAndFlush(returnsData);

        // Get the returnsData
        restReturnsDataMockMvc.perform(get("/api/returns-data/{id}", returnsData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(returnsData.getId().intValue()))
            .andExpect(jsonPath("$.dateOfReturn").value(DEFAULT_DATE_OF_RETURN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingReturnsData() throws Exception {
        // Get the returnsData
        restReturnsDataMockMvc.perform(get("/api/returns-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReturnsData() throws Exception {
        // Initialize the database
        returnsDataRepository.saveAndFlush(returnsData);

        int databaseSizeBeforeUpdate = returnsDataRepository.findAll().size();

        // Update the returnsData
        ReturnsData updatedReturnsData = returnsDataRepository.findById(returnsData.getId()).get();
        // Disconnect from session so that the updates on updatedReturnsData are not directly saved in db
        em.detach(updatedReturnsData);
        updatedReturnsData
            .dateOfReturn(UPDATED_DATE_OF_RETURN);

        restReturnsDataMockMvc.perform(put("/api/returns-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReturnsData)))
            .andExpect(status().isOk());

        // Validate the ReturnsData in the database
        List<ReturnsData> returnsDataList = returnsDataRepository.findAll();
        assertThat(returnsDataList).hasSize(databaseSizeBeforeUpdate);
        ReturnsData testReturnsData = returnsDataList.get(returnsDataList.size() - 1);
        assertThat(testReturnsData.getDateOfReturn()).isEqualTo(UPDATED_DATE_OF_RETURN);
    }

    @Test
    @Transactional
    public void updateNonExistingReturnsData() throws Exception {
        int databaseSizeBeforeUpdate = returnsDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReturnsDataMockMvc.perform(put("/api/returns-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(returnsData)))
            .andExpect(status().isBadRequest());

        // Validate the ReturnsData in the database
        List<ReturnsData> returnsDataList = returnsDataRepository.findAll();
        assertThat(returnsDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReturnsData() throws Exception {
        // Initialize the database
        returnsDataRepository.saveAndFlush(returnsData);

        int databaseSizeBeforeDelete = returnsDataRepository.findAll().size();

        // Delete the returnsData
        restReturnsDataMockMvc.perform(delete("/api/returns-data/{id}", returnsData.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReturnsData> returnsDataList = returnsDataRepository.findAll();
        assertThat(returnsDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
