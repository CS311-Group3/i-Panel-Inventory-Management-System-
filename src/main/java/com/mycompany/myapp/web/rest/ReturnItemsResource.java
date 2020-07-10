package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ReturnItems;
import com.mycompany.myapp.repository.ReturnItemsRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ReturnItems}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReturnItemsResource {

    private final Logger log = LoggerFactory.getLogger(ReturnItemsResource.class);

    private static final String ENTITY_NAME = "returnItems";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReturnItemsRepository returnItemsRepository;

    public ReturnItemsResource(ReturnItemsRepository returnItemsRepository) {
        this.returnItemsRepository = returnItemsRepository;
    }

    /**
     * {@code POST  /return-items} : Create a new returnItems.
     *
     * @param returnItems the returnItems to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new returnItems, or with status {@code 400 (Bad Request)} if the returnItems has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/return-items")
    public ResponseEntity<ReturnItems> createReturnItems(@RequestBody ReturnItems returnItems) throws URISyntaxException {
        log.debug("REST request to save ReturnItems : {}", returnItems);
        if (returnItems.getId() != null) {
            throw new BadRequestAlertException("A new returnItems cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReturnItems result = returnItemsRepository.save(returnItems);
        return ResponseEntity.created(new URI("/api/return-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /return-items} : Updates an existing returnItems.
     *
     * @param returnItems the returnItems to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated returnItems,
     * or with status {@code 400 (Bad Request)} if the returnItems is not valid,
     * or with status {@code 500 (Internal Server Error)} if the returnItems couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/return-items")
    public ResponseEntity<ReturnItems> updateReturnItems(@RequestBody ReturnItems returnItems) throws URISyntaxException {
        log.debug("REST request to update ReturnItems : {}", returnItems);
        if (returnItems.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReturnItems result = returnItemsRepository.save(returnItems);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, returnItems.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /return-items} : get all the returnItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of returnItems in body.
     */
    @GetMapping("/return-items")
    public List<ReturnItems> getAllReturnItems() {
        log.debug("REST request to get all ReturnItems");
        return returnItemsRepository.findAll();
    }

    /**
     * {@code GET  /return-items/:id} : get the "id" returnItems.
     *
     * @param id the id of the returnItems to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the returnItems, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/return-items/{id}")
    public ResponseEntity<ReturnItems> getReturnItems(@PathVariable Long id) {
        log.debug("REST request to get ReturnItems : {}", id);
        Optional<ReturnItems> returnItems = returnItemsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(returnItems);
    }

    /**
     * {@code DELETE  /return-items/:id} : delete the "id" returnItems.
     *
     * @param id the id of the returnItems to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/return-items/{id}")
    public ResponseEntity<Void> deleteReturnItems(@PathVariable Long id) {
        log.debug("REST request to delete ReturnItems : {}", id);

        returnItemsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
