package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PurchaseItems;
import com.mycompany.myapp.domain.Purchases;
import com.mycompany.myapp.repository.PurchaseItemsRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PurchaseItems}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PurchaseItemsResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseItemsResource.class);

    private static final String ENTITY_NAME = "purchaseItems";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchaseItemsRepository purchaseItemsRepository;

    public PurchaseItemsResource(PurchaseItemsRepository purchaseItemsRepository) {
        this.purchaseItemsRepository = purchaseItemsRepository;
    }

    /**
     * {@code POST  /purchase-items} : Create a new purchaseItems.
     *
     * @param purchaseItems the purchaseItems to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchaseItems, or with status {@code 400 (Bad Request)} if the purchaseItems has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchase-items")
    public ResponseEntity<PurchaseItems> createPurchaseItems(@RequestBody PurchaseItems purchaseItems) throws URISyntaxException {
        log.debug("REST request to save PurchaseItems : {}", purchaseItems);
        if (purchaseItems.getId() != null) {
            throw new BadRequestAlertException("A new purchaseItems cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseItems result = purchaseItemsRepository.save(purchaseItems);
        return ResponseEntity.created(new URI("/api/purchase-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchase-items} : Updates an existing purchaseItems.
     *
     * @param purchaseItems the purchaseItems to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchaseItems,
     * or with status {@code 400 (Bad Request)} if the purchaseItems is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchaseItems couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchase-items")
    public ResponseEntity<PurchaseItems> updatePurchaseItems(@RequestBody PurchaseItems purchaseItems) throws URISyntaxException {
        log.debug("REST request to update PurchaseItems : {}", purchaseItems);
        if (purchaseItems.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseItems result = purchaseItemsRepository.save(purchaseItems);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchaseItems.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchase-items} : get all the purchaseItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchaseItems in body.
     */
    @GetMapping("/purchase-items")
    public ResponseEntity<List<PurchaseItems>> getAllPurchaseItems(Pageable pageable) {
        log.debug("REST request to get a page of PurchaseItems");
        Page<PurchaseItems> page = purchaseItemsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/purchase-items-get-by-purchase-code/{code}")
    public List<PurchaseItems> getAllItems(@PathVariable String code){
        return purchaseItemsRepository.getAllByPurchaseCode(code);
    }

    /**
     * {@code GET  /purchase-items/:id} : get the "id" purchaseItems.
     *
     * @param id the id of the purchaseItems to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchaseItems, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchase-items/{id}")
    public ResponseEntity<PurchaseItems> getPurchaseItems(@PathVariable Long id) {
        log.debug("REST request to get PurchaseItems : {}", id);
        Optional<PurchaseItems> purchaseItems = purchaseItemsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchaseItems);
    }

    /**
     * {@code DELETE  /purchase-items/:id} : delete the "id" purchaseItems.
     *
     * @param id the id of the purchaseItems to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchase-items/{id}")
    public ResponseEntity<Void> deletePurchaseItems(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseItems : {}", id);

        purchaseItemsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
