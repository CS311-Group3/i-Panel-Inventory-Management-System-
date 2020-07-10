package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ReturnsData;
import com.mycompany.myapp.repository.ReturnsDataRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ReturnsData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReturnsDataResource {

    private final Logger log = LoggerFactory.getLogger(ReturnsDataResource.class);

    private static final String ENTITY_NAME = "returnsData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReturnsDataRepository returnsDataRepository;

    public ReturnsDataResource(ReturnsDataRepository returnsDataRepository) {
        this.returnsDataRepository = returnsDataRepository;
    }

    /**
     * {@code POST  /returns-data} : Create a new returnsData.
     *
     * @param returnsData the returnsData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new returnsData, or with status {@code 400 (Bad Request)} if the returnsData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/returns-data")
    public ResponseEntity<ReturnsData> createReturnsData(@RequestBody ReturnsData returnsData) throws URISyntaxException {
        log.debug("REST request to save ReturnsData : {}", returnsData);
        if (returnsData.getId() != null) {
            throw new BadRequestAlertException("A new returnsData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnsData result = returnsDataRepository.save(returnsData);
        return ResponseEntity.created(new URI("/api/returns-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /returns-data} : Updates an existing returnsData.
     *
     * @param returnsData the returnsData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated returnsData,
     * or with status {@code 400 (Bad Request)} if the returnsData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the returnsData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/returns-data")
    public ResponseEntity<ReturnsData> updateReturnsData(@RequestBody ReturnsData returnsData) throws URISyntaxException {
        log.debug("REST request to update ReturnsData : {}", returnsData);
        if (returnsData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReturnsData result = returnsDataRepository.save(returnsData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, returnsData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /returns-data} : get all the returnsData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of returnsData in body.
     */
    @GetMapping("/returns-data")
    public List<ReturnsData> getAllReturnsData() {
        log.debug("REST request to get all ReturnsData");
        return returnsDataRepository.findAll();
    }

    /**
     * {@code GET  /returns-data/:id} : get the "id" returnsData.
     *
     * @param id the id of the returnsData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the returnsData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/returns-data/{id}")
    public ResponseEntity<ReturnsData> getReturnsData(@PathVariable Long id) {
        log.debug("REST request to get ReturnsData : {}", id);
        Optional<ReturnsData> returnsData = returnsDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(returnsData);
    }

    /**
     * {@code DELETE  /returns-data/:id} : delete the "id" returnsData.
     *
     * @param id the id of the returnsData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/returns-data/{id}")
    public ResponseEntity<Void> deleteReturnsData(@PathVariable Long id) {
        log.debug("REST request to delete ReturnsData : {}", id);

        returnsDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
