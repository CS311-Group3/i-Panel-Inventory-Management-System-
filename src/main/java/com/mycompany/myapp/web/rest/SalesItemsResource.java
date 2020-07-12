package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SalesItems;
import com.mycompany.myapp.repository.SalesItemsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.SalesItems}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SalesItemsResource {

    private final Logger log = LoggerFactory.getLogger(SalesItemsResource.class);

    private static final String ENTITY_NAME = "salesItems";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SalesItemsRepository salesItemsRepository;

    public SalesItemsResource(SalesItemsRepository salesItemsRepository) {
        this.salesItemsRepository = salesItemsRepository;
    }

    /**
     * {@code POST  /sales-items} : Create a new salesItems.
     *
     * @param salesItems the salesItems to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new salesItems, or with status {@code 400 (Bad Request)} if the salesItems has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sales-items")
    public ResponseEntity<SalesItems> createSalesItems(@RequestBody SalesItems salesItems) throws URISyntaxException {
        log.debug("REST request to save SalesItems : {}", salesItems);
        if (salesItems.getId() != null) {
            throw new BadRequestAlertException("A new salesItems cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalesItems result = salesItemsRepository.save(salesItems);
        return ResponseEntity.created(new URI("/api/sales-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sales-items} : Updates an existing salesItems.
     *
     * @param salesItems the salesItems to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salesItems,
     * or with status {@code 400 (Bad Request)} if the salesItems is not valid,
     * or with status {@code 500 (Internal Server Error)} if the salesItems couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sales-items")
    public ResponseEntity<SalesItems> updateSalesItems(@RequestBody SalesItems salesItems) throws URISyntaxException {
        log.debug("REST request to update SalesItems : {}", salesItems);
        if (salesItems.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SalesItems result = salesItemsRepository.save(salesItems);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, salesItems.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sales-items} : get all the salesItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of salesItems in body.
     */
    @GetMapping("/sales-items")
    public ResponseEntity<List<SalesItems>> getAllSalesItems(Pageable pageable) {
        log.debug("REST request to get a page of SalesItems");
        Page<SalesItems> page = salesItemsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sales-items/:id} : get the "id" salesItems.
     *
     * @param id the id of the salesItems to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the salesItems, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sales-items/{id}")
    public ResponseEntity<SalesItems> getSalesItems(@PathVariable Long id) {
        log.debug("REST request to get SalesItems : {}", id);
        Optional<SalesItems> salesItems = salesItemsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(salesItems);
    }

    /**
     * {@code DELETE  /sales-items/:id} : delete the "id" salesItems.
     *
     * @param id the id of the salesItems to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sales-items/{id}")
    public ResponseEntity<Void> deleteSalesItems(@PathVariable Long id) {
        log.debug("REST request to delete SalesItems : {}", id);

        salesItemsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
